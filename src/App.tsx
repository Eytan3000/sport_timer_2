import { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import './App.css';
import sound_321go from './assets/321done.mp3';
function playSound() {
  const audio = new Audio(sound_321go);
  audio.play();
}

function App() {
  const [restart, setrestart] = useState(0);
  const [isPlaying, setisPlaying] = useState(false);
  const [secs, setSecs] = useState(60);

  function play() {
    playSound();
  }

  function handleOnUpdate(sec: number) {
    sec === 4 && play();
  }

  return (
    <>
      <div
        style={{
          marginBottom: '20px',
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
        }}>
        <button onClick={()=>setSecs(90)}>90</button>
        <button onClick={()=>setSecs(60)}>60</button>
      </div>
      <div
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
          colors={['#004777', '#F7B801', '#A30000', '#A30000']}
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
    </>
  );
}

export default App;
