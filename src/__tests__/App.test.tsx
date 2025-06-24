import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import type { User } from '../types';

// Mock the API service
vi.mock('../services/api', () => ({
  fetchUsers: vi.fn(),
  fetchUserById: vi.fn(),
}));

// Import the mocked functions
import { fetchUsers } from '../services/api';

// Mock UserDetails component to avoid dialog issues in tests
vi.mock('../components/UserDetails/UserDetails', () => ({
  default: ({ user, onClose }: { user: User; onClose: () => void }) => (
    <div data-testid="mock-user-details">
      <p>Mock User Details: {user.name}</p>
      <button onClick={onClose} data-testid="close-modal-button">
        Close
      </button>
    </div>
  ),
}));

describe('App Integration Tests', () => {
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

  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();

    // Mock the fetchUsers implementation
    (fetchUsers as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockUsers);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('displays loading state initially', () => {
    render(<App />);
    expect(screen.getByText('Loading users...')).toBeInTheDocument();
  });

  it('renders users table after data is loaded', async () => {
    render(<App />);

    // Wait for the loading state to disappear
    await waitFor(() => {
      expect(screen.queryByText('Loading users...')).not.toBeInTheDocument();
    });

    // Check if the users are rendered
    expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    expect(screen.getByText('Ervin Howell')).toBeInTheDocument();
  });

  it('displays error message when API call fails', async () => {
    // Mock API failure
    (fetchUsers as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error('Failed to fetch')
    );

    render(<App />);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(
        screen.getByText('Failed to fetch users. Please try again later.')
      ).toBeInTheDocument();
    });
  });

  it('allows deleting a user', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Wait for users to load
    await waitFor(() => {
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    });

    // Find and click the delete button for the first user
    const deleteButtons = screen.getAllByRole('button', { name: /Delete/ });
    const firstDeleteButton = deleteButtons[0];

    if (!firstDeleteButton) {
      throw new Error('Delete button not found');
    }
    await user.click(firstDeleteButton);

    // Check if the user is removed
    await waitFor(() => {
      expect(screen.queryByText('Leanne Graham')).not.toBeInTheDocument();
      expect(screen.getByText('Ervin Howell')).toBeInTheDocument();
    });
  });

  it('opens and closes user details modal', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Wait for users to load
    await waitFor(() => {
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    });

    // Click on a user row to open the modal
    const userRow = screen.getByText('Leanne Graham').closest('tr');
    if (userRow) {
      await user.click(userRow);
    }

    // Check if the modal is opened
    expect(screen.getByTestId('mock-user-details')).toBeInTheDocument();
    expect(screen.getByText('Mock User Details: Leanne Graham')).toBeInTheDocument();

    // Close the modal
    const closeButton = screen.getByTestId('close-modal-button');
    await user.click(closeButton);

    // Check if the modal is closed
    expect(screen.queryByTestId('mock-user-details')).not.toBeInTheDocument();
  });
});
