import type { ComponentProps } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  FilePlus2,
  FileText,
  FolderOpen,
  Handshake,
  LayoutDashboard,
  MessageSquare,
  Pencil,
  Phone,
  PlusCircle,
  Shield,
  Star,
  Trophy,
  Users,
  Volume2,
  Zap,
} from "lucide-react";

export type IconProps = ComponentProps<LucideIcon>;

function iconProps(className?: string): Partial<IconProps> {
  return {
    className,
    "aria-hidden": true,
    strokeWidth: 2,
  };
}

export function IconCalendar({ className, ...rest }: IconProps) {
  return <Calendar {...iconProps(className)} {...rest} />;
}

export function IconCheckCircle({ className, ...rest }: IconProps) {
  return <CheckCircle2 {...iconProps(className)} {...rest} />;
}

export function IconBarChart({ className, ...rest }: IconProps) {
  return <BarChart3 {...iconProps(className)} {...rest} />;
}

export function IconTeam({ className, ...rest }: IconProps) {
  return <Users {...iconProps(className)} {...rest} />;
}

export function IconTrophy({ className, ...rest }: IconProps) {
  return <Trophy {...iconProps(className)} {...rest} />;
}

export function IconThunderbolt({ className, ...rest }: IconProps) {
  return <Zap {...iconProps(className)} {...rest} />;
}

export function IconDashboard({ className, ...rest }: IconProps) {
  return <LayoutDashboard {...iconProps(className)} {...rest} />;
}

export function IconPhone({ className, ...rest }: IconProps) {
  return <Phone {...iconProps(className)} {...rest} />;
}

export function IconFilePdf({ className, ...rest }: IconProps) {
  return <FileText {...iconProps(className)} {...rest} />;
}

export function IconEdit({ className, ...rest }: IconProps) {
  return <Pencil {...iconProps(className)} {...rest} />;
}

export function IconMessage({ className, ...rest }: IconProps) {
  return <MessageSquare {...iconProps(className)} {...rest} />;
}

export function IconStar({ className, ...rest }: IconProps) {
  return <Star {...iconProps(className)} {...rest} />;
}

export function IconArrowRight({ className, ...rest }: IconProps) {
  return <ArrowRight {...iconProps(className)} {...rest} />;
}

export function IconBell({ className, ...rest }: IconProps) {
  return <Bell {...iconProps(className)} {...rest} />;
}

export function IconFolder({ className, ...rest }: IconProps) {
  return <FolderOpen {...iconProps(className)} {...rest} />;
}

export function IconShield({ className, ...rest }: IconProps) {
  return <Shield {...iconProps(className)} {...rest} />;
}

export function IconHandshake({ className, ...rest }: IconProps) {
  return <Handshake {...iconProps(className)} {...rest} />;
}

const WHY_CHOOSE_ICONS = {
  thunderbolt: Zap,
  team: Users,
  bell: Bell,
  folder: FolderOpen,
  chart: BarChart3,
  shield: Shield,
  handshake: Handshake,
} as const;

const BENEFIT_ICONS = {
  thunderbolt: Zap,
  trophy: Trophy,
  dashboard: LayoutDashboard,
} as const;

const APP_ICONS = {
  edit: Pencil,
  phone: Phone,
  robot: Bot,
  "file-pdf": FileText,
  "file-add": FilePlus2,
  "plus-circle": PlusCircle,
  "check-circle": CheckCircle2,
} as const;

export type AppStepIconName = keyof typeof APP_ICONS;

/** Solution marketing pages — feature card icons. */
const SOLUTION_FEATURE_ICONS = {
  clock: Clock,
  volume: Volume2,
  "file-pdf": FileText,
  thunderbolt: Zap,
  robot: Bot,
  edit: Pencil,
  "file-text": FileText,
  team: Users,
} as const;

export type SolutionFeatureIconName = keyof typeof SOLUTION_FEATURE_ICONS;

export function BenefitIcon({
  name,
  className,
}: {
  name: keyof typeof BENEFIT_ICONS;
  className?: string;
}) {
  const C = BENEFIT_ICONS[name];
  return <C className={className} aria-hidden strokeWidth={2} />;
}

export function WhyChooseIcon({
  name,
  className,
}: {
  name: keyof typeof WHY_CHOOSE_ICONS;
  className?: string;
}) {
  const C = WHY_CHOOSE_ICONS[name];
  return <C className={className} aria-hidden strokeWidth={2} />;
}

export function AppStepIcon({
  name,
  className,
}: {
  name: keyof typeof APP_ICONS;
  className?: string;
}) {
  const C = APP_ICONS[name];
  return <C className={className} aria-hidden strokeWidth={2} />;
}

export function SolutionFeatureIcon({
  name,
  className,
}: {
  name: SolutionFeatureIconName;
  className?: string;
}) {
  const C = SOLUTION_FEATURE_ICONS[name];
  return <C className={className} aria-hidden strokeWidth={2} />;
}
