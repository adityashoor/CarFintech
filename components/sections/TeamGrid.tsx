import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { team } from "@/lib/content/team";
import { SectionHeading } from "@/components/ui/primitives";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { Spotlight } from "@/components/animations/Spotlight";

/** The four published team members with their portraits, roles and bios. */
export function TeamGrid() {
  return (
    <section className="section-y bg-bg" aria-labelledby="team-heading">
      <div className="container-x">
        <SectionHeading number="02" eyebrow="Our team" title={["The people behind", "your approval"]} description="Qualified finance brokers and admin support, based in Melbourne and working with clients nationwide." />
        <Stagger className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2" stagger={0.1}>
          {team.map((m) => {
            const profile = m.slug === "chirag-babbar" ? "/chirag-babbar" : null;
            const card = (
              <Spotlight as="article" glow className="group flex h-full flex-col gap-6 rounded-2xl border border-line bg-surface p-5 shadow-card sm:flex-row sm:gap-8 sm:p-6">
                <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden rounded-2xl bg-dark sm:sticky sm:top-32 sm:w-[44%] sm:self-start sm:aspect-[3/4]">
                  <Image src={m.image} alt={`About ${m.name}`} fill quality={95} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 44vw, 100vw" className="object-cover object-top grayscale transition duration-700 group-hover:grayscale-0" />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-heading text-2xl font-bold tracking-tight text-ink">
                        {profile ? (
                          <Link href={profile} className="hover:text-slate">
                            {m.name}
                          </Link>
                        ) : (
                          m.name
                        )}
                      </h3>
                      <p className="mt-1 font-numeric text-xs uppercase tracking-[0.14em] text-slate">{m.role}</p>
                    </div>
                    {profile && (
                      <Link href={profile} aria-label={`View ${m.name}'s profile`} className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink text-surface transition-colors hover:bg-accent hover:text-white">
                        <ArrowUpRight size={16} />
                      </Link>
                    )}
                  </div>
                  <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-muted">
                    {m.bio.map((b, i) => (
                      <p key={i}>{b}</p>
                    ))}
                  </div>
                  {(m.phone || m.email) && (
                    <div className="mt-5 flex flex-wrap gap-4 text-sm font-medium text-ink">
                      {m.phone && (
                        <a href={`tel:${m.phone.tel}`} className="inline-flex items-center gap-2 hover:text-slate">
                          <Phone size={14} /> {m.phone.display}
                        </a>
                      )}
                      {m.email && (
                        <a href={`mailto:${m.email}`} className="inline-flex items-center gap-2 hover:text-slate">
                          <Mail size={14} /> {m.email}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </Spotlight>
            );
            return (
              <StaggerItem key={m.slug} className="h-full">
                {card}
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
