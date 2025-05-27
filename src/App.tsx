import { useState } from 'react';
import './App.css';

import { Chip } from '@mui/joy';
import { useNavigate } from '@tanstack/react-router';
import Timer from './components/Timer';
import { useChipsContext } from './contexts/chipsContext';

function App() {
  const navigate = useNavigate();

  const [exercises, setExercises] = useState([
    'Legs',
    'Abdominal',
    'Biceps',
    'Chest',
    'Pull ups',
    'Dips',
  ]);

  const { doneExercises, setDoneExercises } = useChipsContext();
  const [isEditing, setIsEditing] = useState(false);
  const [secs, setSecs] = useState(60);

  function handleClickChip(clickedExercise: string) {
    if (isEditing) {
      navigate({
        to: '/editSet/$exercise',
        params: { exercise: clickedExercise },
      });
    } else {
      setExercises((prev) =>
        prev.filter((exercise) => exercise !== clickedExercise)
      );
      setDoneExercises((prev) => [...prev, clickedExercise]);
    }
  }

  function handleClickDisabledChip(exerciseToAdd: string) {
    setDoneExercises((prev) =>
      prev.filter((exercise) => exercise !== exerciseToAdd)
    );
    setExercises((prev) => [...prev, exerciseToAdd]);
  }

  function handleReset() {
    setExercises((prev) => [...prev, ...doneExercises]);
    setDoneExercises([]);
  }

  function handleIsEditing() {
    setIsEditing((prev) => !prev);
  }
  function openAuthModal() {}

  return (
    <>
      <div className="main-container">
        <div className="button-row">
          <button onClick={() => setSecs(90)}>90</button>
          <button onClick={() => setSecs(60)}>60</button>
        </div>

        <Timer secs={secs} />
        <div>
          {exercises.map((exercise) => (
            <Chip
              className={'chip'}
              key={exercise}
              disabled={false}
              onClick={() => handleClickChip(exercise)}
              size="lg"
              variant="solid"
              color="primary">
              {exercise}
            </Chip>
          ))}
        </div>

        <div>
          {doneExercises.map((exercise) => (
            <Chip
              className={'chip'}
              key={exercise}
              onClick={() => handleClickDisabledChip(exercise)}
              size="lg"
              variant="solid">
              {exercise}
            </Chip>
          ))}
        </div>
        {/* <button onClick={handleReset}>Reset</button> removeEytan */}
        <button
          className="edit-btn"
          style={{
            background: isEditing ? '#ffcaca' : undefined,
          }}
          onClick={handleIsEditing}>
          +
        </button>

        <button onClick={openAuthModal}>Auth</button>
      </div>
    </>
  );
}

export default App;
