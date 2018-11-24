import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'


import {lister} from '../functions'


import BlockContainer from '../containers/BlockContainer'
import {fetchUserInfo} from '../store/actions/users'
import {followChannel, unFollowChannel, deleteChannel, rmCurrChannel, fetchChannel} from '../store/actions/channels'



class ChannelShow extends Component {



  componentDidUpdate(prevProps){
    const { pathname } = this.props.history.location
    const { currentUserId, currentChannel } = this.props

    if (!prevProps.currentUserId && currentUserId && !currentChannel){

      let id = pathname.substr(pathname
        .lastIndexOf('/') + 1);
      id = parseInt(id)

      this.props.showChannel(id)
    }
  }

    delete = (channel) => {
      const { deleteChannel, history, rmCurrChannel } = this.props

      deleteChannel(channel)
      .then(() => history.goBack(),
      rmCurrChannel)
    }

    amFollowing = () => {
      const { currentChannel, currentUserId, followChannel, unFollowChannel } = this.props
       if (currentChannel.followers.find(x => x.id === currentUserId)){
        return(
          <div className="col-sm-offset-9">
          <button className="inverse" onClick={() => {unFollowChannel(currentUserId, currentChannel.id)}}>Unfollow Channel</button>
          </div>
        )
      } else {
        return (
          <div className="col-sm-offset-9">
          <button className="inverse" onClick={() => {followChannel(currentUserId, currentChannel.id)}}>Follow Channel</button>
          </div>
        )
      }

    }

    render(){

    const {currentChannel, userShow, isMine, history} = this.props
    return(
      <Fragment>
        {currentChannel ?
          <Fragment>
            <div className="container">
              <div className="row">
                <div className="col-5-sm">
                  <h3> Channel </h3>
                  <Link to={{pathname: `/users/${currentChannel.authors[0].id}`, state: currentChannel.authors[0].id}}>
                  <h4 onClick={() => userShow(currentChannel.authors[0].id)}>
                    {currentChannel.authors[0].name}
                  </h4>
                    </Link>
                  <h4>/{currentChannel.name}</h4>

                </div>
              </div>

              { currentChannel.followers ?
              <div className="row">
                <div className="col-5-sm">
                  {lister(currentChannel.followers, userShow)}
                </div>
              </div>

                : null
              }

            </div>
          {isMine() ?
            <div className="col-sm-offset-9">
            <button className="inverse" onClick={() => this.delete( currentChannel.id)}>Delete Channel</button>
                      </div>
          :
            this.amFollowing()
          }


            {currentChannel.blocks ?
              <BlockContainer blocks={currentChannel.blocks}/>
            : null
            }
            { isMine() || !currentChannel.private ? <Link to={`/blocks/new`}>
              <h2>+++++</h2>
            </Link>
            : null
            }
          </Fragment>
        : <center><div className="spinner tertiary"></div></center>
        }
      </Fragment>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    currentChannel: state.channels.currentChannel,
    currentUserId: state.users.currentUser.id,
    isMine: () => state.channels.currentChannel.authors.find(x => x.id === state.users.currentUser.id) ? true : false
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userShow: (user) => {
      return dispatch(fetchUserInfo(user))
    },
    followChannel: (user, channel) => {
      return dispatch(followChannel(user, channel))
    },
    unFollowChannel: (user, channel) => {
      return dispatch(unFollowChannel(user, channel))
    },
    deleteChannel: (channel) => {
      return dispatch(deleteChannel(channel))
    },
    rmCurrChannel: () =>
     dispatch(rmCurrChannel()),

    showChannel: (channel) =>
     dispatch(fetchChannel(channel))
  }
}


export default withRouter (connect(mapStateToProps, mapDispatchToProps)(ChannelShow))
