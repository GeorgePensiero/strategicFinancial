import React from 'react';

const Checkbox = props => {
    return (
            <input type="checkbox" id={props.id} onChange={props.handleCheck} checked={props.isChecked} />
    )
}

export default Checkbox;

