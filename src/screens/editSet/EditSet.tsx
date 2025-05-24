const setNum = 1;
const reps = 7;
const weight = 10;

import { useNavigate, useParams } from '@tanstack/react-router';
import './EditSet.css';
import Timer from '../../components/Timer';
import backArrow from '../../assets/back_arrow.svg';

export default function EditSet() {
  const navigate = useNavigate();
  const { exercise } = useParams({ strict: false });

  function handleAddSet() {}
  function handleSave() {}
  function handleBack() {
    navigate({ to: '/' });
  }

  return (
    <>
      <div className="edit-set-main-container">
        <div className="edit-set-secondary-container">
          <img src={backArrow} alt="" className="arrow" onClick={handleBack} />

          <div className="edit-set-title-row">
            <h2>{exercise}</h2>
            <h4>Set {setNum}</h4>
          </div>

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

          <Timer size={220} />
        </div>
        <div className="edit-set-buttons-container">
          <button onClick={handleAddSet}>Add Set</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </>
  );
}
