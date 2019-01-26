import React,{Fragment, Component} from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {getContent} from '../store/actions/feed'
import _ from 'lodash'

//Components

import FeedContent from '../components/feed/FeedContent'
import Spinner from '../components/Spinner'

//ACTIONS
import { moreContent } from '../store/actions/feed'


class Feed extends Component {

  constructor(){
    super()
      this.debounceScrollFuntion = _.debounce(this.fetchMoreContent, 220)
  }
  componentDidMount() {
    const {onDisplay, currentUser, getContent} = this.props
    if(currentUser.email && !onDisplay){
      window.addEventListener("scroll", this.debounceScrollFuntion)
      return getContent(currentUser.id)
    }
  }

  componentDidUpdate(prevProps){
    const {currentUser, getContent} = this.props;
    if (!prevProps.currentUser.email && currentUser.email) {
      getContent(currentUser.id)
      window.addEventListener("scroll", this.debounceScrollFuntion)
    }
  }


  fetchMoreContent = () => {
    const {onDisplay, getContent, currentUser} = this.props
      let tenPercent = document.body.scrollHeight -(document.body.scrollHeight * .1);

      if(window.pageYOffset + window.screen.height > tenPercent){
        getContent(currentUser.id)

    }
  }
  componentWillUnmount(){
    window.removeEventListener('scroll', this.debounceScrollFuntion)
  }

  render(){
    const { onDisplay, noMoreContent } = this.props
    return (
      <Fragment >
        <div id="home-feed" className="row" onScroll={() => _.debounce(this.fetchMoreContent, 500)}>
          <div className="col-lg-12" style={{"width": "100%"}}>
            {onDisplay ?
              <FeedContent content={onDisplay} />
                : null
            }
            {noMoreContent ?
                <div className="row">
                  <div className="col-12-lg">
                    <center><h3>{noMoreContent}</h3></center>
                  </div>
                </div>
              : null
            }
            {/* {noFeed ?
                <div className="row">
                  <div className="col-12-lg">
                    <center><h3>{noFeed}</h3></center>
                  </div>
                </div>
              : null
            } */}

            {!noMoreContent && !onDisplay ? <Spinner/>
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
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    onDisplay: state.feed.onDisplay,
    noFeed: state.feed.noFeed,
    noMoreContent: state.feed.noMoreContent
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Feed))
