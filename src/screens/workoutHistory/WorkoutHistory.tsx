import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getAllWorkoutsByUserId } from '../../firebase/firebaseAPI';
import { Exercise, ExerciseSet } from '../../types';
import { useNavigate } from '@tanstack/react-router';
import backArrow from '../../assets/back_arrow.svg';
import './WorkoutHistory.css';
import { formatDateToDDMMYYYY } from './helper';

const WorkoutHistoryTable: React.FC = () => {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState<
    { date: string; exercises: Exercise[] }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.uid) return;
    setLoading(true);
    getAllWorkoutsByUserId(user.uid).then((data) => {
      setWorkouts(data);
      setLoading(false);
    });
  }, [user?.uid]);

  if (loading) return <div>Loading...</div>;
  if (!workouts.length) return <div>No workouts found.</div>;

  return (
    <div>
      <div className="history-header">
        <img
          src={backArrow}
          alt="Back"
          className="back-arrow"
          onClick={() => navigate({ to: '/' })}
        />
        <span className="history-title">History</span>
      </div>
      {workouts.map((workout) => (
        <div key={workout.date} style={{ marginBottom: 32 }}>
          <h3 style={{ textAlign: 'left', margin: '24px 0 8px 0' }}>
            {formatDateToDDMMYYYY(workout.date)}
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Exercise</th>
                <th>Sets</th>
              </tr>
            </thead>
            <tbody>
              {workout.exercises.map((exercise) => (
                <tr key={exercise.id}>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>
                    {exercise.name}
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>
                    <table
                      style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr>
                          <th>Set</th>
                          <th>Reps</th>
                          <th>Weight</th>
                        </tr>
                      </thead>
                      <tbody>
                        {exercise.sets.map((set: ExerciseSet, idx: number) => (
                          <tr key={idx}>
                            <td
                              style={{ border: '1px solid #eee', padding: 4 }}>
                              {idx + 1}
                            </td>
                            <td
                              style={{ border: '1px solid #eee', padding: 4 }}>
                              {set.reps}
                            </td>
                            <td
                              style={{ border: '1px solid #eee', padding: 4 }}>
                              {set.weight}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default WorkoutHistoryTable;
