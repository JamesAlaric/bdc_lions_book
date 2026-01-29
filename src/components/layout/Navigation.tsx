import { route } from 'preact-router';

export function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center h-16">
        <NavItem icon="🏠" label="Accueil" path="/" />
        <NavItem icon="📦" label="Catalogue" path="/catalogue" />
        <NavItem icon="⚙️" label="Paramètres" path="/settings" />
      </div>
    </nav>
  );
}

interface NavItemProps {
  icon: string;
  label: string;
  path: string;
}

function NavItem({ icon, label, path }: NavItemProps) {
  const handleClick = () => {
    route(path);
  };

  return (
    <button
      onClick={handleClick}
      className="flex flex-col items-center justify-center w-full h-full text-gray-600 hover:text-bdc-yellow transition-colors active:scale-95"
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
}
