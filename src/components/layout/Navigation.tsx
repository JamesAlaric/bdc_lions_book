import { route } from 'preact-router';
import { ConnectionIndicator } from '../ui/ConnectionIndicator';
import { Home, Package, Settings } from '../ui/Icon';

export function Navigation() {
  return (
    <>
      {/* Top bar with connection status */}
      <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-b border-gray-200 z-50 px-4 py-2 flex justify-between items-center">
        <span className="text-sm font-semibold text-gray-800">Lions' Book</span>
        <ConnectionIndicator showText={false} />
      </div>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex justify-around items-center h-16">
          <NavItem icon={Home} label="Accueil" path="/" />
          <NavItem icon={Package} label="Catalogue" path="/catalogue" />
          <NavItem icon={Settings} label="Paramètres" path="/settings" />
        </div>
      </nav>
    </>
  );
}

interface NavItemProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  path: string;
}

function NavItem({ icon: IconComponent, label, path }: NavItemProps) {
  const handleClick = () => {
    route(path);
  };

  return (
    <button
      onClick={handleClick}
      className="flex flex-col items-center justify-center w-full h-full text-gray-600 hover:text-bdc-yellow transition-colors active:scale-95"
    >
      <IconComponent size={24} />
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
}
