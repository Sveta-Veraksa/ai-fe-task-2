import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UsersTable from '../UsersTable';
import type { User } from '../../../types';

// Mock UserDetails component
vi.mock('../../UserDetails/UserDetails', () => ({
  default: ({ user, onClose }: { user: User; onClose: () => void }) => (
    <div data-testid="mock-user-details">
      <p>Mock User Details: {user.name}</p>
      <button onClick={onClose} data-testid="close-modal-button">
        Close
      </button>
    </div>
  ),
}));

describe('UsersTable Component', () => {
  const mockUsers: User[] = [
    {
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
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
      address: {
        street: 'Victor Plains',
        suite: 'Suite 879',
        city: 'Wisokyburgh',
        zipcode: '90566-7771',
        geo: {
          lat: '-43.9509',
          lng: '-34.4618',
        },
      },
      phone: '010-692-6593 x09125',
      website: 'anastasia.net',
      company: {
        name: 'Deckow-Crist',
        catchPhrase: 'Proactive didactic contingency',
        bs: 'synergize scalable supply-chains',
      },
    },
  ];

  const mockDeleteUser = vi.fn();

  it('renders the table with correct columns', () => {
    render(<UsersTable users={mockUsers} onDeleteUser={mockDeleteUser} />);

    // Check if the title is rendered
    expect(screen.getByText('Users')).toBeInTheDocument();

    // Check if the table headers are rendered
    expect(screen.getByText('Name / Email')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Website')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('renders user data correctly', () => {
    render(<UsersTable users={mockUsers} onDeleteUser={mockDeleteUser} />);

    // Check if user data is rendered
    expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    expect(screen.getByText('Sincere@april.biz')).toBeInTheDocument();
    expect(screen.getByText('Ervin Howell')).toBeInTheDocument();
    expect(screen.getByText('Shanna@melissa.tv')).toBeInTheDocument();

    // Check if addresses are rendered
    expect(screen.getByText(/Kulas Light, Apt\. 556, Gwenborough, 92998-3874/)).toBeInTheDocument();

    // Check if company names are rendered
    expect(screen.getByText('Romaguera-Crona')).toBeInTheDocument();
    expect(screen.getByText('Deckow-Crist')).toBeInTheDocument();
  });

  it('opens user details modal when a row is clicked', async () => {
    render(<UsersTable users={mockUsers} onDeleteUser={mockDeleteUser} />);

    // Click on the first user row
    const userRow = screen.getByText('Leanne Graham').closest('tr');
    expect(userRow).toBeInTheDocument();

    if (userRow) {
      fireEvent.click(userRow);
    }

    // Check if the modal is opened with the correct user
    expect(screen.getByTestId('mock-user-details')).toBeInTheDocument();
    expect(screen.getByText('Mock User Details: Leanne Graham')).toBeInTheDocument();
  });

  it('calls onDeleteUser when delete button is clicked', () => {
    render(<UsersTable users={mockUsers} onDeleteUser={mockDeleteUser} />);

    // Get all delete buttons
    const deleteButtons = screen.getAllByRole('button', { name: /Delete/ });
    expect(deleteButtons.length).toBe(2);
    // Click the first delete button
    if (deleteButtons[0]) {
      fireEvent.click(deleteButtons[0]);
    }

    // Check if the onDeleteUser function was called with the correct user ID
    expect(mockDeleteUser).toHaveBeenCalledWith(1);
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<UsersTable users={mockUsers} onDeleteUser={mockDeleteUser} />);

    // Find the first user row
    const userRow = screen.getByText('Leanne Graham').closest('tr');
    expect(userRow).toBeInTheDocument();

    if (userRow) {
      // Focus on the row
      userRow.focus();

      // Press Enter to open the modal
      await user.keyboard('{Enter}');

      // Check if the modal is opened
      expect(screen.getByTestId('mock-user-details')).toBeInTheDocument();
    }
  });

  it('closes the modal when the close button is clicked', () => {
    render(<UsersTable users={mockUsers} onDeleteUser={mockDeleteUser} />);

    // Open the modal
    const userRow = screen.getByText('Leanne Graham').closest('tr');
    if (userRow) {
      fireEvent.click(userRow);
    }

    // Check if the modal is opened
    expect(screen.getByTestId('mock-user-details')).toBeInTheDocument();

    // Click the close button
    const closeButton = screen.getByTestId('close-modal-button');
    fireEvent.click(closeButton);

    // Check if the modal is closed
    expect(screen.queryByTestId('mock-user-details')).not.toBeInTheDocument();
  });
});
