import React,{Fragment, Component} from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import {getContent} from '../store/actions/feed'

//Components
import User from '../components/user/user'
import {TitleAuthor} from '../components/links/Author'
import FeedContent from '../components/feed/FeedContent'
import Spinner from '../components/Spinner'

//Containers
import BlockContainer from './BlockContainer'
import ChannelContainer from './ChannelContainer'

//ACTIONS
import { selectBlock } from '../store/actions/blocks'
import { showChannel } from '../store/actions/channels'
import {fetchUserInfo} from '../store/actions/users'


class Feed extends Component {


  componentDidMount() {
    if(this.props.currentUser.email){
      const {currentUser, getContent} = this.props;
      return getContent(currentUser.id)
    }
  }

  componentDidUpdate(prevProps){
    const {currentUser, getContent} = this.props;
    if (!prevProps.currentUser.email && currentUser.email) {
      getContent(currentUser.id)
    }
  }

  sortContent = () => {
    const { content, userShow } = this.props
    return content.feed.map(x => {
      if (x.type === "friends" && x.content.length){
        return (
          <Fragment>
          <div className="row">
            <div className="col-12-lg">
          <center>
            <TitleAuthor user={x.user} />
          <h3> became friends with</h3></center>
          </div>
          </div>
          <div id="feed" className="row">
          {x.content.map(c => <User user={c} userShow={userShow}/>)}
          </div>
          </Fragment>
        )

      }
      else if (x.type === "followed_channels" && x.content.length){
        return (
          <Fragment>
          <div className="row">
            <div className="col-12-lg">
          <center>
            <TitleAuthor user={x.user} />
            <h3> started following these channels</h3>
          </center>
          </div>
          </div>

          <ChannelContainer channels={x.content}/>

          </Fragment>
        )

      }
      else if(x.type === "blocks" && x.content.length){
        return (
          <Fragment>
          <div className="row">
            <div className="col-12-lg">
          <center>
          <TitleAuthor user={x.user} />
          <h3>made blocks</h3>
        </center>
          </div>
          </div>
          <BlockContainer blocks={x.content}/>
          </Fragment>
        )

      } else if (x.type === "channels" && x.content.length){
        return (
          <Fragment>
          <div className="row">
            <div className="col-12-lg">
          <center><Link to={{pathname: `/users/${x.user.id}`, state: x.user.id}}>
          <h3 onClick={() => userShow(x.user.id)}>{x.user.name}</h3>
          </Link>
          <h3> made channels</h3>
        </center>
          </div>
          </div>

          <ChannelContainer channels={x.content}/>

          </Fragment>
        )}
      })
  }



  render(){
    const { onDisplay, noFeed } = this.props
    return (
      <Fragment >
        <div id="home-feed" className="row">
          <div className="col-lg-10">
            {onDisplay ?
              <FeedContent content={onDisplay} />
                : null
            }
            {noFeed ?
              <Fragment>
                <div className="row">
                  <div className="col-12-lg">
                    <center><h3>{noFeed}</h3></center>
                  </div>
                </div>
              </Fragment>
              : null
            }

            {!noFeed && !onDisplay ? <Spinner/>
              : null }
            </div>
          </div>
        </Fragment>
    )
  }

}


const mapDispatchToProps = (dispatch) => {
  return {
    getContent: (id) => {
      return dispatch(getContent(id))
    },
    channelShow: (channel) => {
      return dispatch(showChannel(channel))
    },
    userShow: (user) => {
      return dispatch(fetchUserInfo(user))
    },
    blockShow: (block) => {
    return dispatch(selectBlock(block))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    onDisplay: state.feed.onDisplay,
    noFeed: state.feed.noFeed
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Feed))
