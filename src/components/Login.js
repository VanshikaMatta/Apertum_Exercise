import React from 'react';
import '../styles/App.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountId: '',
            pswd: '',
            message: '',
            loginVal: 'Log In'
        };
    }

    render() {
        return (
            <div className="wrapper" >
                <div id="formContent">
                    <div className="formHeader">
                        Login
                    </div>
                    {this.state.message !== '' ? (
                        < div className='errorMessage'>
                            {this.state.message} !!
                        </div>
                    ) : ''}
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" id="accountId" className="text" name="accountId" value={this.state.accountId}
                            placeholder="User Id" onChange={this.handleChange} />
                        <input type="password" id="password" className="text" name="pswd" value={this.state.pswd}
                            placeholder="password" onChange={this.handleChange} />
                        <input type="button" className="submit" value={this.state.loginVal} onClick={this.handleLogin} />
                    </form>
                </div>
            </div>
        );
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            message: '',
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.handleLogin();
    }
    handleLogin = () => {
        this.setState({ loginVal: 'Loging in....' })
        if (this.state.accountId.trim() === '' || this.state.pswd.trim() === '') {
            this.setState({
                loginVal: 'Log In',
                message: 'User ID and Password are required'
            })
        }
        else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ accountId: this.state.accountId, pswd: this.state.pswd })
            };

            fetch('https://apertum-interview.herokuapp.com/api/user/login', requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.error_message);
                    if (data.error_message === null || data.error_message === undefined) {
                        console.log(data.token);
                        var accountId = this.state.accountId;
                        this.setState({
                            accountId: '',
                            pswd: '',
                            loginVal: 'Log In',
                            message: ""
                        })
                        this.props.handleLogin(accountId, data.token);
                    }
                    else {
                        this.setState({
                            accountId: '',
                            pswd: '',
                            loginVal: 'Log In',
                            message: "User Id or Password are incorrect"
                        })
                    }
                })
                .catch(error => {
                    this.setState({
                        accountId: '',
                        pswd: '',
                        loginVal: 'Log In',
                        message: "User Id or Password are incorrect"
                    });
                    console.error('There was an error!', error);
                });
        }

    }

}

export default Login;
