// @flow

// ----- Imports ----- //

import React from 'react';


// ----- Types ----- //

// Disabling the linter here because it's just buggy...
/* eslint-disable react/no-unused-prop-types */

type listItem =
  | {| heading: string, text: string |}
  | {| heading: string |}
  | {| text: string |}
  ;

/* eslint-enable react/no-unused-prop-types */

type PropTypes = {
  listItems: listItem[],
};


// ----- Component ----- //

export default function FeatureList(props: PropTypes) {

  const items = props.listItems.map((item: listItem) => {

    const itemHeading = item.heading ? <h3>{ item.heading }</h3> : null;
    const itemText = item.text ? <p>{ item.text }</p> : null;

    return (
      <li>
        {itemHeading}
        {itemText}
      </li>
    );

  });

  return <ul className="component-feature-list">{ items }</ul>;

}
