import { useNavigate, useParams } from '@tanstack/react-router';
import './EditSet.css';
import Timer from '../../components/Timer/Timer';
import backArrow from '../../assets/back_arrow.svg';
import { useState, useRef, useEffect } from 'react';
import { Exercise, ExerciseSet } from '../../types';
import { getExerciseByName, updateExercise } from '../../firebase/firebaseAPI';
import { generateUID } from '../../helpers';
import { useAuth } from '../../contexts/AuthContext';
import EditSetModal from '../../components/EditSetModal';

export default function EditSet() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const uid = user?.uid;

  const params = useParams({ strict: false });
  const exerciseName = params.exercise || '';

  const initialExercise = {
    id: generateUID(),
    name: exerciseName || '',
  };

  const initialSets: ExerciseSet[] = [{ reps: 7, weight: 10 }];

  const [modalOpen, setModalOpen] = useState(false);
  const [editField, setEditField] = useState<'reps' | 'weight' | null>(null);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const [exercise, setExercise] = useState(initialExercise); //removeEytan
  const [sets, setSets] = useState<ExerciseSet[]>([]);

  const [setNum, setSetNum] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (!uid) return;

      const res = await getExerciseByName(uid, new Date(), exerciseName);
      if (res) {
        const exercise = { id: res.id, name: res.name };
        setExercise(exercise);
        setSets(res.sets);
      } else {
        setExercise(initialExercise);
        setSets(initialSets);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (modalOpen && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [modalOpen]);

  useEffect(() => {
    setSetNum(sets.length ? sets.length - 1 : 0);
  }, [sets]);

  function handleAddSet() {
    setSets((prev) => [
      ...prev,
      {
        reps: prev[prev.length - 1].reps,
        weight: prev[prev.length - 1].weight,
      },
    ]);
  }

  async function handleSave() {
    try {
      if (!uid) throw new Error('No User ID.');

      const data: Exercise = {
        id: exercise.id,
        name: exercise.name || '',
        sets: sets,
      };
      await updateExercise(uid, new Date(), data);
      navigate({ to: '/' });
    } catch (err) {
      console.log('Error:', err);
    }
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
      setSets((prev) => {
        const newSets = [...prev];
        newSets[setNum].reps = val;
        return newSets;
      });
    } else if (editField === 'weight') {
      setSets((prev) => {
        const newSets = [...prev];
        newSets[setNum].weight = val;
        return newSets;
      });
    }
    closeModal();
  }

  if (!exercise) return <div>No exercise Name in url</div>;
  if (loading) return <div>Loading...</div>;
  if (!sets.length) return <div>No sets available</div>;
  return (
    <>
      <div className="edit-set-main-container">
        <div className="edit-set-secondary-container">
          <img src={backArrow} alt="" className="arrow" onClick={handleBack} />

          <div className="edit-set-title-row">
            <h2>{exerciseName}</h2>
            <h4>
              Set {setNum + 1} / {sets.length}
            </h4>
          </div>

          <div className="inputs" key={setNum}>
            <div className="edit-set-input-container">
              <h3>Reps</h3>
              <h3
                style={{ cursor: 'pointer', color: '#1976d2' }}
                onClick={() => openModal('reps', sets[setNum].reps)}>
                {/* {repsState} */}
                {sets[setNum].reps}
              </h3>
            </div>
            <div className="edit-set-input-container">
              <h3>Weight</h3>
              <h3
                style={{ cursor: 'pointer', color: '#1976d2' }}
                onClick={() => openModal('weight', sets[setNum].weight)}>
                {/* {weightState} */}
                {sets[setNum].weight}
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
            disabled={setNum === sets.length - 1}>
            {'>'}
          </button>
        </div>
        <div className="edit-set-buttons-container">
          <button onClick={handleAddSet}>Add Set</button>
          <button onClick={handleSave}>Save</button>
        </div>

        {/* Modal */}
        <EditSetModal
          open={modalOpen}
          onClose={closeModal}
          editField={editField}
          editValue={editValue}
          inputRef={inputRef}
          setEditValue={setEditValue}
          handleModalSave={handleModalSave}
        />
      </div>
    </>
  );
}
