import React from 'react';

export default function BankInfo({bank, idx, status, handleCheck}) {
    

    
    return (
        <li key={"bank" + idx} className={status ? 'bank chosen' : 'bank unchosen'}>
                <input type="checkbox" id={idx} onChange={e => handleCheck(e)} checked={status} />
                <span>{bank.creditorName}</span>
                <span>{bank.firstName}</span>
                <span>{bank.lastName}</span>
                <span className="pay">{bank.minPaymentPercentage.toFixed(2) + "%"}</span>
                <span className="balance">{bank.balance.toFixed(2)}</span>
        </li>
    )
}