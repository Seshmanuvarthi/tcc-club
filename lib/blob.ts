import { list, put, del } from "@vercel/blob";

export const MENU_PREFIX = "menu/";
export const NEWSLETTER_PREFIX = "newsletter/";
export const GALLERY_PREFIX = "gallery/";
const GALLERY_INDEX_PATH = "gallery/_index.json";
const BOOKINGS_INDEX_PATH = "bookings/_index.json";

export type NewsletterItem = {
  url: string;
  pathname: string;
  filename: string;
  uploadedAt: string;
  size: number;
  contentType: string;
  isPdf: boolean;
};

export type GalleryItem = {
  id: string;
  url: string;
  pathname: string;
  caption: string;
  uploadedAt: string;
};

export type BookingStatus = "new" | "contacted" | "confirmed" | "cancelled";

export type BookingRecord = {
  id: string;
  createdAt: string;
  bookingType: string;
  memberId: string;
  memberName: string;
  eventType: string;
  date: string;
  persons: number;
  phone: string;
  email: string;
  status: BookingStatus;
};

export async function getCurrentMenu(): Promise<NewsletterItem | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    const { blobs } = await list({ prefix: MENU_PREFIX });
    if (!blobs.length) return null;
    const latest = blobs.sort(
      (a, b) =>
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    )[0];
    return blobToItem(latest);
  } catch (err) {
    console.error("getCurrentMenu failed", err);
    return null;
  }
}

export async function listNewsletters(): Promise<NewsletterItem[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return [];
  try {
    const { blobs } = await list({ prefix: NEWSLETTER_PREFIX });
    return blobs
      .map(blobToItem)
      .sort(
        (a, b) =>
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      );
  } catch (err) {
    console.error("listNewsletters failed", err);
    return [];
  }
}

export async function uploadMenu(file: File) {
  const oldMenu = await getCurrentMenu();
  if (oldMenu) {
    await del(oldMenu.url).catch(() => {});
  }
  const ext = filenameExtension(file.name) || "jpg";
  const path = `${MENU_PREFIX}current-${Date.now()}.${ext}`;
  return put(path, file, {
    access: "public",
    contentType: file.type || undefined,
  });
}

export async function uploadNewsletter(file: File) {
  const safe = sanitize(file.name);
  const path = `${NEWSLETTER_PREFIX}${Date.now()}-${safe}`;
  return put(path, file, {
    access: "public",
    contentType: file.type || undefined,
  });
}

export async function deleteNewsletter(url: string) {
  if (!url.includes(NEWSLETTER_PREFIX.replace("/", ""))) {
    throw new Error("URL is not a newsletter blob");
  }
  await del(url);
}

// ─── Gallery ───────────────────────────────────────────────

async function listAllGalleryIndexBlobs() {
  const { blobs } = await list({ prefix: GALLERY_INDEX_PATH });
  // Vercel Blob's put() with default options adds a random suffix to the
  // URL, so multiple "gallery/_index.json" blobs can coexist if older
  // writes didn't use { addRandomSuffix: false }. We pick them all up here.
  return blobs.filter(
    (b) =>
      b.pathname === GALLERY_INDEX_PATH ||
      b.pathname.startsWith("gallery/_index")
  );
}

export async function listGallery(): Promise<GalleryItem[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return [];
  try {
    const indexes = await listAllGalleryIndexBlobs();
    if (indexes.length === 0) return [];

    // Fetch every index, merge, dedupe by id, sort newest first.
    const all: GalleryItem[] = [];
    for (const b of indexes) {
      try {
        const res = await fetch(`${b.url}?_=${Date.now()}`, {
          cache: "no-store",
        });
        if (!res.ok) continue;
        const items = await res.json();
        if (Array.isArray(items)) all.push(...(items as GalleryItem[]));
      } catch {
        // ignore malformed index blob
      }
    }
    const seen = new Set<string>();
    const merged: GalleryItem[] = [];
    for (const item of all) {
      if (seen.has(item.id)) continue;
      seen.add(item.id);
      merged.push(item);
    }
    merged.sort(
      (a, b) =>
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
    return merged;
  } catch (err) {
    console.error("listGallery failed", err);
    return [];
  }
}

async function writeGalleryIndex(items: GalleryItem[]) {
  // Delete ALL existing index blobs (including stale duplicates from older
  // buggy writes) before creating the new canonical one.
  const existing = await listAllGalleryIndexBlobs();
  await Promise.all(existing.map((b) => del(b.url).catch(() => {})));
  await put(GALLERY_INDEX_PATH, JSON.stringify(items, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
  });
}

export async function addGalleryItem(
  file: File,
  caption: string
): Promise<GalleryItem> {
  const safe = sanitize(file.name);
  const path = `${GALLERY_PREFIX}${Date.now()}-${safe}`;
  const result = await put(path, file, {
    access: "public",
    contentType: file.type || undefined,
  });
  const items = await listGallery();
  const newItem: GalleryItem = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    url: result.url,
    pathname: result.pathname,
    caption: caption.slice(0, 100),
    uploadedAt: new Date().toISOString(),
  };
  items.unshift(newItem);
  await writeGalleryIndex(items);
  return newItem;
}

