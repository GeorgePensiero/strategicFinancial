import React from 'react';

export default class DebtForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            creditor: "",
            firstName: "",
            lastName: "",
            minPay: "",
            balance: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let {creditor, firstName, lastName, minPay, balance} = this.state;
        const bank = {creditorName: creditor, firstName: firstName, lastName: lastName, minPaymentPercentage: parseInt(minPay), balance: parseInt(balance)};
        this.props.addDebt(bank);
    }

    update(field) {
        return e => {
            this.setState({[field]: e.target.value});
        }
    }

    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <label className="label">Creditor: 
                    <input type="text" value={this.state.creditor} onChange={this.update('creditor')}/>
                </label>
                <label className="label">First Name: 
                    <input type="text" value={this.state.firstName} onChange={this.update('firstName')}/>
                </label>
                <label className="label">Last Name:
                    <input type="text" value={this.state.lastName} onChange={this.update('lastName')}/>
                </label>
                <label className="label">min pay%: 
                    <input type="text" value={this.state.minPay} onChange={this.update('minPay') }/>
                </label>
                <label className="label">Balance: 
                    <input type="text" value={this.state.balance} onChange={this.update('balance')}/>
                </label>
                <button className="submit-btn" onClick={this.handleSubmit}>Add</button>
            </form>
        )
    }
}