"use client";

import {
  X,
  User,
  FileText,
  Code,
  TrendingUp,
  CheckCircle,
  Book,
  MessageSquare,
  Heart,
  Zap,
  Star,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/ui/cn";
import { Persona } from "@/lib/api/questionnaires";

interface PersonaModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  attributes?: string[];
  persona: Persona | null;
}

type NavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  key: keyof Persona;
  category: "Overview" | "Details";
  subtitle: string;
  cardTitle: string;
};

const NAV_ITEMS: readonly NavItem[] = [
  {
    id: "summary",
    label: "Executive Summary",
    icon: FileText,
    key: "persona_summary",
    category: "Overview",
    cardTitle: "Executive Summary",
    subtitle: "Overview of the ideal candidate profile.",
  },
  {
    id: "technical",
    label: "Technical Requirements",
    icon: Code,
    key: "technical_functional_requirements",
    category: "Details",
    cardTitle: "Technical & Functional Requirements",
    subtitle: "Required technical skills and competencies.",
  },
  {
    id: "success",
    label: "Success Patterns",
    icon: TrendingUp,
    key: "success_patterns",
    category: "Details",
    cardTitle: "Success Patterns",
    subtitle: "Characteristics that indicate success in this role.",
  },
  {
    id: "reliability",
    label: "Reliability & Ownership",
    icon: CheckCircle,
    key: "reliability_ownership",
    category: "Details",
    cardTitle: "Reliability & Ownership",
    subtitle: "Organized, dependable, follows through on commitments.",
  },
  {
    id: "learning",
    label: "Learning & Adaptability",
    icon: Book,
    key: "learning_adaptability",
    category: "Details",
    cardTitle: "Learning & Adaptability",
    subtitle: "Seeks new challenges, learns from mistakes, adapts to change.",
  },
  {
    id: "communication",
    label: "Communication & Clarity",
    icon: MessageSquare,
    key: "communication_clarity",
    category: "Details",
    cardTitle: "Communication & Clarity",
    subtitle: "Clear written and verbal communication, structured thinking.",
  },
  {
    id: "empathy",
    label: "Empathy & Collaboration",
    icon: Heart,
    key: "empathy_collaboration",
    category: "Details",
    cardTitle: "Empathy & Collaboration",
    subtitle: "Builds trust, listens actively, works well across teams.",
  },
  {
    id: "resilience",
    label: "Resilience Under Stress",
    icon: Zap,
    key: "resilience_stress",
    category: "Details",
    cardTitle: "Resilience Under Stress",
    subtitle: "Stays composed and effective under pressure.",
  },
  {
    id: "culture",
    label: "Values & Culture Fit",
    icon: Star,
    key: "values_culture_fit",
    category: "Details",
    cardTitle: "Values & Culture Fit",
    subtitle: "Alignment with company values and ways of working.",
  },
  {
    id: "risks",
    label: "Risk Factors",
    icon: AlertTriangle,
    key: "risk_factors",
    category: "Details",
    cardTitle: "Risk Factors",
    subtitle: "Potential concerns to probe during interviews.",
  },
] as const;

