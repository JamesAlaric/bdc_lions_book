import Router from 'preact-router';
import { Home } from './routes/Home';
import { Settings } from './routes/Settings';
import { Navigation } from './components/layout/Navigation';
import { UpdateNotification } from './components/UpdateNotification';
import PWABadge from './PWABadge.tsx';
import './app.css';

export function App() {
  return (
    <>
      <Router>
        <Home path="/" default />
        <Settings path="/settings" />
      </Router>
      <Navigation />
      <UpdateNotification />
      <PWABadge />
    </>
  );
}
