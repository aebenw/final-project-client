import React, {Fragment} from 'react'
import { connect } from 'react-redux'
import User from '../user/user'
import {TitleAuthor} from '../links/Author'


const Friendship = ({action, userShow}) => {
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
      <div id="feed" className="row">
        <User user={action.objectt} />
      </div>
    </Fragment>
  )
}


export default Friendship
