/**
 * Hero-matched gradient, aurora orbs, grid, and noise — spans full page height behind content.
 */
export function PageAmbientBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute -left-[180px] -top-[280px] h-[min(900px,90vw)] w-[min(900px,90vw)] animate-[roHeroAurora_18s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,rgba(var(--primary-color-rgb),0.2)_0%,rgba(var(--accent-violet-rgb),0.08)_42%,transparent_70%)] blur-[80px]"
        aria-hidden
      />
      <div
        className="absolute -right-[160px] -top-[120px] h-[min(700px,75vw)] w-[min(700px,75vw)] animate-[roHeroAurora_22s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,rgba(var(--accent-violet-rgb),0.16)_0%,rgba(var(--accent-pink-rgb),0.06)_45%,transparent_70%)] blur-[100px] [animation-direction:reverse] [animation-delay:-8s]"
        aria-hidden
      />
      <div
        className="absolute bottom-[-80px] left-[35%] h-[min(520px,60vw)] w-[min(520px,60vw)] animate-[roHeroAurora_14s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,rgba(var(--brand-blue-modern-rgb),0.12)_0%,transparent_65%)] blur-[80px] [animation-delay:-4s]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[length:72px_72px] bg-[linear-gradient(rgba(var(--primary-color-rgb),0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary-color-rgb),0.04)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_90%_70%_at_50%_0%,#000_0%,transparent_78%)] [-webkit-mask-image:radial-gradient(ellipse_90%_70%_at_50%_0%,#000_0%,transparent_78%)] dark:bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]"
        aria-hidden
      />
      <div className="hero-noise" aria-hidden />
    </div>
  );
}
