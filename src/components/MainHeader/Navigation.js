import React, {useContext} from 'react';

import classes from './Navigation.module.css';
import AuthContext from '../../context/auth-context';

const Navigation = (props) => {

  // ANCHOR create useContext()
  const ctx = useContext(AuthContext);

  return (
    // NOTE Use this if you dont want to use useContext()
    // <AuthContext.Consumer>
      // {(ctx) => {}}
    // </AuthContext.Consumer>
    
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
