import { useState, useEffect } from 'preact/hooks';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-12 h-7 rounded-full transition-all duration-500 ease-out active:scale-90 ${
        isDark
          ? 'bg-bdc-blue shadow-[0_0_12px_rgba(25,130,196,0.4)]'
          : 'bg-bdc-yellow shadow-[0_0_12px_rgba(255,198,39,0.4)]'
      } ${className}`}
      aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
    >
      {/* Track background icons */}
      <span className={`absolute left-1.5 top-1/2 -translate-y-1/2 transition-opacity duration-300 ${isDark ? 'opacity-40' : 'opacity-0'}`}>
        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      </span>
      <span className={`absolute right-1.5 top-1/2 -translate-y-1/2 transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-40'}`}>
        <svg className="w-3 h-3 text-bdc-black" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      </span>

      {/* Sliding thumb with icon */}
      <span
        className={`absolute top-[3px] w-[22px] h-[22px] rounded-full bg-white flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] ${
          isDark ? 'left-[26px] shadow-[0_1px_4px_rgba(0,0,0,0.3)]' : 'left-[3px] shadow-[0_1px_4px_rgba(0,0,0,0.15)]'
        }`}
      >
        {/* Sun icon */}
        <svg
          className={`w-3.5 h-3.5 text-bdc-yellow absolute transition-all duration-500 ${
            isDark ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
        {/* Moon icon */}
        <svg
          className={`w-3.5 h-3.5 text-bdc-blue absolute transition-all duration-500 ${
            isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      </span>
    </button>
  );
}
