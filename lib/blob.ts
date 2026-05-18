import { list, put, del } from "@vercel/blob";

export const MENU_PREFIX = "menu/";
export const NEWSLETTER_PREFIX = "newsletter/";

export type NewsletterItem = {
  url: string;
  pathname: string;
  filename: string;
  uploadedAt: string;
  size: number;
  contentType: string;
  isPdf: boolean;
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
