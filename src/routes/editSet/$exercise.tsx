import { createFileRoute, redirect } from '@tanstack/react-router';
import EditSet from '../../screens/editSet/EditSet';

export const Route = createFileRoute('/editSet/$exercise')({
  beforeLoad: ({ context }) => {
    if (!context.user.email) {
      throw redirect({ to: '/' });
    }
  },
  component: EditSet,
});
