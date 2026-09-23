import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { services } from "@/lib/content/services";
import { Logo } from "@/components/navigation/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/primitives";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { Wordmark } from "./Wordmark";

const aboutLinks = [
  { href: "/about-us", label: "About Car Fintech" },
  { href: "/chirag-babbar", label: "Chirag Babbar" },
  { href: "/blog", label: "Latest Articles" },
  { href: "/refer-a-friend", label: "Refer a Friend" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

function Facebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M13.5 22v-8.2h2.8l.4-3.3h-3.2V8.4c0-.9.3-1.6 1.6-1.6h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.3h2.8V22h3.4z" />
    </svg>
  );
}

function Instagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Linkedin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M6.5 8.5H3.2V21h3.3V8.5zM4.9 3a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8zM21 13.3c0-3.3-1.8-4.9-4.3-4.9-1.9 0-2.8 1-3.3 1.8V8.5H10V21h3.3v-6.6c0-1.7.6-2.9 2.2-2.9 1.5 0 2.1 1.1 2.1 2.9V21H21v-7.7z" />
    </svg>
  );
}

function TikTok(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12.5 2h3.1c.2 1.8 1.3 3.4 3 4.1.7.3 1.5.5 2.4.5v3.2c-1.9 0-3.6-.6-5.1-1.6v6.9c0 3.8-3.1 6.9-6.9 6.9S2.1 18.9 2.1 15.1s3.1-6.9 6.9-6.9c.4 0 .8 0 1.2.1v3.3c-.4-.1-.8-.2-1.2-.2-2 0-3.7 1.7-3.7 3.7s1.7 3.7 3.7 3.7 3.7-1.7 3.7-3.7L12.5 2z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-dark text-white">
      <div className="pointer-events-none absolute inset-0 grid-bg mask-radial opacity-60" aria-hidden />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" aria-hidden />

      <Container className="relative">
        {/* Link columns */}
        <div className="grid grid-cols-1 gap-10 py-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo invert />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">{site.tagline}. At Car Fintech, we help individuals and businesses across Australia access smart asset finance solutions.</p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-start gap-3 text-white/80">
                <MapPin size={16} className="mt-0.5 shrink-0 text-accent-bright" />
                <span>{site.address.full}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-accent-bright" />
                <PhoneLink location="footer" className="font-numeric text-white/90 hover:text-accent-bright" />
              </li>
            </ul>
            <ul className="mt-6 flex gap-2">
              {[
                { href: site.social.facebook, label: "Facebook", Icon: Facebook },
                { href: site.social.instagram, label: "Instagram", Icon: Instagram },
                { href: site.social.linkedin, label: "LinkedIn", Icon: Linkedin },
                { href: site.social.tiktok, label: "TikTok", Icon: TikTok },
              ].map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-accent hover:bg-accent hover:text-white"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow mb-4 text-white/50">About Us</p>
            <ul className="space-y-2.5 text-sm">
              {aboutLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/80 transition-colors hover:text-accent-bright">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow mb-4 text-white/50">Services</p>
            <ul className="grid grid-cols-1 gap-2.5 text-sm sm:grid-cols-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} className="text-white/80 transition-colors hover:text-accent-bright">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow mb-4 text-white/50">Get started</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/get-quote" className="text-white/80 transition-colors hover:text-accent-bright">
                  Get a Quote
                </Link>
              </li>
              <li>
                <Link href="/book-appointment" className="text-white/80 transition-colors hover:text-accent-bright">
                  Book Appointment
                </Link>
              </li>
              <li>
                <PhoneLink location="footer_links" label="Call Us" className="text-white/80 transition-colors hover:text-accent-bright" />
              </li>
            </ul>
          </div>
        </div>

        {/* Compliance */}
        <div className="border-t border-white/10 py-8 text-xs leading-relaxed text-white/50">
          <p className="text-white/70">{site.compliance.statement}</p>
          <p className="mt-3 max-w-5xl">{site.disclaimer}</p>
          <p className="mt-4">
            © {year} {site.name}. All rights reserved.
            {process.env.NEXT_PUBLIC_DEMO === "1" && <span className="ml-2 text-white/40">Demo build by {process.env.NEXT_PUBLIC_DEMO_OWNER || "Aditya Shoor"} · design and code provided for evaluation only.</span>}
          </p>
        </div>
      </Container>
      <Wordmark />
      {/* Space for the mobile sticky CTA */}
      <div className="h-20 md:hidden" aria-hidden />
    </footer>
  );
}
