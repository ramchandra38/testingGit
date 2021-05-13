import React from 'react';
import Table from './table.js';

// TableFilter
export default class TableFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            toggleFilter: false,
            conditions: [],
            logicalOperator: 'AND',
            dummyData: []
        }

    }

    // handleClick
    handleClick() {

        var items = this.state.items;
        items.push(this.state.message);
        this.setState({
            items: items,
            toggleFilter: true
        });
    }

    // handleItemChanged
    handleItemChanged(i, event) {
        var conditions = this.state.conditions;
        var element = {};
        if (event.target.name == 'id') {
            element.id = event.target.value;
            element.operator = '';
            element.value = '';
        }
        if ((event.target.name == 'operator')) {
            element.id = '';
            element.operator = event.target.value;
            element.value = '';
        }
        if ((event.target.name == 'value')) {
            element.id = '';
            element.operator = '';
            element.value = event.target.value;
        }
        conditions.push(element)
        this.setState({
            conditions: conditions,
            toggleFilter: true
        });
        console.log('this.sateFromTbalefilterAfterFilterapply', this.state)
    }

    // handleLogicOperator
    handleLogicOperator(i, event) {
        this.state.logicalOperator = event.target.value;
    }

    // handleItemDeleted
    handleItemDeleted(i) {
        var items = this.state.items;
        items.splice(i, 1);
        this.setState({
            items: items
        });
    }

    // handleCallback
    handleCallback = (childData) => {
        this.setState({ dummyData: childData })
    }

    // renderRows
    renderRows() {
        var context = this;
        var greaterEqual = '>=';
        var lessEqual = '<=';
        return this.state.items.map(function (data, i) {
            return (
                <tr key={"item-" + i}>
                    {i == 0 &&
                        <td>
                            Where
                    </td>
                    }
                    {i >= 1 &&
                        <td>
                            <select name="logicalOperator" id="logicalOperator" onChange={context.handleLogicOperator.bind(context, i)}>
                                <option value="AND">AND</option>
                                <option value="OR">OR</option>
                            </select>
                        </td>
                    }
                    <td>
                        <select name="id" id="id" onChange={context.handleItemChanged.bind(context, i)}>
                            <option value="name">Name</option>
                            <option value="screen_name">Screen Name</option>
                            <option value="followers_count">Followers Count</option>
                            <option value="following_count">Following Count</option>
                            <option value="location">Location</option>
                            <option value="verified">Verified</option>
                        </select>
                    </td>
                    <td>
                        <select name="operator" id="operator" onChange={context.handleItemChanged.bind(context, i)}>
                            <option value=">=">{greaterEqual}</option>
                            <option value="<=">{lessEqual}</option>
                            <option value="Contains">Contains</option>
                            <option value="Equals">Equals</option>
                        </select>
                    </td>
                    <td>
                        <input
                            type="text"
                            name='value'
                            id="value"
                            onChange={context.handleItemChanged.bind(context, i)}
                        />
                    </td>
                    <td>
                        <button className="addfilterBtn"
                            onClick={context.handleItemDeleted.bind(context, i)}
                        >
                            &nbsp;&nbsp;  <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            );
        });
    }

    // render
    render() {
        return (
            <div className="container mt-4">
                <h6>FILTERS</h6>
                {this.state.toggleFilter &&
                    <table className="table text-left tableBorder">
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                }
                <button className="addfilterBtn"
                    onClick={this.handleClick.bind(this)}
                >
                    <i className="fa fa-plus"></i>&nbsp;&nbsp; Add Filter
        </button>
                <Table dataParentToChild={this.state} />
            </div>
        );
    }
}