import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserDetails from '../UserDetails';
import type { User } from '../../../types';

// Add missing types for HTMLDialogElement
declare global {
  interface HTMLDialogElement {
    showModal(): void;
    close(): void;
  }
}

describe('UserDetails Component', () => {
  const mockUser: User = {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496',
      },
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets',
    },
  };

  // Mock showModal and close methods for dialog element
  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
  });

  it('renders user details correctly', () => {
    const mockOnClose = vi.fn();
    render(<UserDetails user={mockUser} onClose={mockOnClose} />);

    // Check if user name and email are rendered
    expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    expect(screen.getByText('Sincere@april.biz')).toBeInTheDocument();

    // Check if address information is rendered
    expect(screen.getByText('Apt. 556, Kulas Light')).toBeInTheDocument();
    expect(screen.getByText('Gwenborough, 92998-3874')).toBeInTheDocument();

    // Check if contact information is rendered
    expect(screen.getByText('1-770-736-8031 x56442')).toBeInTheDocument();
    expect(screen.getByText('hildegard.org')).toBeInTheDocument();

    // Check if company information is rendered
    expect(screen.getByText('Romaguera-Crona')).toBeInTheDocument();
    expect(screen.getByText('Multi-layered client-server neural-net')).toBeInTheDocument();
    expect(screen.getByText('harness real-time e-markets')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const mockOnClose = vi.fn();
    render(<UserDetails user={mockUser} onClose={mockOnClose} />);

    // Find and click the close button
    const closeButton = screen.getByRole('button', { name: /Close modal/i });
    fireEvent.click(closeButton);

    // Check if onClose was called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('opens map when View on map button is clicked', () => {
    const mockOnClose = vi.fn();
    const windowOpenSpy = vi.spyOn(window, 'open');
    render(<UserDetails user={mockUser} onClose={mockOnClose} />);

    // Find and click the map button
    const mapButton = screen.getByRole('button', { name: /View on map/i });
    fireEvent.click(mapButton);

    // Check if window.open was called with the correct URL
    expect(windowOpenSpy).toHaveBeenCalledWith(
      'https://www.google.com/maps?q=-37.3159,81.1496',
      '_blank'
    );
  });

  it('calls showModal when component is mounted', () => {
    const mockOnClose = vi.fn();
    render(<UserDetails user={mockUser} onClose={mockOnClose} />);

    // Check if showModal was called
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', async () => {
    const mockOnClose = vi.fn();
    const user = userEvent.setup();
    render(<UserDetails user={mockUser} onClose={mockOnClose} />);

    // Press Escape key
    await user.keyboard('{Escape}');

    // Check if onClose was called
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onClose when clicking outside the modal', () => {
    const mockOnClose = vi.fn();
    render(<UserDetails user={mockUser} onClose={mockOnClose} />);

    // Mock getBoundingClientRect to return values outside the dialog
    const mockRect = {
      top: 100,
      left: 100,
      width: 400,
      height: 500,
      bottom: 600,
      right: 500,
      x: 100,
      y: 100,
      toJSON: () => {},
    };

    const dialogElement = screen.getByRole('dialog');
    dialogElement.getBoundingClientRect = vi.fn(() => mockRect);

    // Simulate click outside the dialog (coordinates outside the mockRect)
    fireEvent.click(dialogElement, { clientX: 50, clientY: 50 });

    // Check if onClose was called
    expect(mockOnClose).toHaveBeenCalled();
  });
});