export async function deleteGalleryItem(id: string) {
  const items = await listGallery();
  const item = items.find((i) => i.id === id);
  if (!item) throw new Error("Gallery item not found");
  await del(item.url).catch(() => {});
  const remaining = items.filter((i) => i.id !== id);
  await writeGalleryIndex(remaining);
}

export async function updateGalleryCaption(id: string, caption: string) {
  const items = await listGallery();
  const item = items.find((i) => i.id === id);
  if (!item) throw new Error("Gallery item not found");
  item.caption = caption.slice(0, 100);
  await writeGalleryIndex(items);
}

function blobToItem(b: {
  url: string;
  pathname: string;
  uploadedAt: Date | string;
  size: number;
  contentType?: string;
}): NewsletterItem {
  const filename = b.pathname.split("/").pop() ?? b.pathname;
  const contentType = b.contentType ?? "";
  return {
    url: b.url,
    pathname: b.pathname,
    filename,
    uploadedAt: new Date(b.uploadedAt).toISOString(),
    size: b.size,
    contentType,
    isPdf: contentType.includes("pdf") || filename.toLowerCase().endsWith(".pdf"),
  };
}

function sanitize(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]+/g, "_");
}

function filenameExtension(name: string) {
  const m = name.match(/\.([^.]+)$/);
  return m ? m[1].toLowerCase() : null;
}

// ─── Bookings ──────────────────────────────────────────────

async function listAllBookingsIndexBlobs() {
  const { blobs } = await list({ prefix: BOOKINGS_INDEX_PATH });
  return blobs.filter(
    (b) =>
      b.pathname === BOOKINGS_INDEX_PATH ||
      b.pathname.startsWith("bookings/_index")
  );
}

export async function listBookings(): Promise<BookingRecord[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return [];
  try {
    const indexes = await listAllBookingsIndexBlobs();
    if (indexes.length === 0) return [];

    const all: BookingRecord[] = [];
    for (const b of indexes) {
      try {
        const res = await fetch(`${b.url}?_=${Date.now()}`, {
          cache: "no-store",
        });
        if (!res.ok) continue;
        const items = await res.json();
        if (Array.isArray(items)) all.push(...(items as BookingRecord[]));
      } catch {
        // ignore malformed index blob
      }
    }
    const seen = new Set<string>();
    const merged: BookingRecord[] = [];
    for (const item of all) {
      if (seen.has(item.id)) continue;
      seen.add(item.id);
      merged.push(item);
    }
    merged.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return merged;
  } catch (err) {
    console.error("listBookings failed", err);
    return [];
  }
}

async function writeBookingsIndex(items: BookingRecord[]) {
  const existing = await listAllBookingsIndexBlobs();
  await Promise.all(existing.map((b) => del(b.url).catch(() => {})));
  await put(BOOKINGS_INDEX_PATH, JSON.stringify(items, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
  });
}

export async function addBooking(
  data: Omit<BookingRecord, "id" | "createdAt" | "status">
): Promise<BookingRecord> {
  const items = await listBookings();
  const record: BookingRecord = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    status: "new",
    ...data,
  };
  items.unshift(record);
  await writeBookingsIndex(items);
  return record;
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  const items = await listBookings();
  const booking = items.find((b) => b.id === id);
  if (!booking) throw new Error("Booking not found");
  booking.status = status;
  await writeBookingsIndex(items);
}

export async function deleteBooking(id: string) {
  const items = await listBookings();
  const remaining = items.filter((b) => b.id !== id);
  if (remaining.length === items.length) throw new Error("Booking not found");
  await writeBookingsIndex(remaining);
}
