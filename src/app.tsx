import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import appLogo from '/favicon.svg'
import PWABadge from './PWABadge.tsx'
import { TestEmotionComponent } from './components/ui/TestEmotion'
import { TailwindExample } from './components/ui/TailwindExample'
import './app.css'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={appLogo} class="logo" alt="lions_book logo" />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img src={preactLogo} class="logo preact" alt="Preact logo" />
        </a>
      </div>
      <h1>Lions' Book - PWA Setup Complete</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/app.tsx</code> and save to test HMR
        </p>
      </div>
      <div className="space-y-6">
        <TestEmotionComponent />
        <TailwindExample />
      </div>
      <p class="read-the-docs">
        Vite + Preact + PWA + Emotion + Tailwind configured successfully
      </p>
      <PWABadge />
    </>
  )
}
