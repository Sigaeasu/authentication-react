import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

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

    // NOTE useReducer
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            /* emailIsValid === false ? classes.invalid : '' */

            // NOTE use useReducer() output
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            /* value={enteredEmail} */

            // NOTE use useReducer()
            value={emailState.value}

            // NOTE When you leave the box
            onChange={emailChangeHandler}

            // NOTE When you leave the box
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            // passwordIsValid === false ? classes.invalid : ''

            // NOTE use useReducer() output
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            // value={enteredPassword}

            // NOTE use useReducer()
            value={passwordState.value}

            // NOTE When you leave the box
            onChange={passwordChangeHandler}

            // NOTE When you leave the box
            onBlur={validatePasswordHandler}
          />
        </div>
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
