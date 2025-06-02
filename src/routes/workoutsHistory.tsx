import { createFileRoute } from '@tanstack/react-router';
import workoutHistory from '../screens/workoutHistory/WorkoutHistory';

export const Route = createFileRoute('/workoutsHistory')({
  component: workoutHistory,
});
