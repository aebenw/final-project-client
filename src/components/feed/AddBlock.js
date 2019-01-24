import React, {Fragment} from 'react'
import User from '../user/user'
import {TitleAuthor} from '../links/Author'
import BlockContainer from '../../containers/BlockContainer'
import ChannelContainer from '../../containers/ChannelContainer'



const AddBlock = ({action}) => {
  // debugger
  return(
    <Fragment>
      <div className="row">
        <div className="col-12-lg">
          <center>
            <TitleAuthor user={action.actor} />
            <h3> added a block</h3>
          </center>
        </div>
      </div>
      <BlockContainer blocks={[action.subjectt]} />
      <ChannelContainer channels={[action.objectt]} />
    </Fragment>
  )
}

export default AddBlock
