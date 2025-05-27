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

  const [data, setData] = useState({
    id: 1,
    name: 'Bench Press',
    sets: [
      { reps: 7, weight: 10 },
      { reps: 8, weight: 11 },
      { reps: 9, weight: 12 },
      { reps: 10, weight: 13 },
      { reps: 11, weight: 14 },
      { reps: 12, weight: 15 },
    ],
  }); //removeEytan

  const [setNum, setSetNum] = useState(0);

  useEffect(() => {
    setData((prev) => {
      const newSets = [...prev.sets];
      newSets[setNum] = { reps: repsState, weight: weightState };
      return { ...prev, sets: newSets };
    });
  }, [repsState, weightState, setNum]);

  useEffect(() => {
    if (modalOpen && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [modalOpen]);

  function handleAddSet() {}
  function handleSave() {
    // save input to db
  }
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
    const val = Number(editValue);
    if (editField === 'reps') {
      setRepsState(val);
    } else if (editField === 'weight') {
      setWeightState(val);
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
            <h4>Set {setNum + 1}</h4>
          </div>

          <div className="inputs">
            <div className="edit-set-input-container">
              <h3>Reps</h3>
              <h3
                style={{ cursor: 'pointer', color: '#1976d2' }}
                onClick={() => openModal('reps', repsState)}>
                {/* {repsState} */}
                {data.sets[setNum].reps}
              </h3>
            </div>
            <div className="edit-set-input-container">
              <h3>Weight</h3>
              <h3
                style={{ cursor: 'pointer', color: '#1976d2' }}
                onClick={() => openModal('weight', weightState)}>
                {/* {weightState} */}
                {data.sets[setNum].weight}
              </h3>
            </div>
          </div>

          <Timer size={220} />
        </div>
        <div className="edit-set-next-prev-container">
          <button
            onClick={() => setSetNum((prev) => prev - 1)}
            disabled={setNum === 0}>
            {'<'}
          </button>
          <button
            onClick={() => setSetNum((prev) => prev + 1)}
            disabled={setNum === data.sets.length - 1}>
            {'>'}
          </button>
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
            onChange={(e) => setEditValue(e.target.value)}
            style={{ fontSize: '1.5rem', padding: '0.5rem', width: '100px' }}
          />

          <div
            style={{
              marginTop: '20px',
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
            }}>
            <button onClick={handleModalSave}>Save</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </Modal>
      </div>
    </>
  );
}
