import React, { useEffect, useState } from 'react';
import './banks.css';

export default function Banks() {
    const [banks, updateBanks] = useState(null);

    // fetch JSON data after component mounts
    useEffect(() => {
        fetch("https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json")
            .then(res => res.json())
            .then(data => updateBanks(data));
    }, []);

    return (
        <div className="banks">
            <ul className="table">
                <li className="list-headers">
                    <span>Creditor</span>
                    <span>First Name</span>
                    <span>Last Name</span>
                    <span className="pay">Min Pay%</span>
                    <span className="balance">Balance</span>
                </li>
                {banks ? banks.map(bank => {
                    return <li className="bank-info" key={bank.id}>
                            <span>{bank.creditorName}</span>
                            <span>{bank.firstName}</span>
                            <span>{bank.lastName}</span>
                            <span className="pay">{bank.minPaymentPercentage.toFixed(2) + "%" }</span>
                            <span className="balance">{bank.balance}</span>
                    </li>
                }) : ''}
            </ul>
        </div>
    )
};