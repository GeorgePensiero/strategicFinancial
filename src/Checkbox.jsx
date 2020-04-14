import React from 'react';

const Checkbox = props => {
    return (
        <li>
            <input type="checkbox" id={props.id} checked={props.isChecked} onClick={props.handleCheck} />
        </li>
    )
}

export default Checkbox;

