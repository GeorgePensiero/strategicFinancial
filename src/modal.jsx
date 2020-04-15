import React from 'react';

const Modal = ({show, handleClose, children, addDebt}) => {
    const showHideClass = show ? "modal show" : "modal hide";

    return (
        <div className={showHideClass}>
            <div className="modal-main">
                {children}
            </div>
        </div>
    )
}

export default Modal;