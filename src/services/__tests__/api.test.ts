import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchUsers, fetchUserById } from '../api';
import type { User } from '../../types';

describe('API Service', () => {
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
    // Reset the fetch mock before each test
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetchUsers should return users data when API call is successful', async () => {
    // Mock the fetch response
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    // Call the function
    const result = await fetchUsers();

    // Check if fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');

    // Check if the function returns the expected data
    expect(result).toEqual(mockUsers);
    expect(result.length).toBe(2);
    expect(result[0]?.name).toBe('Leanne Graham');
  });

  it('fetchUsers should throw an error when API call fails', async () => {
    // Mock the fetch response with an error
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    // Check if the function throws an error
    await expect(fetchUsers()).rejects.toThrow('HTTP error! Status: 404');

    // Check if fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
  });

  it('fetchUserById should return a single user when API call is successful', async () => {
    const mockUser = mockUsers[0];

    // Mock the fetch response
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    // Call the function
    const result = await fetchUserById(1);

    // Check if fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/1');

    // Check if the function returns the expected data
    expect(result).toEqual(mockUser);
    expect(result.id).toBe(1);
    expect(result.name).toBe('Leanne Graham');
  });

  it('fetchUserById should throw an error when API call fails', async () => {
    // Mock the fetch response with an error
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    // Check if the function throws an error
    await expect(fetchUserById(999)).rejects.toThrow('HTTP error! Status: 404');

    // Check if fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/999');
  });

  it('should handle network errors', async () => {
    // Mock the fetch implementation to throw a network error
    globalThis.fetch = vi.fn().mockRejectedValueOnce(new Error('Network error'));

    // Check if the function throws an error
    await expect(fetchUsers()).rejects.toThrow('Network error');

    // Check if fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
  });
});
