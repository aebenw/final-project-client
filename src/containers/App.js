import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom'
import LoggedOutNav from '../components/LoggedOutNav'
import LoggedInNav from '../components/LoggedInNav'
import Welcome from './Welcome'
import Feed from './Feed'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import Profile from '../containers/Profile'
import Event from '../containers/Event'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


import { token } from '../constants'
import { fetchWithToken } from '../store/actions/users'


class App extends Component {

  componentDidMount(){
    if (token && !this.props.currentUser.name && (this.props.history.location.pathname !== '/')) {
      this.props.fetchWithToken(token)
      .then(() => this.props.history.push(this.props.history.location.pathname))
    } else if (token && !this.props.currentUser.name ) {
      this.props.fetchWithToken(token)
      .then(() => this.props.history.push('/home'))
    }
    else if (this.props.currentUser.email) {
      this.props.history.push('/home')
    } else {
      this.props.history.push('/')
    }
  }

  render() {
    const { currentUser } = this.props
    return (
      <Fragment>
        <Fragment>
          {currentUser.email ?
            <LoggedInNav currentUser={currentUser}/>
          : <LoggedOutNav />}
          <Route exact path='/' render={routerProps => <Welcome {...routerProps}/>} />
          <Route exact path='/signup' render={routerProps => <SignUp {...routerProps}/>} />
          <Route exact path='/login' render={routerProps => <Login {...routerProps}/>} />
          <Route exact path='/home' render={routerProps => <Feed {...routerProps}/>} />
          {/* // TODO: MAKE IT SO "/profle" IS SOMETHING MORE PERSONAL */}
          <Route exact path='/event' render={routerProps => <Event {...routerProps}/>} />
          <Route exact path='/profile' render={routerProps => <Profile {...routerProps}/>} />
        </Fragment>


        </Fragment>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    setHistory: state.users.setHistory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWithToken: (token) => {
      return dispatch(fetchWithToken(token))
    }
  }
}

export default withRouter (connect(mapStateToProps, mapDispatchToProps)(App));


// {currentUser ? <Feed /> : <Home />}
