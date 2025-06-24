import { useState } from 'react';
import type { User } from '../../types';
import styles from './UsersTable.module.css';
import UserDetails from '../UserDetails/UserDetails';

interface UsersTableProps {
  users: User[];
  onDeleteUser: (userId: number) => void;
}

const UsersTable = ({ users, onDeleteUser }: UsersTableProps) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleKeyDown = (event: React.KeyboardEvent, user: User) => {
    // Open user details on Enter or Space key
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setSelectedUser(user);
    }
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleDelete = (e: React.MouseEvent, userId: number) => {
    e.stopPropagation();
    onDeleteUser(userId);
  };

  const handleDeleteKeyDown = (e: React.KeyboardEvent, userId: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.stopPropagation();
      e.preventDefault();
      onDeleteUser(userId);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Users</h1>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>Name / Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Website</th>
              <th>Company</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className={styles.tableRow}
                onClick={() => handleRowClick(user)}
                onKeyDown={(e) => handleKeyDown(e, user)}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${user.name}`}
              >
                <td>
                  <div className={styles.nameCell}>{user.name}</div>
                  <span className={styles.emailCell}>{user.email}</span>
                </td>
                <td>
                  {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
                </td>
                <td>{user.phone}</td>
                <td>
                  <a
                    href={`https://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                  >
                    {user.website}
                  </a>
                </td>
                <td>{user.company.name}</td>
                <td className={styles.actionCell}>
                  <button
                    className={styles.deleteButton}
                    onClick={(e) => handleDelete(e, user.id)}
                    onKeyDown={(e) => handleDeleteKeyDown(e, user.id)}
                    aria-label={`Delete ${user.name}`}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && <UserDetails user={selectedUser} onClose={handleCloseModal} />}
    </div>
  );
};

export default UsersTable;
