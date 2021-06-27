import React, {useRef, useImperativeHandle} from 'react';
import classes from './Input.module.css';

// NOTE Ref can be passed as props, it needs to be forwarded differently
const Input = React.forwardRef((props, ref) => {

    // ANCHOR useRef
    const inputRef = useRef()

    const activate = () => {
        inputRef.current.focus();
    }

    useImperativeHandle(ref, () => {
        return {
            focus: activate
        };
    });

    return (
        <div
          className={`${classes.control} ${
            // NOTE use useReducer() output
            props.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor={props.id}>{props.label}</label>
          <input
            ref={inputRef}
            type={props.type}
            id={props.id}
            /* value={enteredEmail} */

            // NOTE use useReducer()
            value={props.value}

            // NOTE When you leave the box
            onChange={props.onChange}

            // NOTE When you leave the box
            onBlur={props.onBlur}
          />
        </div>
    )
});

export default Input;