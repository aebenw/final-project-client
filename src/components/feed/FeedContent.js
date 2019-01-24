import React, { Fragment } from "react";
import { connect } from 'react-redux';

import Friendship from './Friendship'
import AddBlock from './AddBlock'
import BlockComment from './BlockComment'
import CreateChannel from './CreateChannel'
import FollowChannel from './FollowChannel'

const FeedContent = ({content}) => {
  return(
    <Fragment>
      {content.map(action => {
        switch(action.name){
          case'FOLLOW_CHANNEL':
          return <FollowChannel action={action} />

          case 'FRIENDSHIP':
          return <Friendship action={action} />

          case 'ADD_BLOCK_TO_OWN_CHANNEL':
          return <AddBlock action={action} />

          case "ADD_OTHER_BLOCK_TO_CHANNEL":
          return <AddBlock action={action} />

          case "ADD_BLOCK_TO_OTHER_CHANNEL":
          return <AddBlock action={action} />

          case "FOLLOW_CHANNEL":
          return <FollowChannel action={action} />

          case "BLOCK_COMMENT":
          return <BlockComment action={action} />

          case 'CREATE_CHANNEL':
          return <CreateChannel action={action} />

          default:
          return null
          }
        })
      }
    </Fragment>
  )
}


  // sortContent = () => {
  //   const { content, userShow } = this.props
  //   return content.feed.map(x => {
  //     if (x.type === "friends" && x.content.length){
  //       return (
  //         <Fragment>
  //         <div className="row">
  //           <div className="col-12-lg">
  //         <center>
  //           <TitleAuthor user={x.user} />
  //         <h3> became friends with</h3></center>
  //         </div>
  //         </div>
  //         <div id="feed" className="row">
  //         {x.content.map(c => <User user={c} userShow={userShow}/>)}
  //         </div>
  //         </Fragment>
  //       )
//
//       }
//       else if (x.type === "followed_channels" && x.content.length){
//         return (
//           <Fragment>
//           <div className="row">
//             <div className="col-12-lg">
//           <center>
//             <TitleAuthor user={x.user} />
//             <h3> started following these channels</h3>
//           </center>
//           </div>
//           </div>
//
//           <ChannelContainer channels={x.content}/>
//
//           </Fragment>
//         )
//
//       }
//       else if(x.type === "blocks" && x.content.length){
//         return (
//           <Fragment>
//           <div className="row">
//             <div className="col-12-lg">
//           <center>
//           <TitleAuthor user={x.user} />
//           <h3>made blocks</h3>
//         </center>
//           </div>
//           </div>
//           <BlockContainer blocks={x.content}/>
//           </Fragment>
//         )
//
//       } else if (x.type === "channels" && x.content.length){
//         return (
//           <Fragment>
//           <div className="row">
//             <div className="col-12-lg">
//           <center><Link to={{pathname: `/users/${x.user.id}`, state: x.user.id}}>
//           <h3 onClick={() => userShow(x.user.id)}>{x.user.name}</h3>
//           </Link>
//           <h3> made channels</h3>
//         </center>
//           </div>
//           </div>
//
//           <ChannelContainer channels={x.content}/>
//
//           </Fragment>
//         )}
//       })
//   }
//
//
//
//   render(){
//     const { onDisplay, noFeed } = this.props
//     return (
//       <Fragment >
//         <div id="home-feed" className="row">
//           <div className="col-lg-10">
//             {onDisplay ?
//               <Fragment>
//                 {this.displayContent()}
//               </Fragment>
//                 : null
//             }
//             {noFeed ?
//               <Fragment>
//                 <div className="row">
//                   <div className="col-12-lg">
//                     <center><h3>{noFeed}</h3></center>
//                   </div>
//                 </div>
//               </Fragment>
//               : null
//             }
//
//             {!noFeed && !content ? <Spinner/>
//               : null }
//             </div>
//           </div>
//         </Fragment>
//     )
//   }
//
// }
//
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     getContent: (id) => {
//       return dispatch(getContent(id))
//     },
//     channelShow: (channel) => {
//       return dispatch(showChannel(channel))
//     },
//     userShow: (user) => {
//       return dispatch(fetchUserInfo(user))
//     },
//     blockShow: (block) => {
//     return dispatch(selectBlock(block))
//     }
//   }
// }
//
// const mapStateToProps = (state) => {
//   return {
//     currentUser: state.users.currentUser,
//     onDisplay: state.feed.onDisplay,
//     noFeed: state.feed.noFeed
//   }
// }

export default connect()(FeedContent)
