import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** The published Car Fintech wordmark (charcoal on transparent); inverted on dark surfaces. */
export function Logo({ className, invert = false, priority = false }: { className?: string; invert?: boolean; priority?: boolean }) {
  return (
    <Link href="/" aria-label="Car Fintech home" className={cn("inline-flex items-center", className)}>
      <Image
        src="/images/brand/logo.webp"
        alt="Car Fintech"
        width={847}
        height={214}
        priority={priority}
        className={cn("h-8 w-auto md:h-9", invert ? "brightness-0 invert" : "dark:brightness-0 dark:invert")}
      />
    </Link>
  );
}
