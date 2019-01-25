import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import {logOutUser} from '../../store/actions/users'

class LoggedInNav extends Component {

  state = {}



  delteJWT = () => {
    const {history, logOutUser, currentUserID, onDisplay} = this.props
    localStorage.removeItem("jwt")
    const seenActivitiesIDS = onDisplay.map(activity => {
      return activity.id
    })
    const body = {
      user: {
        id: currentUserID,
        seen_activities: seenActivitiesIDS
      }
    }
    logOutUser(body).then(history.push('/'))

  }

  render(){
    return(
        <div className="logged-in">
        <ul className="heading">
        <li>
          <NavLink className="button head-button" exact to="/home">
          Subtle
          </NavLink>

          <ul className="dropdown">
          <li>
          <NavLink className="button head-button" style={{"borderTopWidth": "1px"}} exact to="/home">
            Home
          </NavLink>
          </li>
          <li>
          <NavLink className="button head-button" exact to="/profile">
            Profile
          </NavLink>
          </li>
          <li>
          <NavLink className="button head-button" exact to="/friends">
            Friends
          </NavLink>
          </li>
          <li>
          <NavLink className="button head-button" exact to="/explore/people">
            Find Friends
          </NavLink>
          </li>
          </ul>

          </li>
        </ul>

        <button className="button logout" onClick={() => this.delteJWT()}>
          Log Out
        </button>
        </div>
    )
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    logOutUser: (body) => {
      return dispatch(logOutUser(body))
    }
  }
}

const mapStateToProps = (state) => {
  return{
    onDisplay: state.feed.onDisplay,
    currentUserID: state.users.currentUser.id,
  }
}



export default withRouter (connect(mapStateToProps, mapDispatchToProps)(LoggedInNav))
