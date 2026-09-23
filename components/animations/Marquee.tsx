import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * 21st.dev-style marquee: content is duplicated once and translated by -50%,
 * so the loop is seamless. Pauses on hover. Pure CSS.
 */
export function Marquee({
  children,
  className,
  reverse = false,
  vertical = false,
  pauseOnHover = true,
  duration = 60,
  gap = "1.5rem",
}: {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  vertical?: boolean;
  pauseOnHover?: boolean;
  duration?: number;
  gap?: string;
}) {
  const style = { "--gap": gap, animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" } as React.CSSProperties;
  const track = cn(
    "flex shrink-0 will-change-transform",
    vertical ? "flex-col animate-marquee-vertical" : "flex-row animate-marquee",
    pauseOnHover && "group-hover:[animation-play-state:paused]",
  );
  return (
    <div className={cn("group flex overflow-hidden", vertical ? "flex-col" : "flex-row", className)} style={{ gap } as React.CSSProperties}>
      <div className={track} style={{ ...style, gap }}>
        {children}
      </div>
      <div className={track} style={{ ...style, gap }} aria-hidden>
        {children}
      </div>
    </div>
  );
}
