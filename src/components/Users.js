import React from 'react';
import UserCard from './UserCard';
import '../styles/Users.css';
import Filter from './Filter'
class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: '',
            users: [],
            filteredUsers: [],
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

    componentDidMount() {
        if (this.props.token.trim() === '') {
            this.props.goToLoginpage();
        }
        else {
            this.getUsers();
        }
    }

    render() {
        return (
            <React.Fragment>
                <Filter handleSearch={this.handleSearch} />
                <div className="container">
                    <div className="row">
                        {
                            this.state.filteredUsers.map((user, index) => {
                                return <UserCard user={user} key={index} />
                            })
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }

    handleChange = (event) => {
        console.info(event);
        this.setState({
            [event.target.name]: event.target.value,
            message: '',
        });
    }
    handleSearch = (matchPar, condition, value1, value2) => {
        // this.setState({
        //     matchPar, condition, value1, value2
        // })
        console.log(this.state.matchPars[matchPar]);
        console.log(this.state.conditions[condition]);
        console.log(value1);
        console.log(value2);
        var userData = Object.assign([], this.state.users);
        var filteredUsers = [];
        if (value1.trim() !== '') {
            if (condition === 1 && value2.trim() === '') {
                filteredUsers = userData;
            }
            else {
                switch (parseInt(matchPar)) {
                    case 0:
                        userData.map((user) => {
                            if (filterSearch(user.age, value1, value2, condition)) {
                                return filteredUsers.push(user);
                            }
                        })
                        break;
                    case 1:
                        userData.map((user) => {
                            if (filterSearch(user.firstName.length, value1, value2, condition)) {
                                return filteredUsers.push(user);
                            }
                        })
                        break;
                    case 2:
                        userData.map((user) => {
                            if (filterSearch(user.lastName.length, value1, value2, condition)) {
                                return filteredUsers.push(user);
                            }
                        })
                        break;
                }
            }
        }
        else {
            filteredUsers = userData;
        }
        console.log(filteredUsers);
        this.setState({
            filteredUsers
        })
    }



    getUsers = () => {
        console.log(this.props.token);
        const token = this.props.token;
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        };

        fetch('https://apertum-interview.herokuapp.com/api/users', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({
                    users: data,
                    filteredUsers: data
                })
            })
            .catch(error => {
                console.error('There was an error!', error);
            })
    };
}

const filterSearch = (searchValue, matchvalue1, matchvalue2, condition) => {
    switch (parseInt(condition)) {
        case 0:
            if (parseInt(searchValue) === parseInt(matchvalue1)) { return true; }
            break;
        case 1:
            if (parseInt(searchValue) >= parseInt(matchvalue1) && parseInt(searchValue) <= parseInt(matchvalue2)) { return true; }
            break;
        case 2:
            if (parseInt(searchValue) < parseInt(matchvalue1)) { return true; }
            break;
        case 3:
            if (parseInt(searchValue) > parseInt(matchvalue1)) { return true; }
            break;
    }
    return false;
}

export default Users;
