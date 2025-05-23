// import * as React from 'react'
// import { Outlet, createRootRoute } from '@tanstack/react-router'

// export const Route = createRootRoute({
//   component: RootComponent,
// })

// function RootComponent() {
//   return (
//     <React.Fragment>
//       <div>Hello "__root"!</div>
//       <Outlet />
//     </React.Fragment>
//   )
// }


import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      {/* <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr /> */}
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})