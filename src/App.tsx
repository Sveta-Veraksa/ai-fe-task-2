import { useState, useEffect } from 'react';
import type { User } from './types';
import { fetchUsers } from './services/api';
import UsersTable from './components/UsersTable/UsersTable';
import './App.css';

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setIsLoading(true);
        const data = await fetchUsers();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getUsers();
  }, []);

  const handleDeleteUser = (userId: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  if (isLoading) {
    return <div className="loading">Loading users...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="app">
      <UsersTable users={users} onDeleteUser={handleDeleteUser} />
    </div>
  );
};

export default App;
