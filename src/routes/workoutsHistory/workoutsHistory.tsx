import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/workoutsHistory/workoutsHistory')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/workoutsHistory/tsx/workoutsHistory"!</div>;
}
