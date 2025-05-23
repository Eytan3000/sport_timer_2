const setNum = 1;
const reps = 7;
const weight = 10;

import { useParams } from '@tanstack/react-router';
import './EditSet.css';

export default function EditSet() {
  const { exercise } = useParams({ strict: false });

  function handleAddSet() {}
  function handleSave() {}
  
  return (
    <>
      <div className="edit-set-main-container">
        <h3>
          <span>
            <h2>{exercise}</h2>
          </span>
          Set {setNum}
        </h3>

        <div className="inputs">
          <div className="edit-set-input-container">
            <h3>Reps</h3>
            <h3>{reps}</h3>
          </div>
          <div className="edit-set-input-container">
            <h3>Weight</h3>
            <h3>{weight}</h3>
          </div>
        </div>

        <div className="edit-set-buttons-container">
          <button onClick={handleAddSet}>Add Set</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </>
  );
}
