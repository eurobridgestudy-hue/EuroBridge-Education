import {
  Compass,
  GraduationCap,
  FileEdit,
  FolderCheck,
  Stamp,
  MessagesSquare,
  Languages,
  Home,
  Map,
  Luggage,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Compass,
  GraduationCap,
  FileEdit,
  FolderCheck,
  Stamp,
  MessagesSquare,
  Languages,
  Home,
  Map,
  Luggage,
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const I = icons[name] ?? Compass;
  return <I className={className} strokeWidth={1.6} />;
}
