import { useEffect, useRef } from 'react';
import type { User } from '../../types';
import styles from './UserDetails.module.css';

interface UserDetailsProps {
  user: User;
  onClose: () => void;
}

const UserDetails = ({ user, onClose }: UserDetailsProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
      // Set focus to the dialog when it opens
      dialogRef.current.focus();
    }

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleDialogClick = (e: React.MouseEvent) => {
    // Close when clicking on the backdrop (outside the modal content)
    const rect = dialogRef.current?.getBoundingClientRect();
    if (rect) {
      const isInDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;
      if (!isInDialog) {
        onClose();
      }
    }
  };

  const openMap = () => {
    const { lat, lng } = user.address.geo;
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
  };

  return (
    <dialog
      className={styles.dialog}
      ref={dialogRef}
      onClick={handleDialogClick}
      aria-labelledby="modal-title"
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h2 className={styles.title} id="modal-title">
              {user.name}
            </h2>
            <a href={`mailto:${user.email}`} className={styles.email}>
              {user.email}
            </a>
          </div>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Address</h3>
            <p className={styles.addressLine}>
              {user.address.suite}, {user.address.street}
            </p>
            <p className={styles.addressLine}>
              {user.address.city}, {user.address.zipcode}
            </p>
            <button className={styles.mapButton} onClick={openMap}>
              <span className={styles.mapIcon}>📍</span> View on map
            </button>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Contact</h3>
            <div className={styles.contactRow}>
              <span className={styles.label}>Phone:</span>
              <span className={styles.value}>{user.phone}</span>
            </div>
            <div className={styles.contactRow}>
              <span className={styles.label}>Website:</span>
              <a
                href={`https://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                {user.website}
              </a>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Company</h3>
            <div className={styles.companyRow}>
              <span className={styles.label}>Name:</span>
              <span className={styles.value}>{user.company.name}</span>
            </div>
            <div className={styles.companyRow}>
              <span className={styles.label}>Catchphrase:</span>
              <span className={styles.value}>{user.company.catchPhrase}</span>
            </div>
            <div className={styles.companyRow}>
              <span className={styles.label}>Business:</span>
              <span className={styles.value}>{user.company.bs}</span>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default UserDetails;
