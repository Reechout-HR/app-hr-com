import { PAGE_SHELL_CLASS } from "@/components/page-shell";

import { HomeWhyChooseBento } from "./home-why-choose-bento";

export function HomeWhyChooseSection() {
  return (
    <section
      id="why-choose-reechout"
      className="relative w-full overflow-hidden py-20 md:py-28"
      aria-label="Why Choose ReechOut"
    >
      <div className={`relative z-[1] ${PAGE_SHELL_CLASS}`}>
        <HomeWhyChooseBento />
      </div>
    </section>
  );
}
