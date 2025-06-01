import { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import './App.css';
import sound_321go from './assets/321done.mp3';
import { Chip } from '@mui/joy';
function playSound() {
  const audio = new Audio(sound_321go);
  audio.play();
}

function App() {
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

  function play() {
    playSound();
  }

  function handleOnUpdate(sec: number) {
    sec === 4 && play();
  }

  //setDoneExercises

  function handleClickChip(exerciseToRemove: string) {
    setExercises((prev) =>
      prev.filter((exercise) => exercise !== exerciseToRemove)
    );
    setDoneExercises((prev) => [...prev, exerciseToRemove]);
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
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '20px',
        }}>
          eytan
        <div style={{ marginBottom: '20px' }}>
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
        <div
          style={{
            // marginBottom: '20px',
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
          }}>
          <button onClick={() => setSecs(90)}>90</button>
          <button onClick={() => setSecs(60)}>60</button>
        </div>
        <div
          style={{ margin: '0 auto' }}
          onClick={() => {
            setisPlaying((prev) => !prev);
            setrestart((prev) => prev + 1);
          }}>
          <CountdownCircleTimer
            onComplete={() => {
              // // do your stuff here
              // return { shouldRepeat: true, delay: 1.5 }; // repeat animation in 1.5 seconds
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
            {/* {({ remainingTime }) => remainingTime} */}
            {({ remainingTime }) => (
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {remainingTime}
              </div>
            )}
          </CountdownCircleTimer>
        </div>
        <div
          style={
            {
              // marginBlock: '20px'
            }
          }>
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
        <button onClick={handleReset}>Reset</button>
      </div>
    </>
  );
}

export default App;
