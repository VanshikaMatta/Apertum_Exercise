import React from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import './styles/App.css';
import Login from './components/Login';
import Users from './components/Users'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountId: '',
      token: '',
      message: '',
      users: []
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          User App
        </header>
        <Switch>
          <Route exact path="/" component={() => (<Login handleLogin={this.handleLogin} />)} />
          <Route exact path="/Users" component={() => (<Users token={this.state.token} accountId={this.state.accountId} goToLoginpage={this.goToLoginpage} />)} />
          <Route component={() => (<Login handleLogin={this.handleLogin} />)} />
        </Switch>
      </div>
    );
  }

  goToLoginpage = () => {
    this.props.history.push("/");
  }

  goToUsersPage = () => {
    this.props.history.push("/users");
  }



  handleLogin = (accountId, token) => {
    // this.setState(accountId, token);
    this.setState({ accountId, token });
    this.goToUsersPage();
  }

}

export default withRouter(App);
