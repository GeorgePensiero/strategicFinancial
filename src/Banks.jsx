import React, { useEffect, useState } from 'react';

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
                {banks ? banks.map(bank => {
                    return <li className="info" key={bank.id}>
                            <span>{bank.creditorName}</span>
                            <span>{bank.firstName}</span>
                            <span>{bank.lastName}</span>
                            <span>{bank.minPaymentPercentage.toFixed(2) + "%" }</span>
                            <span>{bank.balance}</span>
                    </li>
                }) : ''}
            </ul>
        </div>
    )
};