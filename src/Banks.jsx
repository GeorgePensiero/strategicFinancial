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
                {banks ? banks.map(bank => <li className="info" key={bank.id}>{bank.creditorName}</li>) : ''}
            </ul>
        </div>
    )
};