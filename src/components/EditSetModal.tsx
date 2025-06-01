import React from 'react';
import Modal from './Modal/Modal';

interface EditSetModalProps {
  open: boolean;
  onClose: () => void;
  editField: 'reps' | 'weight' | null;
  editValue: string;
  inputRef: React.RefObject<HTMLInputElement>;
  setEditValue: (value: string) => void;
  handleModalSave: () => void;
}

const EditSetModal: React.FC<EditSetModalProps> = ({
  open,
  onClose,
  editField,
  editValue,
  inputRef,
  setEditValue,
  handleModalSave,
}) => (
  <Modal open={open} onClose={onClose}>
    <h2>Edit {editField === 'reps' ? 'Reps' : 'Weight'}</h2>
    <input
      ref={inputRef}
      type="number"
      value={editValue}
      onChange={(e) => setEditValue(e.target.value)}
      style={{ fontSize: '1.5rem', padding: '0.5rem', width: '100px' }}
    />
    <div
      style={{
        marginTop: '20px',
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
      }}
    >
      <button onClick={handleModalSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  </Modal>
);

export default EditSetModal; 