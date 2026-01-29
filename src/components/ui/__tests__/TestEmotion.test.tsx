import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/preact';
import { TestEmotionComponent } from '../TestEmotion';

describe('TestEmotionComponent', () => {
  it('renders without crashing', () => {
    const { container } = render(<TestEmotionComponent />);
    expect(container).toBeTruthy();
  });

  it('renders the heading', () => {
    render(<TestEmotionComponent />);
    const heading = screen.getByRole('heading', { name: /Test Emotion CSS-in-JS/i });
    expect(heading).toBeTruthy();
  });

  it('renders button text content', () => {
    const { container } = render(<TestEmotionComponent />);
    expect(container.textContent).toContain('Test Button BDC Colors');
  });
});
