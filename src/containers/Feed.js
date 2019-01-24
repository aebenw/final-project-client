import React,{Fragment, Component} from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import {getContent} from '../store/actions/feed'

//Components

import FeedContent from '../components/feed/FeedContent'
import Spinner from '../components/Spinner'

//ACTIONS
import { moreContent } from '../store/actions/feed'


class Feed extends Component {


  componentDidMount() {
    const {onDisplay, currentUser, getContent} = this.props
    if(currentUser.email && !onDisplay){
      return getContent(currentUser.id)
    }
    window.addEventListener("scroll", this.fetchMoreContent);
  }

  componentDidUpdate(prevProps){
    const {currentUser, getContent} = this.props;
    if (!prevProps.currentUser.email && currentUser.email) {
      getContent(currentUser.id)
    }
  }

  fetchMoreContent = () => {
    const {onDisplay, moreContent} = this.props
    if(onDisplay){
      let tenPercent = document.body.scrollHeight -(document.body.scrollHeight * .1);

      if(window.pageYOffset + window.screen.height > tenPercent){
        this.props.moreContent();
    }
    }

  }

  render(){
    const { onDisplay, noFeed } = this.props
    return (
      <Fragment >
        <div id="home-feed" className="row" onScroll={() => this.fetchMoreContent()}>
          <div className="col-lg-12" style={{"width": "100%"}}>
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
    moreContent: () => dispatch(moreContent())

    // getMoreContent: (id) => {
    //   return dispatch(getMoreContent())
    // }
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
