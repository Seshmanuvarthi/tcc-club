import { list, put, del } from "@vercel/blob";

export const MENU_PREFIX = "menu/";
export const NEWSLETTER_PREFIX = "newsletter/";
export const GALLERY_PREFIX = "gallery/";
export const COMMITTEE_PREFIX = "committee/";
const GALLERY_INDEX_PATH = "gallery/_index.json";
const BOOKINGS_INDEX_PATH = "bookings/_index.json";
const COMMITTEE_INDEX_PATH = "committee/_index.json";

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

export type CommitteeMember = {
  id: string;
  name: string;
  designation: string;
  sortOrder: number;
  photoUrl: string | null;
  photoPathname: string | null;
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

// ─── Committee ─────────────────────────────────────────────

const COMMITTEE_SEED: CommitteeMember[] = [
  { id: "seed-01", name: "Mr. Bollineni Seenaiah",                designation: "President",       sortOrder:  1, photoUrl: null, photoPathname: null },
  { id: "seed-02", name: "Mr. Sreepathi Narsimha Reddy",          designation: "Vice President",  sortOrder:  2, photoUrl: null, photoPathname: null },
  { id: "seed-03", name: "Mr. Nimma Sachitanand Reddy",           designation: "Secretary",       sortOrder:  3, photoUrl: null, photoPathname: null },
  { id: "seed-04", name: "Mr. Vemula Satya Murthy",               designation: "Joint Secretary", sortOrder:  4, photoUrl: null, photoPathname: null },
  { id: "seed-05", name: "Mr. Balmuri Sugunakar Rao",             designation: "Treasurer",       sortOrder:  5, photoUrl: null, photoPathname: null },
  { id: "seed-06", name: "Mr. Dachireddy Venkat Narsimha Reddy",  designation: "Director",        sortOrder:  6, photoUrl: null, photoPathname: null },
  { id: "seed-07", name: "Mr. Vaddi Bhaskar Reddy",               designation: "Director",        sortOrder:  7, photoUrl: null, photoPathname: null },
  { id: "seed-08", name: "Mr. Vanga Ravinder Reddy",              designation: "Director",        sortOrder:  8, photoUrl: null, photoPathname: null },
  { id: "seed-09", name: "Mr. Velpucherla Sudhakar",              designation: "Director",        sortOrder:  9, photoUrl: null, photoPathname: null },
  { id: "seed-10", name: "Mr. Katukuri Devender Reddy",           designation: "Director",        sortOrder: 10, photoUrl: null, photoPathname: null },
  { id: "seed-11", name: "Mr. Yavanamanda Sitarama Raju",         designation: "Director",        sortOrder: 11, photoUrl: null, photoPathname: null },
  { id: "seed-12", name: "Mr. Uppula Surender",                   designation: "Director",        sortOrder: 12, photoUrl: null, photoPathname: null },
  { id: "seed-13", name: "Mr. Sankineni Krishna Rao",             designation: "Director",        sortOrder: 13, photoUrl: null, photoPathname: null },
  { id: "seed-14", name: "Mr. Madireddy Narender Reddy",          designation: "Director",        sortOrder: 14, photoUrl: null, photoPathname: null },
  { id: "seed-15", name: "Mr. Patlolla Janardhan Reddy",          designation: "Director",        sortOrder: 15, photoUrl: null, photoPathname: null },
  { id: "seed-16", name: "Mr. Churukanti Pavan",                  designation: "Director",        sortOrder: 16, photoUrl: null, photoPathname: null },
  { id: "seed-17", name: "Mr. Nerella Janardana Rao",             designation: "Director",        sortOrder: 17, photoUrl: null, photoPathname: null },
];

async function findCommitteeIndexBlob() {
  const { blobs } = await list({ prefix: COMMITTEE_INDEX_PATH });
  return blobs.find((b) => b.pathname === COMMITTEE_INDEX_PATH) ?? null;
}

async function readCommitteeIndex(): Promise<CommitteeMember[] | null> {
  try {
    const indexBlob = await findCommitteeIndexBlob();
    if (!indexBlob) return null;
    const res = await fetch(`${indexBlob.url}?_=${Date.now()}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const items = await res.json();
    return Array.isArray(items) ? (items as CommitteeMember[]) : null;
  } catch (err) {
    console.error("readCommitteeIndex failed", err);
    return null;
  }
}

async function writeCommitteeIndex(items: CommitteeMember[]) {
  const existing = await findCommitteeIndexBlob();
  if (existing) await del(existing.url).catch(() => {});
  await put(COMMITTEE_INDEX_PATH, JSON.stringify(items, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
  });
}

function sortCommittee(items: CommitteeMember[]) {
  return [...items].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function listCommittee(): Promise<CommitteeMember[]> {
  // Offline / no token — return the seed without persisting
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return sortCommittee(COMMITTEE_SEED);
  }
  const existing = await readCommitteeIndex();
  if (existing && existing.length > 0) {
    return sortCommittee(existing);
  }
  // First-ever read — seed the manifest, then return
  try {
    await writeCommitteeIndex(COMMITTEE_SEED);
  } catch (err) {
    console.error("Failed to seed committee", err);
  }
  return sortCommittee(COMMITTEE_SEED);
}

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function addCommitteeMember(input: {
  name: string;
  designation: string;
  sortOrder: number;
  photoFile?: File | null;
}): Promise<CommitteeMember> {
  const items = await listCommittee();
  const id = newId();
  let photoUrl: string | null = null;
  let photoPathname: string | null = null;
  if (input.photoFile && input.photoFile.size > 0) {
    const safe = sanitize(input.photoFile.name);
    const path = `${COMMITTEE_PREFIX}${id}-${safe}`;
    const r = await put(path, input.photoFile, {
      access: "public",
      contentType: input.photoFile.type || undefined,
    });
    photoUrl = r.url;
    photoPathname = r.pathname;
  }
  const member: CommitteeMember = {
    id,
    name: input.name.trim(),
    designation: input.designation.trim(),
    sortOrder: input.sortOrder,
    photoUrl,
    photoPathname,
  };
  await writeCommitteeIndex([...items, member]);
  return member;
}

export async function updateCommitteeMember(
  id: string,
  input: {
    name?: string;
    designation?: string;
    sortOrder?: number;
    photoFile?: File | null;
    removePhoto?: boolean;
  }
): Promise<CommitteeMember> {
  const items = await listCommittee();
  const member = items.find((m) => m.id === id);
  if (!member) throw new Error("Committee member not found");

  if (input.name !== undefined) member.name = input.name.trim();
  if (input.designation !== undefined)
    member.designation = input.designation.trim();
  if (input.sortOrder !== undefined) member.sortOrder = input.sortOrder;

  // Photo handling: remove first if requested or new file given
  if (input.removePhoto || (input.photoFile && input.photoFile.size > 0)) {
    if (member.photoUrl) {
      await del(member.photoUrl).catch(() => {});
      member.photoUrl = null;
      member.photoPathname = null;
    }
  }
  if (input.photoFile && input.photoFile.size > 0) {
    const safe = sanitize(input.photoFile.name);
    const path = `${COMMITTEE_PREFIX}${id}-${safe}`;
    const r = await put(path, input.photoFile, {
      access: "public",
      contentType: input.photoFile.type || undefined,
    });
    member.photoUrl = r.url;
    member.photoPathname = r.pathname;
  }

  await writeCommitteeIndex(items);
  return member;
}

export async function deleteCommitteeMember(id: string) {
  const items = await listCommittee();
  const member = items.find((m) => m.id === id);
  if (!member) throw new Error("Committee member not found");
  if (member.photoUrl) {
    await del(member.photoUrl).catch(() => {});
  }
  await writeCommitteeIndex(items.filter((m) => m.id !== id));
}
