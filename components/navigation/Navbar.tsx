"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { site } from "@/lib/site";
import { businessServices, consumerServices } from "@/lib/content/services";
import { track } from "@/lib/analytics/track";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/Button";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

interface MenuLink {
  href: string;
  label: string;
  description?: string;
  icon?: ReactNode;
}
interface MenuGroup {
  label: string;
  links: MenuLink[];
  columns?: 1 | 2;
}

const groups: MenuGroup[] = [
  {
    label: "About Us",
    links: [
      { href: "/about-us", label: "About Car Fintech", description: "Melbourne's leading asset finance broker" },
      { href: "/chirag-babbar", label: "Chirag Babbar", description: "Director" },
    ],
  },
  {
    label: "Business",
    columns: 2,
    links: businessServices.map((s) => ({ href: `/${s.slug}`, label: s.name, description: s.short, icon: <ServiceIcon icon={s.icon} size={20} /> })),
  },
  {
    label: "Consumer",
    columns: 2,
    links: consumerServices.map((s) => ({ href: `/${s.slug}`, label: s.name, description: s.short, icon: <ServiceIcon icon={s.icon} size={20} /> })),
  },
];

const singles: MenuLink[] = [
  { href: "/refer-a-friend", label: "Refer a Friend" },
  { href: "/book-appointment", label: "Book Appointment" },
];

const menuList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035, delayChildren: 0.05 } },
};
const menuItem = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT_EXPO } },
};

