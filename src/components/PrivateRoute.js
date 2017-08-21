import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import currentUser from '../currentUser'

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   return (
//     <Route {...rest} render={props => {
//       // Are we authenticated????
//         return (
//           currentUser.token ? (
//             <Component {...props} />
//           ) : (
//             <Redirect to={{
//               pathname: '/login',
//               state: { from: props.location }
//             }}/>
//           )
//         )
//     }}/>
//   )
// }
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    currentUser.token ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default PrivateRoute;
