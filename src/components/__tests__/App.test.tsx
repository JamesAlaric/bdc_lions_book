import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/preact';
import { App } from '../../app';

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('displays the app title', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeTruthy();
    expect(heading.textContent).toContain("Lions' Book");
  });

  it('renders the test emotion component', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /Test Button BDC Colors/i });
    expect(button).toBeTruthy();
  });
});
