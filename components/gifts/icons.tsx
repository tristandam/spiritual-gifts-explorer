import {
  Anchor,
  BookOpen,
  ClipboardList,
  Compass,
  DoorOpen,
  Flame,
  Footprints,
  Globe,
  GraduationCap,
  Hammer,
  HandCoins,
  HandHelping,
  Heart,
  HeartPulse,
  Leaf,
  Lightbulb,
  Megaphone,
  MessageCircleHeart,
  Music,
  PenLine,
  Scale,
  Smartphone,
  Sparkles,
  Sunrise,
  Users,
  type LucideIcon,
} from "lucide-react"
import type { GiftIcon } from "@/lib/types"

const ICONS: Record<GiftIcon, LucideIcon> = {
  "clipboard-list": ClipboardList,
  hammer: Hammer,
  smartphone: Smartphone,
  compass: Compass,
  "message-heart": MessageCircleHeart,
  megaphone: Megaphone,
  anchor: Anchor,
  "hand-coins": HandCoins,
  "heart-pulse": HeartPulse,
  "hand-helping": HandHelping,
  "door-open": DoorOpen,
  flame: Flame,
  "book-open": BookOpen,
  users: Users,
  heart: Heart,
  globe: Globe,
  music: Music,
  footprints: Footprints,
  scale: Scale,
  sunrise: Sunrise,
  sparkles: Sparkles,
  "graduation-cap": GraduationCap,
  leaf: Leaf,
  lightbulb: Lightbulb,
  "pen-line": PenLine,
}

export function GiftIconMark({
  name,
  className,
}: {
  name: GiftIcon
  className?: string
}) {
  const Icon = ICONS[name]
  return <Icon className={className} aria-hidden="true" />
}
