import React from 'react';

export default function BankInfo({bank}) {
    

    
    return (
        <div>
                <span>{bank.creditorName}</span>
                <span>{bank.firstName}</span>
                <span>{bank.lastName}</span>
                <span className="pay">{bank.minPaymentPercentage.toFixed(2) + "%"}</span>
                <span className="balance">{bank.balance.toFixed(2)}</span>
        </div>
    )
}