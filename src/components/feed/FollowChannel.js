import React, {Fragment} from 'react'
import User from '../user/user'
import {TitleAuthor} from '../links/Author';
import ChannelContainer from '../../containers/ChannelContainer';



const FollowChannel = ({action}) => {
  return(
    <Fragment>
      <div className="row">
        <div className="col-12-lg">
          <center>
            <TitleAuthor user={action.actor} />
            <h3> Started following</h3>
          </center>
        </div>
      </div>
      <ChannelContainer channels={[action.subjectt]} />
    </Fragment>
  )
}

export default FollowChannel
