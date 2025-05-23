import { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import './App.css';
import sound_321go from './assets/321done.mp3';
import { Chip } from '@mui/joy';
import { useNavigate } from '@tanstack/react-router';
function playSound() {
  const audio = new Audio(sound_321go);
  audio.play();
}

function App() {
  const navigate = useNavigate();
  const [restart, setrestart] = useState(0);
  const [isPlaying, setisPlaying] = useState(false);
  const [secs, setSecs] = useState(60);
  const [exercises, setExercises] = useState([
    'Legs',
    'Abdominal',
    'Biceps',
    'Chest',
    'Pull ups',
    'Dips',
  ]);
  const [doneExercises, setDoneExercises] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  function play() {
    playSound();
  }

  function handleOnUpdate(sec: number) {
    sec === 4 && play();
  }

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

  return (
    <>
      <div className="main-container">
        <div className="button-row">
          <button onClick={() => setSecs(90)}>90</button>
          <button onClick={() => setSecs(60)}>60</button>
        </div>
        <div
          className="timer-container"
          onClick={() => {
            setisPlaying((prev) => !prev);
            setrestart((prev) => prev + 1);
          }}>
          <CountdownCircleTimer
            onComplete={() => {
              setisPlaying((prev) => !prev);
            }}
            key={restart}
            size={300}
            isPlaying={isPlaying}
            duration={secs}
            colors={
              isPlaying
                ? ['#004777', '#F7B801', '#A30000', '#A30000']
                : ['#acacac', '#acacac', '#acacac', '#acacac']
            }
            colorsTime={[7, 5, 2, 0]}
            onUpdate={handleOnUpdate}>
            {({ remainingTime }) => (
              <div className="remaining-time">{remainingTime}</div>
            )}
          </CountdownCircleTimer>
        </div>
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
      </div>
    </>
  );
}

export default App;
