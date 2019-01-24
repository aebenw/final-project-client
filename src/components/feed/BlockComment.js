import React, {Fragment} from 'react'
import User from '../user/user'
import {TitleAuthor} from '../links/Author'
import BlockContainer from '../../containers/BlockContainer'
import CommentContainer from '../../containers/CommentContainer'



const BlockComment = ({action}) => {
  // debugger
  return(
    <Fragment>
      <div className="row">
        <div className="col-12-lg">
          <center>
            <TitleAuthor user={action.actor} />
            <h3> commented on </h3>
            {/* <blockquote cite={action.actor.name}>{action.subjectt.content}</blockquote> */}
          </center>
        </div>
      </div>
      <BlockContainer blocks={[action.subjectt.block]}/>
    </Fragment>
  )
}

export default BlockComment
