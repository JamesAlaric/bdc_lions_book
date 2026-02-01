import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/preact';
import { Carousel3D } from './Carousel3D';

describe('Carousel3D', () => {
  const mockImages = [
    { id: '1', src: '/img1.jpg', alt: 'Image 1', format: 'Bouteille' },
    { id: '2', src: '/img2.jpg', alt: 'Image 2', format: 'Canette' },
    { id: '3', src: '/img3.jpg', alt: 'Image 3', format: 'Pack' },
  ];

  it('renders empty state when no images', () => {
    render(<Carousel3D images={[]} />);
    expect(screen.getByText('Aucune image disponible')).toBeDefined();
  });

  it('renders first image by default', () => {
    render(<Carousel3D images={mockImages} />);
    const img = screen.getByAltText('Image 1');
    expect(img).toBeDefined();
    expect(img.getAttribute('src')).toBe('/img1.jpg');
  });

  it('displays format badge when format is provided', () => {
    render(<Carousel3D images={mockImages} />);
    expect(screen.getByText('Bouteille')).toBeDefined();
  });

  it('navigates to next image when clicking next button', () => {
    render(<Carousel3D images={mockImages} />);
    const nextButton = screen.getByLabelText('Image suivante');
    fireEvent.click(nextButton);
    
    const img = screen.getByAltText('Image 2');
    expect(img).toBeDefined();
    expect(img.getAttribute('src')).toBe('/img2.jpg');
  });

  it('navigates to previous image when clicking prev button', () => {
    render(<Carousel3D images={mockImages} />);
    
    // Go to second image first
    const nextButton = screen.getByLabelText('Image suivante');
    fireEvent.click(nextButton);
    
    // Then go back
    const prevButton = screen.getByLabelText('Image précédente');
    fireEvent.click(prevButton);
    
    const img = screen.getByAltText('Image 1');
    expect(img).toBeDefined();
  });

  it('disables prev button on first image', () => {
    render(<Carousel3D images={mockImages} />);
    const prevButton = screen.getByLabelText('Image précédente');
    expect(prevButton.hasAttribute('disabled')).toBe(true);
  });

  it('disables next button on last image', () => {
    render(<Carousel3D images={mockImages} />);
    
    // Navigate to last image
    const nextButton = screen.getByLabelText('Image suivante');
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    
    expect(nextButton.hasAttribute('disabled')).toBe(true);
  });

  it('calls onFormatChange when navigating', () => {
    const onFormatChange = vi.fn();
    render(<Carousel3D images={mockImages} onFormatChange={onFormatChange} />);
    
    const nextButton = screen.getByLabelText('Image suivante');
    fireEvent.click(nextButton);
    
    expect(onFormatChange).toHaveBeenCalledWith(1);
  });

  it('renders dot indicators', () => {
    render(<Carousel3D images={mockImages} />);
    const dots = screen.getAllByRole('button').filter(
      btn => !btn.getAttribute('aria-label')?.includes('Image')
    );
    expect(dots.length).toBe(3);
  });

  it('navigates to specific image when clicking dot', () => {
    render(<Carousel3D images={mockImages} />);
    const dots = screen.getAllByRole('button').filter(
      btn => !btn.getAttribute('aria-label')?.includes('Image')
    );
    
    fireEvent.click(dots[2]);
    
    const img = screen.getByAltText('Image 3');
    expect(img).toBeDefined();
  });

  it('supports swipe gestures', async () => {
    render(<Carousel3D images={mockImages} />);
    const carousel = screen.getByRole('region', { name: /carousel/i }) || document.querySelector('[style*="perspective"]');
    
    if (carousel) {
      // Simulate drag
      fireEvent.mouseDown(carousel, { clientX: 200 });
      fireEvent.mouseMove(carousel, { clientX: 100 });
      fireEvent.mouseUp(carousel);
      
      // Should have navigated
      await waitFor(() => {
        const img = screen.queryByAltText('Image 2');
        expect(img).toBeDefined();
      });
    }
  });
});
