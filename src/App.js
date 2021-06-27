import React, {useContext} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './context/auth-context';

function App() {
  // ANCHOR Call context
  const ctx = useContext(AuthContext)

  // NOTE Move all props and method in here into auth-context.js

  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {/* NOTE Comment these because all props and method has moved into context */}
        {/* {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />} */}

        {/* NOTE Use ctx */}
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
