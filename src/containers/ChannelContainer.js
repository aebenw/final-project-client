import React,{Fragment} from 'react';
import { connect } from 'react-redux'

//Components
import Channel from '../components/channel/channel'


//ACTIONS
import { fetchChannel } from '../store/actions/channels'
import {fetchUserInfo} from '../store/actions/users'


const ChannelContainer = props => {
  return(
    <Fragment>

    <div id="feed" className="row">
    {props.channels ?
      <Fragment>
    {props.channels.map(channel => <Channel key={channel.id} userShow={props.userShow} channel={channel} channelShow={props.channelShow}/>)}
    </Fragment>
    : <h4>No Channels</h4>
    }
    </div>
    </Fragment>
  )
}


// IF USER IS ONE OF THE AUTHORS OF CHANNEL THEN RENDER ++ BUTTON
const mapDispatchToProps = (dispatch) => {
  return {
    channelShow: (channel) => {
    return dispatch(fetchChannel(channel))
  },
    userShow: (user) => {
      return dispatch(fetchUserInfo(user))
    }
  }
}

export default connect(null, mapDispatchToProps)(ChannelContainer);
