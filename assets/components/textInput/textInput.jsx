// @flow

// ----- Imports ----- //

import React from 'react';


// ----- Types ----- //

type PropTypes = {
  placeholder?: string,
  labelText?: string,
  id?: string,
};


// ----- Functions ----- //

function inputClass(hasLabel) {

  if (hasLabel) {
    return 'component-text-input__input';
  }

  return 'component-text-input';

}


// ----- Component ----- //

export default function TextInput(props: PropTypes) {

  const input = (
    <input
      className={inputClass(!!props.labelText)}
      id={props.id}
      type="text"
      placeholder={props.placeholder}
    />
  );

  if (!props.labelText) {
    return input;
  }

  return (
    <div className="component-text-input">
      <label htmlFor={props.id} className="component-text-input__label">
        {props.labelText}
      </label>
      {input}
    </div>
  );

}


// ----- Proptypes ----- //

TextInput.defaultProps = {
  placeholder: null,
  labelText: null,
  id: null,
};
