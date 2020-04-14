import React, { useEffect, useState, useRef } from 'react';
import BankInfo from './BankInfo';
import './banks.css';

export default function Banks() {
    const [data, updateData] = useState(null);
    const [totalBalance, updateTotal] = useState(0);
    const [checkStatus, updateStatus] = useState([]);
    const [components, updateComponents] = useState(null);
    const [rowCt, updateRowCt] = useState(0);
    const [checkedRowCt, updateCheckedRows] = useState(0);
    const [allChecked, toggleAll] = useState(false);
    const statusRef = useRef(checkStatus);
    const dataRef = useRef(data);
    // fetch JSON data after component mounts
    useEffect(() => {
        fetch("https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json")
            .then(res => res.json())
            .then(data => {
                updateData(data);
                let bal = 0;
                data.forEach(bank => bal += bank.balance);
                updateTotalBal(bal);
                updateRowCt(data.length);
                createCheckStatus(data);
                createComponents(data);
            });
    }, []);

    function updateTotalBal(bal){
        updateTotal(totalBalance => totalBalance + bal);
    }

    function createCheckStatus(data){
        let status = data.map(bank => false);
        updateStatus(status);
    }


    function createComponents(data, status) {
        debugger
        let components = data.map((bank, i) => {
            return (
                <li className="bank-info" key={bank.id}>
                    <input type="checkbox" defaultChecked={status[i] ? status[i] : ''} onClick={e => changeStatus(i)} />
                    <BankInfo bank={bank} />
                </li>
            )

        })
        updateComponents(components);
    }

    function changeStatus(i) {
        let newStatus = [...checkStatus];
        newStatus[i] = !checkStatus[i];
        updateStatus(newStatus);
    }

    function toggleAllChecks() {
        let newStatus = [...checkStatus].map(status => !allChecked);
        newStatus = updateStatus(newStatus);
        toggleAll(!allChecked);
        createComponents(data, newStatus);
    }


    return (
        <div className="banks">
            <ul className="table">
                <li className="list-headers" key={"list-header"}>
                    <input type="checkbox" defaultChecked={allChecked ? allChecked : ''} onClick={e => toggleAllChecks()}/>
                    <span>Creditor</span>
                    <span>First Name</span>
                    <span>Last Name</span>
                    <span className="pay">Min Pay%</span>
                    <span className="balance">Balance</span>
                </li>
                {/* {checkStatus ? checkStatus.map((status, i) => <input type="checkbox" checked={status[i]} onClick={e => changeStatus(i)}/>) : ""} */}
                <ul>
                    {components}
                </ul>
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