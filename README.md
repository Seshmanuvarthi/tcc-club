# Telangana Contractors Cultural Club — Website

Members' website for the Telangana Contractors Cultural Club (TCC). Built with
Next.js 16, Tailwind CSS 4, and TypeScript.

Public pages: Home, Daily Menu, Facilities, About Us, Board of Directors,
Gallery, Newsletter, Contact Us, Online Payments, Online Booking.

Admin area (single login): Daily Menu upload + Newsletter upload with
manual Instagram/Facebook share buttons.

---

## 1. Local setup

```bash
cd tcc
npm install
cp .env.example .env.local
# fill the values in .env.local (see step 2)
npm run dev
```

Visit <http://localhost:3000>.

## 2. Environment variables

Edit `.env.local`:

### `ADMIN_USER`
The username the admin uses to log in. Anything you like — `admin`,
`tcc-admin`, etc.

### `ADMIN_PASSWORD_HASH`
A bcrypt hash of the admin password. **Never store the plain password.**

Generate the hash:

```bash
node -e "console.log(require('bcryptjs').hashSync('YOUR-PASSWORD', 10))"
```

> **⚠️ Gotcha for local `.env.local`:** the hash starts with `$2a$10$…`
> and Next.js performs variable expansion on `$` characters even inside
> single or double quotes. You **must** escape each `$` with a backslash
> before pasting.
>
> Example:
> - bcrypt output: `$2a$10$AbCdEfGhIjKlMn...`
> - paste as:     `ADMIN_PASSWORD_HASH=\$2a\$10\$AbCdEfGhIjKlMn...`
>
> Verify it loaded correctly: `npm run dev`, then in another terminal
> `curl -X POST http://localhost:3000/api/auth/login -d '{"username":"admin","password":"YOUR-PASSWORD"}' -H "Content-Type: application/json"` should return `{"ok":true}`.
>
> **On Vercel** (deployed env vars), the `$` characters are NOT expanded —
> paste the raw hash without any backslashes.

### `SESSION_SECRET`
A random 32+ character string used to sign the login cookie.

Generate one:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### `BLOB_READ_WRITE_TOKEN`
The token for Vercel Blob storage. The Daily Menu and Newsletter uploads use
this. Without it, the admin upload forms will refuse uploads with a clear
error.

See *Vercel Blob setup* below for how to get this.

---

## 3. Vercel Blob setup

Vercel Blob is the cloud storage for the daily menu image and newsletter
files. Free tier gives 1 GB.

1. Push this repo to GitHub.
2. Go to <https://vercel.com>, click **Add New → Project**, import the repo.
3. After import, open the project → **Storage** tab → **Create Database** →
   choose **Blob**. Accept defaults.
4. Vercel auto-injects `BLOB_READ_WRITE_TOKEN` into the deployed app — no
   manual copying needed for production.
5. For **local development**, click your Blob store → **`.env.local`** tab →
   copy the `BLOB_READ_WRITE_TOKEN` value into your local `.env.local`.

That's it. The Daily Menu and Newsletter uploads now work.

---

## 4. Admin usage

- Go to `/admin/login` and sign in with `ADMIN_USER` + your password.
- Dashboard at `/admin` has two tiles: **Daily Menu** and **Newsletter**.
- **Daily Menu** → upload a new image. It replaces the previous menu and is
  immediately visible on `/daily-menu`.