export function PersonaModal({
  isOpen,
  onClose,
  title,
  attributes = [],
  persona,
}: PersonaModalProps) {
  const [activeSection, setActiveSection] = useState<string>("summary");

  const activeNavItems = NAV_ITEMS.filter(
    (item) => persona && persona[item.key],
  );

  const overviewItems = activeNavItems.filter(
    (item) => item.category === "Overview",
  );
  const detailItems = activeNavItems.filter(
    (item) => item.category === "Details",
  );

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const containerRect = container.getBoundingClientRect();

    for (const item of activeNavItems) {
      const el = document.getElementById(`persona-${item.id}`);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (
          rect.top >= containerRect.top &&
          rect.top <= containerRect.top + 200
        ) {
          setActiveSection(item.id);
          break;
        }
      }
    }
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(`persona-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[1200px] w-[95vw] h-[75vh] p-0 overflow-hidden border-0 bg-[var(--gray-bg)] shadow-[var(--shadow-medium)] rounded-[var(--radius-lg)] flex flex-col"
      >
        <VisuallyHidden>
          <DialogTitle>Ideal Candidate Persona — {title}</DialogTitle>
        </VisuallyHidden>

        {/* Custom Header */}
        <div className="glass-header-overlay relative shrink-0 flex items-center justify-between bg-[var(--glass-bg-medium)] backdrop-blur-[15px] backdrop-saturate-[180%] border-b border-[var(--glass-border-medium)] px-8 py-5 shadow-[0_2px_8px_var(--glass-shadow-medium)] z-10">
          <div className="relative z-[1] flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--glass-primary-overlay-dark)] to-[var(--glass-primary-overlay-medium)] backdrop-blur-[10px] border border-[var(--glass-border-dark)] shadow-[0_4px_8px_var(--glass-primary-overlay-medium)]">
              <User className="h-6 w-6 text-[var(--icon-accent-color)]" />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold leading-tight text-[var(--text-primary)] m-0">
                Ideal Candidate Persona
              </h2>
              <p className="text-sm leading-snug text-[var(--text-secondary)] m-0">
                {title}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="relative z-[1] flex h-10 w-10 items-center justify-center rounded-[10px] bg-[var(--glass-white-overlay)] backdrop-blur-[10px] border border-[var(--glass-border-medium)] shadow-[0_2px_4px_var(--glass-shadow-medium)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[var(--glass-white-overlay-dark)] hover:border-[var(--glass-border-dark)] hover:-translate-y-0.5 hover:shadow-[0_4px_8px_var(--glass-shadow-dark)] active:translate-y-0 group"
          >
            <X className="h-[18px] w-[18px] text-[var(--text-secondary)] transition-colors duration-300 group-hover:text-[var(--primary-color)]" />
          </button>
        </div>

        {/* Main container: sidebar + content */}
        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* Sidebar */}
          <aside className="glass-sidebar-overlay glass-scrollbar-thin relative w-[280px] shrink-0 overflow-y-auto bg-[var(--glass-bg-light)] backdrop-blur-[20px] backdrop-saturate-[180%] border-r border-[var(--glass-border-light)]">
            <nav className="relative z-[1] p-6">
              {overviewItems.length > 0 && (
                <NavCategory
                  title="Overview"
                  items={overviewItems}
                  activeSection={activeSection}
                  onSelect={scrollToSection}
                />
              )}
              {detailItems.length > 0 && (
                <NavCategory
                  title="Details"
                  items={detailItems}
                  activeSection={activeSection}
                  onSelect={scrollToSection}
                />
              )}
            </nav>
          </aside>

          {/* Content panel */}
          <div
            className="glass-scrollbar flex-1 overflow-y-auto bg-[var(--gray-bg)] p-8"
            onScroll={handleScroll}
          >
            {activeNavItems.map((item) => {
              const Icon = item.icon;
              const value = persona?.[item.key] as string | undefined;
              return (
                <section
                  key={item.id}
                  id={`persona-${item.id}`}
                  className="mb-8 last:mb-0 scroll-mt-8"
                >
                  <div className="glass-card-shimmer relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--glass-bg-medium)] backdrop-blur-[15px] border border-[var(--glass-border-medium)] p-8 shadow-[0_12px_24px_var(--glass-shadow-dark),0_0_0_1px_var(--glass-white-overlay)_inset] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:shadow-[0_16px_32px_var(--glass-shadow-dark),0_0_0_1px_var(--glass-white-overlay-dark)_inset] hover:border-[var(--glass-border-dark)]">
                    <header className="relative z-[1] mb-6 flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[rgba(var(--primary-color-rgb),0.2)] to-[rgba(var(--primary-color-rgb),0.1)] backdrop-blur-[10px] border border-[rgba(var(--primary-color-rgb),0.3)] shadow-[0_4px_8px_rgba(var(--primary-color-rgb),0.1)]">
                        <Icon className="h-6 w-6 text-[var(--icon-accent-color)]" />
                      </div>
                      <div className="min-w-0">
                        <h1 className="text-2xl font-bold leading-tight text-[var(--text-primary)] m-0 mb-2">
                          {item.cardTitle}
                        </h1>
                        <p className="text-sm leading-relaxed text-[var(--text-secondary)] m-0">
                          {item.subtitle}
                        </p>
                      </div>
                    </header>
                    <div className="relative z-[1]">
                      <p className="text-[15px] leading-[1.8] text-[var(--text-primary)] m-0 whitespace-pre-wrap break-words">
                        {value}
                      </p>
                      {item.id === "summary" && attributes.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2.5">
                          {attributes.map((attr, idx) => (
                            <span
                              key={idx}
                              className="text-[13px] font-medium px-3.5 py-1.5 rounded-xl border border-[rgba(var(--primary-color-rgb),0.3)] bg-[rgba(var(--primary-color-rgb),0.1)] text-[var(--primary-color)] backdrop-blur-[10px]"
                            >
                              {attr}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function NavCategory({
  title,
  items,
  activeSection,
  onSelect,
}: {
  title: string;
  items: readonly NavItem[];
  activeSection: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="mb-6 last:mb-0">
      <div className="px-3 pb-2.5 mb-1.5 text-[11px] font-bold uppercase tracking-[1px] text-[var(--text-secondary)]">
        {title}
      </div>
      <div className="flex flex-col">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={cn(
                "group relative flex items-center gap-3 mx-1 mb-1.5 px-4 py-3 rounded-[var(--radius-md)] text-sm text-left transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] backdrop-blur-[10px]",
                isActive
                  ? "bg-gradient-to-br from-[rgba(var(--primary-color-rgb),0.2)] to-[rgba(var(--primary-color-rgb),0.1)] border border-[rgba(var(--primary-color-rgb),0.5)] shadow-[0_4px_12px_rgba(var(--primary-color-rgb),0.15)]"
                  : "bg-[var(--glass-white-overlay-light)] border border-[var(--glass-border-medium)] shadow-[0_2px_4px_var(--glass-shadow-medium)] hover:bg-[var(--glass-white-overlay)] hover:border-[var(--glass-border-dark)] hover:translate-x-1 hover:shadow-[0_4px_8px_var(--glass-shadow-medium)]",
              )}
            >
              <Icon
                className={cn(
                  "h-[18px] w-[18px] shrink-0 transition-colors duration-300",
                  isActive
                    ? "text-[var(--icon-accent-color)]"
                    : "text-[var(--text-secondary)] group-hover:text-[var(--icon-accent-color)]",
                )}
              />
              <span
                className={cn(
                  "transition-colors duration-300",
                  isActive
                    ? "font-semibold text-[var(--text-accent-color)]"
                    : "font-medium text-[var(--text-primary)] group-hover:text-[var(--text-accent-color)]",
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
