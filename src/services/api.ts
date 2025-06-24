import type { User } from '../types';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${BASE_URL}/users`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchUserById = async (id: number): Promise<User> => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    throw error;
  }
};