- **Newsletter** → upload an image or PDF. Past uploads are preserved. The
  upload list shows **Share to Instagram** and **Share to Facebook** buttons:
  - Facebook share opens the standard share dialog with the file URL.
  - Instagram share copies the file URL to clipboard and opens
    [@tccclub.in](https://www.instagram.com/tccclub.in/) so you can paste it
    into a new post.

---

## 5. Booking form

The Online Booking form writes to `data/bookings.json` locally.

> **Production warning:** On Vercel, the filesystem is read-only at
> runtime, so the JSON write will fail in production. Before going live,
> switch the API at [app/api/bookings/route.ts](app/api/bookings/route.ts) to
> either:
> 1. Save bookings to Vercel Blob (e.g. `bookings/<timestamp>.json`), or
> 2. Email the booking to a TCC inbox (Resend, SMTP, etc.).
>
> This is intentionally left as a placeholder — the working plan says
> "we'll think about this later."

---

## 6. Deploying to Vercel + GoDaddy domain

The site is built to deploy on **Vercel** (free tier) with your GoDaddy
domain pointing at it.

### One-time deploy

1. Push this repo to GitHub.
2. Import into Vercel — auto-detects Next.js, builds, deploys.
3. In Vercel **Settings → Environment Variables**, add:
   - `ADMIN_USER`
   - `ADMIN_PASSWORD_HASH`
   - `SESSION_SECRET`
   - `BLOB_READ_WRITE_TOKEN` (Vercel sets this automatically when you create
     a Blob store — verify it's present)
4. Redeploy after adding env vars.

### Connect your GoDaddy domain

1. In Vercel → Project → **Settings → Domains** → add your domain
   (e.g. `tccclub.in`).
2. Vercel shows you the exact DNS records to add.
3. Log into GoDaddy → **My Products → DNS** for the domain.
4. Add the records Vercel shows (typically):
   - `A` record `@` → `76.76.21.21`
   - `CNAME` record `www` → `cname.vercel-dns.com`
5. Wait ~10 minutes for DNS to propagate. Vercel auto-issues an SSL
   certificate once it sees the records.
6. The site is live at `https://tccclub.in`.

### Every future deploy

Just `git push` to GitHub — Vercel rebuilds and deploys automatically.

---

## 7. Editing content

Most pages are static and live under `app/`. To swap placeholder content for
real content:

- Director names, bios, photos → [app/about/directors/page.tsx](app/about/directors/page.tsx)
- Staff contact numbers → [app/contact/page.tsx](app/contact/page.tsx)
- Full club history → [app/page.tsx](app/page.tsx) and [app/about/page.tsx](app/about/page.tsx)
- Address & Google Map → [app/page.tsx](app/page.tsx), [app/contact/page.tsx](app/contact/page.tsx) — replace
  the `iframe` `src` with a fresh embed URL from <https://maps.google.com>
  (click **Share → Embed a map**).
- Facility images and copy → [app/facilities/page.tsx](app/facilities/page.tsx)
- Gallery images → drop files into `public/images/` and update the array in
  [app/gallery/page.tsx](app/gallery/page.tsx)
- Logo → replace `public/images/logo.png`

---

## 8. Tech notes

- Next.js 16 (App Router) + Tailwind 4 + TypeScript
- Auth: bcrypt password hash + iron-session httpOnly cookie
- Storage: Vercel Blob for menu + newsletter files
- No traditional database — the site is essentially stateless

## 9. Project structure

```
app/
  page.tsx                  Home
  layout.tsx                Root layout (Navbar + Footer)
  globals.css               Brand tokens
  about/                    About Us
    page.tsx
    directors/page.tsx
  facilities/page.tsx
  gallery/page.tsx
  contact/page.tsx
  online-payments/page.tsx
  online-booking/page.tsx
  daily-menu/page.tsx       Public menu (reads Blob)
  newsletter/page.tsx       Public archive (reads Blob)
  admin/
    login/page.tsx
    page.tsx                Dashboard
    menu/                   Menu upload
    newsletter/             Newsletter upload + share
  api/
    auth/{login,logout}/route.ts
    admin/{menu,newsletter}/route.ts
    bookings/route.ts
components/
  Navbar.tsx
  Footer.tsx
lib/
  blob.ts                   Vercel Blob helpers
  session.ts                iron-session config
data/
  bookings.json             Local booking submissions
public/
  images/                   Logo and facility images
```
