import React, {Fragment} from 'react'
import User from '../user/user'
import {TitleAuthor} from '../links/Author'


const BlockComment = ({action}) => {
  return(
    <Fragment>
      <div className="row">
        <div className="col-12-lg">
          <center>
            <TitleAuthor user={action.actor} />
            <h3> became friends with</h3>
          </center>
        </div>
      </div>
      {/* <div id="feed" className="row">
      {x.content.map(c => <User user={c} userShow={userShow}/>)}
      </div> */}
    </Fragment>
  )
}

export default BlockComment