/**
 * Floating navbar. Transparent over the light hero, then a solid white bar
 * that narrows into a compact pill as you scroll. Slides away when scrolling
 * down and returns on the first upward scroll. A highlight glides between
 * items on hover, the active route carries an underline, and mega-menu items
 * cascade in.
 */
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const lastY = useRef(0);

  // Close menus on navigation: derive from the pathname instead of an effect.
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setMobile(false);
    setOpen(null);
  }

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
    const goingDown = y > lastY.current + 4;
    const goingUp = y < lastY.current - 4;
    if (goingDown && y > 160 && !open) setHidden(true);
    else if (goingUp || y <= 160) setHidden(false);
    if (goingDown || goingUp) lastY.current = y;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", mobile);
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [mobile]);

  const solid = scrolled || mobile;
  const itemBase = "relative isolate flex h-10 items-center gap-1 rounded-lg px-3.5 text-sm font-medium text-ink transition-colors";
  const isActive = (href: string) => pathname === href;
  const groupActive = (g: MenuGroup) => g.links.some((l) => isActive(l.href));

  return (
    <motion.header
      animate={{ y: hidden && !mobile ? "-120%" : "0%" }}
      transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className={cn("container-x transition-[padding] duration-500", solid ? "pt-2 md:pt-3" : "pt-3 md:pt-5")}>
        <nav
          aria-label="Primary"
          className={cn(
            "relative mx-auto flex items-center justify-between rounded-xl px-3 md:px-4",
            "transition-[max-width,height,background-color,box-shadow,border-color] duration-500 ease-out-expo",
            solid
              ? "h-16 max-w-[76rem] border border-line bg-surface/95 shadow-card backdrop-blur-md md:h-[68px]"
              : "h-[68px] max-w-[88rem] border border-transparent bg-transparent md:h-[84px]",
          )}
        >
          <Logo priority className="pl-1" />

          {/* Desktop menu */}
          <LayoutGroup id="primary-nav">
            <ul
              className="hidden items-center gap-1 lg:flex"
              onMouseLeave={() => {
                setOpen(null);
                setHovered(null);
              }}
            >
              {groups.map((g) => (
                <li
                  key={g.label}
                  className="relative"
                  onMouseEnter={() => {
                    setOpen(g.label);
                    setHovered(g.label);
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={open === g.label}
                    onClick={() => setOpen(open === g.label ? null : g.label)}
                    onFocus={() => {
                      setOpen(g.label);
                      setHovered(g.label);
                    }}
                    className={itemBase}
                  >
                    {hovered === g.label && <motion.span layoutId="nav-hover" className="absolute inset-0 -z-10 rounded-lg bg-ink/[0.06]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                    {groupActive(g) && <motion.span layoutId="nav-active" className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-accent" />}
                    {g.label}
                    <ChevronDown size={14} className={cn("transition-transform duration-300", open === g.label && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {open === g.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
                        className={cn("absolute left-0 top-full pt-3", g.columns === 2 ? "w-[640px]" : "w-80")}
                      >
                        <div className="rounded-xl border border-line bg-surface p-2 shadow-card">
                          <motion.ul variants={menuList} initial="hidden" animate="visible" className={cn("grid grid-cols-1 gap-1", g.columns === 2 && "grid-cols-2")}>
                            {g.links.map((l) => (
                              <motion.li key={l.href} variants={menuItem}>
                                <Link href={l.href} className={cn("group flex gap-3 rounded-lg p-3 transition-colors hover:bg-bg", isActive(l.href) && "bg-bg")}>
                                  {l.icon && (
                                    <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent-deep transition-colors group-hover:bg-accent group-hover:text-white">
                                      {l.icon}
                                    </span>
                                  )}
                                  <span>
                                    <span className="block text-sm font-semibold text-ink">{l.label}</span>
                                    {l.description && <span className="mt-0.5 block text-xs leading-snug text-muted">{l.description}</span>}
                                  </span>
                                </Link>
                              </motion.li>
                            ))}
                          </motion.ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
              {singles.map((l) => (
                <li
                  key={l.href}
                  className="relative"
                  onMouseEnter={() => {
                    setOpen(null);
                    setHovered(l.href);
                  }}
                >
                  <Link href={l.href} className={itemBase}>
                    {hovered === l.href && <motion.span layoutId="nav-hover" className="absolute inset-0 -z-10 rounded-lg bg-ink/[0.06]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                    {isActive(l.href) && <motion.span layoutId="nav-active" className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-accent" />}
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </LayoutGroup>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${site.phone.tel}`}
              onClick={() => track("phone_clicked", { location: "navbar" })}
              className="group hidden h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-ink transition-colors hover:bg-ink/[0.06] md:flex"
            >
              <span className="flex size-7 items-center justify-center rounded-full bg-accent-soft text-accent-deep transition-colors group-hover:bg-accent group-hover:text-white">
                <Phone size={13} />
              </span>
              <span className="hidden xl:inline">Call Us</span>
              <span className="font-numeric tabular-nums">{site.phone.display}</span>
            </a>
            <ThemeToggle />
            <Button href="/get-quote" size="sm" className="hidden md:inline-flex" magnetic={false}>
              Get a Quote
            </Button>
            <button
              type="button"
              aria-label={mobile ? "Close menu" : "Open menu"}
              aria-expanded={mobile}
              onClick={() => setMobile((m) => !m)}
              className="flex size-11 items-center justify-center rounded-lg text-ink transition-colors hover:bg-ink/[0.06] lg:hidden"
            >
              {mobile ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[72px] z-40 overflow-y-auto bg-surface lg:hidden"
            data-lenis-prevent
          >
            <motion.div variants={menuList} initial="hidden" animate="visible" className="container-x flex min-h-full flex-col gap-8 pb-32 pt-6">
              {groups.map((g) => (
                <motion.div key={g.label} variants={menuItem}>
                  <p className="eyebrow mb-3 text-muted">{g.label}</p>
                  <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                    {g.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className={cn("flex items-center gap-3 rounded-lg border border-line bg-bg px-4 py-3 text-sm font-semibold text-ink", isActive(l.href) && "border-accent")}>
                          {l.icon && <span className="text-accent-deep">{l.icon}</span>}
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
              <motion.div variants={menuItem}>
                <p className="eyebrow mb-3 text-muted">More</p>
                <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                  {singles.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="flex items-center rounded-lg border border-line bg-bg px-4 py-3 text-sm font-semibold text-ink">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div variants={menuItem} className="flex flex-col gap-3">
                <Button href="/get-quote" size="lg" block>
                  Get a Quote
                </Button>
                <Button href={`tel:${site.phone.tel}`} variant="outline" size="lg" block arrow={false} onClick={() => track("phone_clicked", { location: "mobile_menu" })}>
                  <Phone size={16} className="mr-2 inline" /> Call Us {site.phone.display}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
