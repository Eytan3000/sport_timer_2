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

  function play() {
    playSound();
  }

  function handleOnUpdate(sec: number) {
    sec === 3 && play();
  }

  return (
    <>
    {/* <button onClick={()=>play()}>Play</button> */}
      <div
        onClick={() => {
          setisPlaying((prev) => !prev);
          setrestart((prev) => prev + 1);
        }}>
        <CountdownCircleTimer
          // onComplete={() => {
          //   // do your stuff here
          //   return { shouldRepeat: true, delay: 1.5 }; // repeat animation in 1.5 seconds
          // }}
          key={restart}
          isPlaying={isPlaying}
          duration={5}
          colors={['#004777', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[7, 5, 2, 0]}
          onUpdate={handleOnUpdate}>
          {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
      </div>
    </>
  );
}

export default App;
