import React from 'react';
import '../styles/Filter.css';

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matchPar: 0,
            condition: 0,
            value1: '',
            value2: '',
            matchPars: [
                'Age',
                'First Name Length',
                'Last Name Length'
            ],
            conditions: [
                'equal',
                'between',
                'less than',
                'more than'
            ]
        };
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6" id="cardContent">
                        <table className="cardBody">
                            <tbody>
                                <tr>
                                    <td className="filterText">
                                        <select name="matchPar" value={this.state.matchPar} onChange={this.handleChange} className="filterText">
                                            {
                                                this.state.matchPars.map((matchpar, index) => {
                                                    return <option value={index} key={index}>{matchpar}</option>
                                                })
                                            }
                                        </select>
                                    </td>
                                    <td className="filterText">
                                        <select name="condition" value={this.state.condition} onChange={this.handleChange} className="filterText">
                                            {
                                                this.state.conditions.map((condition, index) => {
                                                    return <option value={index} key={index}>{condition}</option>
                                                })
                                            }
                                        </select>
                                    </td>
                                    <td className="filterText">
                                        <input type='text' name="value1" value={this.state.value1} onChange={this.handleChange} className="filterText"></input>
                                    </td>
                                    {
                                        this.state.condition === '1' ? (
                                            <React.Fragment>
                                                <td> and </td>
                                                <td className="filterText">
                                                    <input type='text' name="value2" value={this.state.value2} onChange={this.handleChange} className="filterText"></input>
                                                </td>
                                            </React.Fragment>
                                        ) : (<td></td>)
                                    }
                                    <td className="search">
                                        <input type='button' value='Search' onClick={this.handleSearch} className="search" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSearch = () => {
        this.props.handleSearch(this.state.matchPar, this.state.condition, this.state.value1, this.state.value2);

    }
}

export default Filter;

