import { 
  Home, 
  Package, 
  Settings, 
  AlertTriangle, 
  Loader2, 
  XCircle, 
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Wifi,
  WifiOff,
  Clock,
  Sparkles,
  Search,
  ArrowLeft,
  Info,
  Filter,
  Star,
  Share2,
  CheckCircle,
  AlertTriangle as AlertTriangleIcon,
  Truck,
  Award,
  Target,
  Box,
  type LucideIcon 
} from 'lucide-react';

// Map of icon names to Lucide components
const iconMap: Record<string, LucideIcon> = {
  home: Home,
  package: Package,
  settings: Settings,
  alertTriangle: AlertTriangle,
  loader: Loader2,
  xCircle: XCircle,
  checkCircle: CheckCircle2,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  wifi: Wifi,
  wifiOff: WifiOff,
  clock: Clock,
  sparkles: Sparkles,
  search: Search,
  arrowLeft: ArrowLeft,
  info: Info,
  filter: Filter,
  star: Star,
  share2: Share2,
  checkCircleIcon: CheckCircle,
  alertTriangleIcon: AlertTriangleIcon,
  truck: Truck,
  award: Award,
  target: Target,
  box: Box,
};

export interface IconProps {
  name: keyof typeof iconMap;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export function Icon({ name, size = 24, className = '', strokeWidth = 2 }: IconProps) {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent 
      size={size} 
      className={className}
      strokeWidth={strokeWidth}
    />
  );
}

// Re-export all icons for direct usage
export {
  Home,
  Package,
  Settings,
  AlertTriangle,
  Loader2,
  XCircle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Wifi,
  WifiOff,
  Clock,
  Sparkles,
  Search,
  ArrowLeft,
  Info,
  Filter,
  Star,
  Share2,
  CheckCircle,
  AlertTriangleIcon,
  Truck,
  Award,
  Target,
  Box,
};
