import { useState } from 'react';
import './App.css';

import { Chip } from '@mui/joy';
import { useNavigate } from '@tanstack/react-router';
import Timer from './components/Timer/Timer';
import { useChipsContext } from './contexts/chipsContext';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { auth } from './firebase/firebase';
import { useAuth } from './contexts/AuthContext';
import { useTimeContext } from './contexts/timeContext';
import EmailAuthModal from './components/EmailAuthModal/EmailAuthModal';
import HamburgerIcon from './components/hamburger/HamburgerIcon';

function App() {
  const navigate = useNavigate();

  const { user } = useAuth();
  const uid = user?.uid;



  const { doneExercises, setDoneExercises, exercises, setExercises } =
    useChipsContext();

  const [isEditing, setIsEditing] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const { setSeconds } = useTimeContext();

  function handleClickChip(clickedExercise: string) {
    if (isEditing) {
      if (!uid) {
        setAuthModalOpen(true);
        return;
      } else {
        navigate({
          to: '/editSet/$exercise',
          params: { exercise: clickedExercise },
        });
      }
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

  function handleIsEditing() {
    setIsEditing((prev) => !prev);
  }

  async function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
      setAuthModalOpen(false);
    } catch (error) {
      alert('Google sign-in failed');
    }
  }

  function onMenuClick() {
    navigate({ to: '/workoutsHistory' });
  }

  return (
    <>
      <div className="main-container">
        <HamburgerIcon onClick={onMenuClick} />

        <div className="button-row">
          <button onClick={() => setSeconds(90)}>90</button>
          <button onClick={() => setSeconds(60)}>60</button>
        </div>

        <Timer />
        <div className="exercise-container">
          <div className="active-chips">
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

          <div className="done-chips">
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
        </div>
        <button
          className={`edit-btn${isEditing ? ' editing' : ''}`}
          onClick={handleIsEditing}>
          +
        </button>
      </div>
      <EmailAuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onGoogleSignIn={handleGoogleSignIn}
      />
    </>
  );
}

export default App;
