import { createFileRoute } from '@tanstack/react-router';
import EditSet from '../../screens/editSet/EditSet';

export const Route = createFileRoute('/editSet/$exercise')({
  component: EditSet,
});
