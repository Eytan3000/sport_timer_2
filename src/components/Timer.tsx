import { useState } from 'react';
import { useMyContext } from '../contexts/timeContext';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import sound_321go from '../assets/321done.mp3';
import './Timer.css';

function playSound() {
  const audio = new Audio(sound_321go);
  audio.play();
}

export default function Timer({
  secs = 60,
  size = 300,
}: {
  secs?: number;
  size?: number;
}) {
  const [restart, setrestart] = useState(0);
  //   const [isPlaying, setisPlaying] = useState(false);
  const {
    initialRemainingTime,
    setInitialRemainingTime,
    isPlaying,
    setisPlaying,
  } = useMyContext();

  let rt = 0;
  function play() {
    playSound();
  }

  function handleOnUpdate(sec: number) {
    // sec === 4 && play();
    setInitialRemainingTime(rt);
  }

  return (
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
        size={size}
        isPlaying={isPlaying}
        duration={secs}
        colors={
          isPlaying
            ? ['#004777', '#F7B801', '#A30000', '#A30000']
            : ['#acacac', '#acacac', '#acacac', '#acacac']
        }
        initialRemainingTime={initialRemainingTime}
        colorsTime={[7, 5, 2, 0]}
        onUpdate={handleOnUpdate}>
        {({ remainingTime }) => {
          rt = remainingTime;
          return <div className="remaining-time">{remainingTime}</div>;
        }}
      </CountdownCircleTimer>
    </div>
  );
}
