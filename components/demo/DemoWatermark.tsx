/**
 * Demo-mode overlays (NEXT_PUBLIC_DEMO=1): a faint repeating ownership
 * watermark that survives screenshots and screen recordings, plus a small
 * badge. Purely visual: it does not block interaction.
 */
export function DemoWatermark({ owner }: { owner: string }) {
  const line = `DEMO · © ${new Date().getFullYear()} ${owner} · EVALUATION ONLY · NOT FOR REPRODUCTION`;
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] overflow-hidden select-none print:hidden">
        <div className="absolute -inset-[60%] flex -rotate-[24deg] flex-col gap-24 opacity-[0.045] dark:opacity-[0.06]">
          {Array.from({ length: 14 }).map((_, i) => (
            <p key={i} className="whitespace-nowrap font-numeric text-[clamp(1.5rem,3vw,2.5rem)] font-semibold tracking-[0.3em] text-ink" style={{ marginLeft: `${(i % 3) * 14}rem` }}>
              {`${line}   ${line}   ${line}`}
            </p>
          ))}
        </div>
      </div>
      <p aria-label="Demo build" className="pointer-events-none fixed bottom-3 left-3 z-[71] rounded-md bg-dark/85 px-2.5 py-1 font-numeric text-[10px] font-medium uppercase tracking-[0.18em] text-white/85 print:hidden">
        Demo build · evaluation only
      </p>
    </>
  );
}
