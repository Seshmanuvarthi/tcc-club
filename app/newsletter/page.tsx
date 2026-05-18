import Image from "next/image";
import Link from "next/link";
import { listNewsletters } from "@/lib/blob";
import { FileText, Image as ImageIcon, ExternalLink, Newspaper } from "lucide-react";
import { InstagramIcon } from "@/components/SocialIcons";

export const dynamic = "force-dynamic";

export default async function NewsletterPage() {
  const items = await listNewsletters();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-ink py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red rounded-full blur-3xl opacity-15" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-brand-gold rounded-full blur-3xl opacity-10" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-brand-gold font-semibold tracking-widest uppercase text-sm mb-4">
            News &amp; Updates
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            TCC <span className="gold-gradient-text">Newsletter</span>
          </h1>
          <p className="text-brand-cream/80 text-lg max-w-3xl mx-auto leading-relaxed">
            Daily news, announcements, and event updates from the Telangana
            Contractors Cultural Club.
          </p>
          <a
            href="https://www.instagram.com/tccclub.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 text-brand-gold hover:text-white text-sm font-semibold"
          >
            <InstagramIcon className="w-4 h-4" />
            Follow @tccclub.in on Instagram
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* List */}
      <section className="bg-brand-cream py-6 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {items.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 sm:p-16 border border-brand-gold/30 shadow-xl text-center max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-brand-gold/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Newspaper className="w-10 h-10 text-brand-gold-dark" />
              </div>
              <h2 className="text-2xl font-bold text-brand-ink mb-3">
                No Newsletters Yet
              </h2>
              <p className="text-brand-ink/70 mb-2 max-w-md mx-auto">
                The newsletter archive is empty at the moment. Once the club
                posts an update, it will appear here.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-sm text-brand-ink/60">
                  Showing <strong>{items.length}</strong> post
                  {items.length === 1 ? "" : "s"}, newest first.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <article
                    key={item.url}
                    className="bg-white rounded-2xl overflow-hidden border border-brand-gold/20 shadow-sm card-hover flex flex-col"
                  >
                    <div className="aspect-[4/3] bg-brand-cream relative">
                      {item.isPdf ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="w-20 h-20 bg-brand-red rounded-2xl flex items-center justify-center mb-3">
                            <FileText className="w-10 h-10 text-white" />
                          </div>
                          <p className="text-brand-ink/60 text-sm font-semibold uppercase tracking-widest">
                            PDF Document
                          </p>
                        </div>
                      ) : (
                        <Image
                          src={item.url}
                          alt={item.filename}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover"
                          unoptimized
                        />
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2 text-xs text-brand-gold-dark font-semibold uppercase tracking-widest">
                        {item.isPdf ? (
                          <FileText className="w-3.5 h-3.5" />
                        ) : (
                          <ImageIcon className="w-3.5 h-3.5" />
                        )}
                        {item.isPdf ? "PDF" : "Image"}
                      </div>
                      <p className="text-brand-ink font-semibold text-sm mb-2 truncate" title={item.filename}>
                        {item.filename}
                      </p>
                      <p className="text-brand-ink/50 text-xs mb-4">
                        Posted{" "}
                        {new Date(item.uploadedAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          timeZone: "Asia/Kolkata",
                        })}
                      </p>
                      <div className="mt-auto flex gap-2">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center bg-brand-red hover:bg-brand-red-dark text-white text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
                        >
                          View
                        </a>
                        <a
                          href={item.url}
                          download
                          className="flex-1 text-center border border-brand-red text-brand-red hover:bg-brand-red hover:text-white text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Subscribe / Follow CTA */}
      <section className="bg-brand-ink py-6 sm:py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Stay Updated
          </h2>
          <p className="text-brand-cream/70 mb-6">
            Follow TCC on social media for live updates and event announcements.
          </p>
          <Link
            href="https://www.instagram.com/tccclub.in/"
            target="_blank"
            className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <InstagramIcon className="w-4 h-4" />
            Follow on Instagram
          </Link>
        </div>
      </section>
    </>
  );
}
