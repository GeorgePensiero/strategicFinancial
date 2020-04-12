import React, {useState} from 'react';

export default function BankInfo({bank}) {
    const [isChecked, toggleCheck] = useState(false);

    return (
        <div>
            <input type="checkbox" checked={isChecked} onClick={e => toggleCheck(!isChecked)}/>
            <li className="bank-info" key={bank.id}>
                <span>{bank.creditorName}</span>
                <span>{bank.firstName}</span>
                <span>{bank.lastName}</span>
                <span className="pay">{bank.minPaymentPercentage.toFixed(2) + "%"}</span>
                <span className="balance">{bank.balance.toFixed(2)}</span>
            </li>
        </div>
    )
}