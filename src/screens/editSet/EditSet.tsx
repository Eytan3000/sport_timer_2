const setNum = 1;
const reps = 7;
const weight = 10;

import { useNavigate, useParams } from '@tanstack/react-router';
import './EditSet.css';
import Timer from '../../components/Timer';
import backArrow from '../../assets/back_arrow.svg';
import { useState, useRef, useEffect } from 'react';
import Modal from '../../components/Modal';

export default function EditSet() {
  const navigate = useNavigate();
  const { exercise } = useParams({ strict: false });

  const [modalOpen, setModalOpen] = useState(false);
  const [editField, setEditField] = useState<'reps' | 'weight' | null>(null);
  const [editValue, setEditValue] = useState('');
  const [repsState, setRepsState] = useState(reps);
  const [weightState, setWeightState] = useState(weight);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (modalOpen && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [modalOpen]);

  function handleAddSet() {}
  function handleSave() {}
  function handleBack() {
    navigate({ to: '/' });
  }

  function openModal(field: 'reps' | 'weight', value: number) {
    setEditField(field);
    setEditValue(value.toString());
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditField(null);
    setEditValue('');
  }

  function handleModalSave() {
    if (editField === 'reps') {
      setRepsState(Number(editValue));
    } else if (editField === 'weight') {
      setWeightState(Number(editValue));
    }
    closeModal();
  }

  return (
    <>
      <div className="edit-set-main-container">
        <div className="edit-set-secondary-container">
          <img src={backArrow} alt="" className="arrow" onClick={handleBack} />

          <div className="edit-set-title-row">
            <h2>{exercise}</h2>
            <h4>Set {setNum}</h4>
          </div>

          <div className="inputs">
            <div className="edit-set-input-container">
              <h3>Reps</h3>
              <h3
                style={{ cursor: 'pointer', color: '#1976d2' }}
                onClick={() => openModal('reps', repsState)}
              >
                {repsState}
              </h3>
            </div>
            <div className="edit-set-input-container">
              <h3>Weight</h3>
              <h3
                style={{ cursor: 'pointer', color: '#1976d2' }}
                onClick={() => openModal('weight', weightState)}
              >
                {weightState}
              </h3>
            </div>
          </div>

          <Timer size={220} />
        </div>
        <div className="edit-set-buttons-container">
          <button onClick={handleAddSet}>Add Set</button>
          <button onClick={handleSave}>Save</button>
        </div>

        {/* Modal */}
        <Modal open={modalOpen} onClose={closeModal}>
          <h2>Edit {editField === 'reps' ? 'Reps' : 'Weight'}</h2>
          <input
            ref={inputRef}
            type="number"
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            style={{ fontSize: '1.5rem', padding: '0.5rem', width: '100px' }}
          />
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button onClick={handleModalSave}>Save</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </Modal>
      </div>
    </>
  );
}
