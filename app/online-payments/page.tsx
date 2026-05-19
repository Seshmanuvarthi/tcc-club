import type { Metadata } from "next";
import Link from "next/link";
import { CreditCard, ExternalLink, Shield, Clock, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Online Payments",
  description:
    "Pay membership dues, event bills, and other charges securely through the official TCC members' payment portal at mem.tccclub.net.",
  openGraph: {
    title: "Online Payments | TCC Members' Portal",
    description:
      "Pay dues and bills securely through the official TCC members' portal.",
  },
};

export default function OnlinePaymentsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-ink py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red rounded-full blur-3xl opacity-15" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-brand-gold rounded-full blur-3xl opacity-10" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-brand-gold font-semibold tracking-widest uppercase text-sm mb-4">
            Members&apos; Portal
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Online <span className="gold-gradient-text">Payments</span>
          </h1>
          <p className="text-brand-cream/80 text-lg max-w-3xl mx-auto leading-relaxed">
            Pay your membership dues, event bills, and other charges securely
            through the official TCC members&apos; portal.
          </p>
        </div>
      </section>

      {/* Main payment card */}
      <section className="bg-brand-cream py-6 sm:py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-brand-gold/30 shadow-xl text-center">
            <div className="w-20 h-20 bg-brand-red rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-red/20">
              <CreditCard className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-brand-ink mb-4">
              TCC Members&apos; Payment Portal
            </h2>
            <p className="text-brand-ink/70 mb-8 leading-relaxed">
              You will be redirected to the official members&apos; portal at{" "}
              <span className="font-semibold text-brand-red">
                mem.tccclub.net
              </span>{" "}
              where you can securely log in and complete your payment.
            </p>
            <a
              href="https://mem.tccclub.net"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-8 py-4 rounded-xl transition-colors shadow-lg shadow-brand-red/25"
            >
              Go to Payments Portal
              <ExternalLink className="w-4 h-4" />
            </a>
            <p className="text-sm text-brand-ink/50 mt-6">
              Opens in a new tab. You will need your TCC member credentials.
            </p>
          </div>
        </div>
      </section>

      {/* Info row */}
      <section className="bg-white py-6 sm:py-8 border-y border-brand-gold/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid sm:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-brand-gold/15 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-brand-gold-dark" />
            </div>
            <h3 className="font-bold text-brand-ink mb-1">Secure</h3>
            <p className="text-brand-ink/60 text-sm">
              Payments are processed on the secure official TCC members&apos;
              portal.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-brand-gold/15 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-brand-gold-dark" />
            </div>
            <h3 className="font-bold text-brand-ink mb-1">24×7</h3>
            <p className="text-brand-ink/60 text-sm">
              Pay anytime, from anywhere. No need to visit the club office.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-brand-gold/15 rounded-xl flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-6 h-6 text-brand-gold-dark" />
            </div>
            <h3 className="font-bold text-brand-ink mb-1">Need Help?</h3>
            <p className="text-brand-ink/60 text-sm">
              Contact the accounts desk if you face any issues with payments.
            </p>
          </div>
        </div>
      </section>

      {/* Help CTA */}
      <section className="bg-brand-cream py-6 sm:py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-ink mb-3">
            Trouble paying online?
          </h2>
          <p className="text-brand-ink/70 mb-6">
            Get in touch with our accounts team and we&apos;ll help you out.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Contact Accounts
          </Link>
        </div>
      </section>
    </>
  );
}
