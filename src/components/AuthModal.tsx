import React from 'react';
import Modal from './Modal/Modal';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onGoogleSignIn: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, onGoogleSignIn }) => (
  <Modal open={open} onClose={onClose}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <h2>Sign in</h2>
      <button
        onClick={onGoogleSignIn}
        style={{
          background: '#fff',
          color: '#444',
          border: '1px solid #ccc',
          padding: '10px 20px',
          borderRadius: 4,
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          style={{ width: 24, height: 24 }}
        />
        Sign in with Google
      </button>
    </div>
  </Modal>
);

export default AuthModal; 