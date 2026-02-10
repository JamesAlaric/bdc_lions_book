import { useEffect, useState } from 'preact/hooks';
import { route, getCurrentUrl } from 'preact-router';
import { ConnectionIndicator } from '../ui/ConnectionIndicator';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Home, LayoutGrid, Megaphone, Briefcase, ChevronLeft } from '../ui/Icon';

export function Navigation() {
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    const updatePath = () => setCurrentPath(getCurrentUrl().split('?')[0]);
    updatePath();
    const handler = () => updatePath();
    globalThis.addEventListener('routechange', handler);
    globalThis.addEventListener('popstate', handler);
    return () => {
      globalThis.removeEventListener('routechange', handler);
      globalThis.removeEventListener('popstate', handler);
    };
  }, []);

  const navItems = [
    { icon: 'home' as const, path: '/' },
    { icon: 'segments' as const, path: '/segments' },
    { icon: 'promos' as const, path: '/promos' },
    { icon: 'assets' as const, path: '/assets' },
  ];

  const getActiveItem = (): string | null => {
    if (currentPath === '/') return '/';
    if (
      currentPath === '/segments' ||
      currentPath === '/catalogue' ||
      currentPath === '/prix' ||
      currentPath.startsWith('/brand/')
    )
      return '/segments';
    if (currentPath === '/promos') return '/promos';
    if (currentPath === '/assets') return '/assets';
    return null;
  };

  const activeItem = getActiveItem();

  const subPages = ['/catalogue', '/prix', '/objections', '/settings'];
  const showBackButton = subPages.includes(currentPath);
  const hidePill = currentPath.startsWith('/brand/');

  return (
    <>
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 h-12 z-[60] bg-white/70 dark:bg-bdc-black/70 backdrop-blur-2xl border-b border-black/[0.04] dark:border-white/[0.06]">
        <div className="h-full px-4 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-bdc-red flex items-center justify-center">
              <span className="text-white font-bold text-xs font-display">L</span>
            </span>
            <span className="text-sm font-bold text-bdc-black dark:text-white font-display tracking-tight">
              Lions' Book
            </span>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <ConnectionIndicator showText={false} />
          </div>
        </div>
      </div>

      {/* Bottom navigation - Apple glassmorphic pill */}
      {!hidePill && (
        <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5">
          {/* Back button */}
          <div
            className={`transition-all duration-300 ease-out overflow-hidden ${
              showBackButton
                ? 'opacity-100 scale-100 w-[48px]'
                : 'opacity-0 scale-75 w-0 -mr-2.5 pointer-events-none'
            }`}
          >
            <button
              onClick={() => history.back()}
              className="w-[48px] h-[48px] rounded-full bg-white/50 dark:bg-white/[0.07] backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.3)] border border-white/40 dark:border-white/[0.06] flex items-center justify-center active:scale-90 transition-transform"
            >
              <ChevronLeft size={20} strokeWidth={2.5} className="text-bdc-black dark:text-white" />
            </button>
          </div>

          {/* Main pill */}
          <div className="flex items-center h-[52px] px-2 gap-0.5 bg-white/50 dark:bg-white/[0.07] backdrop-blur-xl rounded-[26px] shadow-[0_2px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.3)] border border-white/40 dark:border-white/[0.06]">
            {navItems.map((item) => {
              const isActive = activeItem === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => route(item.path)}
                  className={`relative w-11 h-11 rounded-full flex items-center justify-center active:scale-90 transition-all duration-200 ${
                    isActive ? '' : 'opacity-30'
                  }`}
                >
                  <NavIcon type={item.icon} active={isActive} />
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
}

function NavIcon({ type, active }: Readonly<{ type: string; active: boolean }>) {
  const cls = active
    ? 'text-bdc-red transition-all duration-200'
    : 'text-bdc-black dark:text-white transition-all duration-200';
  const size = 20;
  const sw = active ? 2 : 1.6;

  let icon = null;
  switch (type) {
    case 'home':
      icon = <Home size={size} strokeWidth={sw} className={cls} />;
      break;
    case 'segments':
      icon = <LayoutGrid size={size} strokeWidth={sw} className={cls} />;
      break;
    case 'promos':
      icon = <Megaphone size={size} strokeWidth={sw} className={cls} />;
      break;
    case 'assets':
      icon = <Briefcase size={size} strokeWidth={sw} className={cls} />;
      break;
    default:
      return null;
  }

  return (
    <div className="flex flex-col items-center gap-1">
      {icon}
      <div
        className={`w-1 h-1 rounded-full transition-all duration-200 ${
          active ? 'bg-bdc-red scale-100' : 'bg-transparent scale-0'
        }`}
      />
    </div>
  );
}
