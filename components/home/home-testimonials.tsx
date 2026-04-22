import { PAGE_SHELL_CLASS } from "@/components/page-shell";
import { HomeTestimonialsSlider } from "./home-testimonials-slider";
import { SectionHeader } from "./section-header";

export function HomeTestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative w-full overflow-hidden py-20 md:py-28"
      aria-label="Customer Testimonials"
    >
      <div className={`relative z-[1] ${PAGE_SHELL_CLASS}`}>
        <SectionHeader
          kicker="Testimonials"
          title="What Our Clients Say"
          description="Real results from real HR teams who transformed their hiring process"
        />

        <HomeTestimonialsSlider />
      </div>
    </section>
  );
}
