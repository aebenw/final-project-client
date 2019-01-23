import React,{ Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import { addFriend } from '../store/actions/users'
import { rmFriend } from '../store/actions/users'


import ProfilePic from './header/ProfilePic'
import Column from './header/Column'
import Title from './header/Title'
import FollowUnfollow from './header/FollowUnfollow'
import Edit from './buttons/Edit'

import { DEFAULT_PROFILE_PIC } from '../constants'


const header = ({ user, currentUser, addFriend, rmFriend, friendly }) => {
  let isFriend
  if (user.id !== currentUser.id){ isFriend = friendly() }
  return (
    <Fragment>
      <div className="container profile">
        <div style={{"position":"relative"}}>
          <div className="row">
            <Title content={user.name} />
            { user.id === currentUser.id ?
                  <Edit content={"profile"} />
            :
            <Fragment>
              { isFriend ?
              <FollowUnfollow method={() => rmFriend(currentUser.id, user.id)} content={'Remove Friend'}  /> :
              <FollowUnfollow method={() => addFriend(currentUser.id, user.id)} content={'Add Friend'} />
            }
          </Fragment>
          }
          </div>
        </div>
        <ProfilePic src={user.file ? user.file : DEFAULT_PROFILE_PIC}/>
        <div className="row">
            {user.description ?
            <Column title={"Bio"} content={user.description}/>
            :
            <Column title={"Bio"} content={'No Bio available'}/>
            }
        </div>
      </div>
    </Fragment>
  )

}


const friendly = (state, user) => {
  return state.find(x => x.id === user) ? true : false
}


const mapState= (state, ownProps) => {
  return {
    currentUser: state.users.currentUser,
    friendly: () => friendly(state.users.currentUser.friends, ownProps.history.location.state)
  }
}

const mapDispatch = (dispatch) => {
  return {
    addFriend: (currUser, user) => {
      return dispatch(addFriend(currUser, user))
    },
    rmFriend: (currUser, user) => {
      return dispatch(rmFriend(currUser, user))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(header))
