
import React, { Component } from 'react';

// Table
class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dummyData: [
                {
                    id: 1,
                    name: "Ramchandra Velip",
                    screen_name: "Ram",
                    followers_count: 115,
                    following_count: 17,
                    location: "Canacona Goa",
                    verified: false
                },
                {
                    id: 2,
                    name: "Raj velip",
                    screen_name: "Raj",
                    followers_count: 35,
                    following_count: 37,
                    location: "Ponda Goa",
                    verified: false
                },
                {
                    id: 3,
                    name: "Chandra Velip",
                    screen_name: "Chandra",
                    followers_count: 675,
                    following_count: 9,
                    location: "Panaji",
                    verified: false
                },
                {
                    id: 4,
                    name: "Ramu Velip",
                    screen_name: "Rama",
                    followers_count: 235,
                    following_count: 20,
                    location: "Margao",
                    verified: false
                }
            ],
            data: this.props.dataParentToChild.conditions,
            filter1: this.props.dataParentToChild.toggleFilter,
        };
        console.log('TableStateAfterupdated', this.state);
    }

    // componentDidMount
    componentDidMount() {
      //  alert('componentDidMount');
       // this.filterData();
    }


    // filterData
    filterData() {
        var filterConditionValue = this.state.data;
        const filterValue = this.state.dummyData.filter((item) => {
            return filterConditionValue.some((f) => {
                return item.following_count <= f.value;
            });
        });
       
            alert('FilterSelected')
            this.setState({
                dummyData: filterValue
            });
     //   }
      console.log('filterValue', filterValue)

    }
    // render HTML
    render() {
       // alert('render');
       if (this.state.filter1==true) {
           alert('FilterApplied')
        this.filterData();
       }
        return (
            <div className="container mt-4">
                <table className="table text-left tableBorder">
                    <thead>
                        <tr className="tableHeader">
                            <th>Name</th>
                            <th>Screen Name</th>
                            <th>Followers Count</th>
                            <th>Following Count</th>
                            <th>Location</th>
                            <th>Verified</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.dummyData.map((data, index) => {

                            return (
                                <tr key={index} className={index % 2 == 0 ? "oddRow" : "evenRow"}>
                                    <td>{data.name}</td>
                                    <td>{data.screen_name}</td>
                                    <td>{data.followers_count}</td>
                                    <td>{data.following_count}</td>
                                    <td>{data.location}</td>
                                    {data.verified == true &&
                                        <td><i className="fa fa-check"></i></td>
                                    }
                                    {data.verified != true &&
                                        <td><i className="fa fa-times"></i></td>
                                    }
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Table