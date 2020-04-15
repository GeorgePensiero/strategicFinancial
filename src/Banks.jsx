import React, {Component} from 'react';
import BankInfo from './BankInfo';
import Modal from './modal';
import DebtForm from './DebtForm';
import './banks.css';

export default class Banks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            banks: null,
            checkStatus: [],
            allChecked: false,
            balance: 0,
            checkedRows: 0,
            show: false
        }
        this.setup = this.setup.bind(this);
    }

    setup(data){
        let status = [];
        this.setState({banks: data});
        if(!this.state.checkStatus.length){
            for(let i = 0; i < data.length; i++) {
                status.push(false);
            }
            this.setState({checkStatus: status});
        }
    }

    componentDidMount(){
        fetch("https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json")
            .then(res => res.json())
            .then(data => {
                this.setup(data);
                console.log(data);
            });
    }

    checkAll = async e => {
        let {allChecked, checkStatus} = this.state;
        let newStatus = [...checkStatus].map(status => !allChecked);
        let numRowsChecked = !allChecked ? checkStatus.length : 0;
        this.setState({checkStatus: newStatus, allChecked: !allChecked, checkedRows: numRowsChecked}, () => this.getBalance());
    }

    handleCheck = async (e) => {
        let {checkStatus, checkedRows} = this.state;
        //check whether to increment or decrement checkd rows
        let numChecks = e.target.checked ? 1 : -1;
        let newStatus = checkStatus.map((status, j) => {
            if(e.target.id === j.toString()) {
                return e.target.checked;
            } else {
                return status;
            }
        });
        this.setState({checkStatus: newStatus, checkedRows: checkedRows + numChecks}, () => this.getBalance());
    }

    getBalance = () => {
        let {checkStatus, banks} = this.state;
        let newBal = 0;
        for(let i = 0; i < checkStatus.length; i++){
            if(checkStatus[i]) newBal += banks[i].balance;
        }
        this.setState({balance: newBal});
    }

    removeDebt = () => {
        let {checkStatus, banks, checkedRows} = this.state;
        let newStatus = [...checkStatus];
        let newBanks = [...banks];
        let numRemoved = 0;
        let i = 0;
        while(i < newStatus.length) {
            if(newStatus[i]) {
                numRemoved++;
                newStatus = newStatus.slice(0, i).concat(newStatus.slice(i+1));
                newBanks = newBanks.slice(0, i).concat(newBanks.slice(i+1));
            } else {
                i++;
            }
        }
        this.setState({checkStatus: newStatus, banks: newBanks, checkedRows: checkedRows - numRemoved, balance: 0});
    }

    showModal = () => {
        this.setState({show: true});
    }

    addDebt = bank => {
        let banks = [...this.state.banks];
        let checkStatus = [...this.state.checkStatus];
        banks.push(bank);
        checkStatus.push(false);
        this.setState({banks: banks, show: false, checkStatus: checkStatus});
    }

    render(){
        let {allChecked, checkStatus, banks, balance, checkedRows, show} = this.state;
        return (
            <div className="banks">
                <ul className="table">
                    <li className="list-headers" key={"list-header"}>
                        <input type="checkbox" checked={allChecked ? allChecked : ''} onChange={this.checkAll} />
                        <span>Creditor</span>
                        <span>First Name</span>
                        <span>Last Name</span>
                        <span className="pay">Min Pay%</span>
                        <span className="balance">Balance</span>
                    </li>                    
                </ul>
                <ul className="bank-info">
                    {banks ? banks.map((bank, i) => <BankInfo handleCheck={this.handleCheck} bank={bank} idx={i} status={checkStatus[i]}/>) : ""}
                </ul>
                <Modal show={show}>
                    <DebtForm addDebt={this.addDebt} />
                </Modal>
                <div>
                    <button onClick={this.showModal}>Add Debt</button>
                    <button onClick={this.removeDebt}>Remove Debt</button>
                </div>
                <div className="total">
                    <p>Total</p>
                    {"$" + balance.toFixed(2).toLocaleString()}
                </div>
                <div className="row-counts">
                    <p>Total Row Count: {banks ? banks.length : ""}</p>
                    <p>Check Row Count: {checkedRows}</p>
                </div>
            </div>
        )
    }
}