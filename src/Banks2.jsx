import React, {Component} from 'react';
import Checkbox from './Checkbox';

export default class Banks2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            banks: null,
            checkStatus: [],
            allChecked: false,
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

    checkAll = e => {
        let {allChecked, checkStatus} = this.state;
        let newStatus = [...checkStatus].map(status => !allChecked);
        debugger
        this.setState({checkStatus: newStatus, allChecked: !allChecked});
    }

    handleCheck = e => {
        debugger
        const checkId = e.target.id;
        const isChecked = e.target.isChecked;
        let newState = [...this.state.checkStatus].map((status, i) => i === checkId ? !status : status);
        this.setState(prevState => ({checkStatus: newState}));
    }

    render(){
        let {allChecked, checkStatus} = this.state;
        return (
            <div className="banks">
                <ul className="table">
                    <li className="list-headers" key={"list-header"}>
                        {/* <input type="checkbox" checked={allChecked ? allChecked : ''} onClick={this.checkAll} /> */}
                        <span>Creditor</span>
                        <span>First Name</span>
                        <span>Last Name</span>
                        <span className="pay">Min Pay%</span>
                        <span className="balance">Balance</span>
                    </li>
                    {/* {checkStatus ? checkStatus.map((status, i) => <input type="checkbox" checked={status[i]} onClick={e => changeStatus(i)}/>) : ""} */}
                    <ul>
                        {checkStatus.map((status, i) => {
                            return (<input type="checkbox" onClick={this.handleCheck} checked={status} />)
                        })}
                    </ul>
                </ul>
                <div className="total">
                    <p>Total</p>
                    {/* {"$" + totalBalance.toFixed(2).toLocaleString()} */}
                </div>
                <div className="row-counts">
                    {/* {rowCt} */}
                    {/* {checkedRowCt} */}
                </div>
            </div>
        )
    }
}