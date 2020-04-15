import React, {Component} from 'react';
import BankInfo from './BankInfo';

export default class Banks2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            banks: null,
            checkStatus: [],
            allChecked: false,
            balance: 0,
            checkedRows: 0
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

        for(let i = 0; i < checkStatus.length; i++) {
            if(checkStatus[i]) {
                newStatus = newStatus.slice(0, i).concat(newStatus.slice(i+1));
                newBanks = newBanks.slice(0, i).concat(newBanks.slice(i+1));
            }
        }

        this.setState({checkStatus: newStatus, banks: newBanks, checkedRows: checkedRows - 1});
    }

    render(){
        let {allChecked, checkStatus, banks, balance, checkedRows} = this.state;
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
                <div>
                    <button>Add Debt</button>
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