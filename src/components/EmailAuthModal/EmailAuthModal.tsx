import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import styles from './EmailAuthModal.module.css';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../firebase/firebase';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onGoogleSignIn: () => void;
}

const EmailAuthModal: React.FC<AuthModalProps> = ({
  open,
  onClose,
  onGoogleSignIn,
}) => {
  const [tab, setTab] = useState<'signIn' | 'register'>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose();
    } catch (error) {
      alert('Failed to sign in');
      console.error(error);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onClose();
    } catch (error) {
      alert('Failed to register');
      console.error(error);
    }
  }

  // Reset form fields when switching tabs or closing
  React.useEffect(() => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }, [tab, open]);

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.modalContent}>
        <div className={styles.tabRow}>
          <button
            className={
              tab === 'signIn'
                ? `${styles.tabButton} ${styles.tabButtonActive}`
                : `${styles.tabButton} ${styles.tabButtonInactive}`
            }
            onClick={() => setTab('signIn')}>
            Sign In
          </button>
          <button
            className={
              tab === 'register'
                ? `${styles.tabButton} ${styles.tabButtonActive}`
                : `${styles.tabButton} ${styles.tabButtonInactive}`
            }
            onClick={() => setTab('register')}>
            Register
          </button>
        </div>
        <h2 className={styles.heading}>
          {tab === 'signIn' ? 'Sign In' : 'Register'}
        </h2>
        <div style={{ width: '100%' }}>
          {tab === 'signIn' ? (
            <form className={styles.form} onSubmit={handleSignIn}>
              <input
                type="email"
                placeholder="Email"
                className={styles.input}
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="username"
              />
              <input
                type="password"
                placeholder="Password"
                className={styles.input}
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button type="submit" className={styles.submitButton}>
                Sign In
              </button>
            </form>
          ) : (
            <form className={styles.form} onSubmit={handleRegister}>
              <input
                type="email"
                placeholder="Email"
                className={styles.input}
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="username"
              />
              <input
                type="password"
                placeholder="Password"
                className={styles.input}
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="new-password"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className={styles.input}
                name="confirmPassword"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />
              <button type="submit" className={styles.submitButton}>
                Register
              </button>
            </form>
          )}
        </div>
        <button onClick={onGoogleSignIn} className={styles.googleButton}>
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className={styles.googleIcon}
          />
          Sign in with Google
        </button>
      </div>
    </Modal>
  );
};

export default EmailAuthModal;
