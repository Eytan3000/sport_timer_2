/* eslint-disable @typescript-eslint/ban-ts-comment */

import { createFileRoute, 
  // redirect
 } from '@tanstack/react-router';
import EditSet from '../../screens/editSet/EditSet';

export const Route = createFileRoute('/editSet/$exercise')({
  // beforeLoad: ({ context }) => {
  //   // @ts-ignore
  //   if (!context.user.email) {
  //     throw redirect({ to: '/' });
  //   }
  // }, //removeEytan
  component: EditSet,
});
