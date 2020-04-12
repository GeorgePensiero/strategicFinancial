import React, { useEffect, useState } from 'react';
import BankInfo from './BankInfo';
import './banks.css';

export default function Banks() {
    const [banks, updateBanks] = useState(null);
    const [totalBalance, updateTotal] = useState(0);
    const [rowCt, updateRowCt] = useState(0);
    const [checkedRowCt, updateCheckedRows] = useState(0);
    // fetch JSON data after component mounts
    useEffect(() => {
        fetch("https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json")
            .then(res => res.json())
            .then(data => {
                updateBanks(data);
                let bal = 0;
                data.forEach(bank => bal += bank.balance);
                updateTotalBal(bal);
                updateRowCt(data.length);
            });
    }, []);

    function updateTotalBal(bal){
        updateTotal(totalBalance => totalBalance + bal);
    }


    return (
        <div className="banks">
            <ul className="table">
                <li className="list-headers">
                    <input type="checkbox" checked={false} />
                    <span>Creditor</span>
                    <span>First Name</span>
                    <span>Last Name</span>
                    <span className="pay">Min Pay%</span>
                    <span className="balance">Balance</span>
                </li>
                {banks ? banks.map(bank => {
                    return <BankInfo bank={bank} />
                }) : ''}
            </ul>
            <div className="total">
                <p>Total</p>
                {"$" + totalBalance.toFixed(2).toLocaleString()}
            </div>
            <div className="row-counts">
                {rowCt}
                {checkedRowCt}
            </div>
        </div>
    )
};