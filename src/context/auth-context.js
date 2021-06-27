import React, {useEffect, useState} from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogin: (email, password) => {},
    onLogout: () => {}
})

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // NOTE Use useEffect() to evaluate the function inside after everything outside useEffect is done running
    useEffect(() => {
        // NOTE Check if there is status 1 in local storage
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
        if (storedUserLoggedInInformation === '1') {
        setIsLoggedIn(true)
        }
    }, [])

    const loginHandler = () => {
        // NOTE Store status to local storage
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    }

    const logoutHandler = () => {
        // NOTE Remove status in local storage
        localStorage.removeItem('isLoggedIn')
        setIsLoggedIn(false);
    }

    return <AuthContext.Provider
        value={{
            isLoggedIn: isLoggedIn,
            onLogin: loginHandler,
            onLogout: logoutHandler
        }}
    >{props.children}</AuthContext.Provider>
}

export default AuthContext;