import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../context/auth-context';
import Input from '../Input/Input';

// ANCHOR email useReducer function
const emailReducer = (state, action) => {
  // NOTE When you type, validate new state
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@')};
  }

  // NOTE When you leave the input box, validate prev state
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@')};
  }

  return { value: '', isValid: false};
}

// ANCHOR password useReducer function
const passwordReducer = (state, action) => {
  // NOTE When you type, validate new state
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6};
  }

  // NOTE When you leave the input box, validate prev state
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6};
  }

  return { value: '', isValid: false};
}

const Login = (props) => {
  /* const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();*/
  const [formIsValid, setFormIsValid] = useState(false);

  // ANCHOR use useContext();
  const ctx = useContext(AuthContext)

  // ANCHOR use useRef()
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // ANCHOR use useReducer() for email input
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    // NOTE This is emailState state
    value: '',
    isValid: false
  })

  // ANCHOR use useReducer() for password input
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    // NOTE This is emailState state
    value: '',
    isValid: false
  })

  // NOTE Destructuring email and password state into isValid only
  const { isValid: emailIsValid} = emailState;
  const { isValid: passwordIsValid} = passwordState;

  // ANCHOR useEffect - Check both email & password after everything done running
  useEffect(() => {
    // NOTE set timer on 500ms, only run once below before time out
    const identifier = setTimeout(() => {
      setFormIsValid(
        // NOTE Basic
        /* enteredEmail.includes('@') && enteredPassword.trim().length > 6 */
      
        // NOTE Combine with useReducer()
        // NOTE Only read isValid value, after destructuring
        emailIsValid && passwordIsValid
      );
    }, 500); 

    // NOTE clean up function, re run time out once done
    return () => {
      clearTimeout(identifier);
    }

  // NOTE add dependencies. If dependencies is changed, useEffect will run
  // NOTE Basic
  // }, [enteredEmail, enteredPassword])

  // NOTE Combine with useReducer()
  // NOTE Only read isValid value, after destructuring
  }, [emailIsValid, passwordIsValid])

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);

    // NOTE Basic - Check if email is valid, then check password 
    /* setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length > 6
    ); */

    // NOTE useReducer() - Call function with type : USER_INPUT
    dispatchEmail({type: 'USER_INPUT', val: event.target.value})
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);

    // NOTE Check if password is valid, then check password 
    /* setFormIsValid(
      event.target.value.trim().length > 6 && enteredEmail.includes('@')
    ); */

    // NOTE useReducer() - Call function with type : USER_INPUT
    dispatchPassword({type: 'USER_INPUT', val: event.target.value})
  };

  const validateEmailHandler = () => {
    // NOTE Basic - Set email state when you leave the input box
    // setEmailIsValid(enteredEmail.includes('@'));

    // NOTE useReducer()
    dispatchEmail({type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    // NOTE Basic - Set password state when you leave the input box
    // setPasswordIsValid(enteredPassword.trim().length > 6);

    // NOTE useReducer()
    dispatchPassword({type: 'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    /* props.onLogin(enteredEmail, enteredPassword); */

    if (formIsValid) {
      // NOTE useReducer
      ctx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.activate()
    } else {
      passwordInputRef.current.activate()
    }

  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>

        {/* ANCHOR Making Input to be dynamic */}
        
        {/* NOTE Move email input to Input.js */}
        <Input 
          ref={emailInputRef}
          id="email"
          label="E-mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />

        {/* NOTE Move password input to Input.js */}
        <Input 
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
