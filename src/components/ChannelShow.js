import React, {Component, Fragment} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

import By from './user/by'

import BlockContainer from '../containers/BlockContainer'
import {fetchUserInfo} from '../store/actions/users'



const ChannelShow = (props) => {
    const {currentChannel, userShow} = props
    console.log(currentChannel)
    return(
      <Fragment>
      {currentChannel ?
      <Fragment>
      <h1>{currentChannel.name}</h1>
      <h3>Made by: </h3>{currentChannel.authors.map(author => <By key={author.id} user={author} userShow={userShow}/>)}

      {currentChannel.blocks ?
      <BlockContainer blocks={currentChannel.blocks}/>
      : null
      }
      { currentChannel.private ? null
      :
      <Link to={`/blocks/new`}>
        <h2>+++++</h2>
      </Link>
    }
    </Fragment>
    : <div className="spinner"></div>
    }
  </Fragment>
    )
}

const mapStateToProps = (state) => {
  return { currentChannel: state.channels.currentChannel }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userShow: (user) => {
      return dispatch(fetchUserInfo(user))
    }
  }
}

export default withRouter (connect(mapStateToProps, mapDispatchToProps)(ChannelShow))
