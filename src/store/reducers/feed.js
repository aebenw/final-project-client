export default function feedReducer(state={}, action){
  switch(action.type){
    case "INITIAL_FETCH":
    return {...state, allContent: action.feed, onDisplay: action.initial, noFeed: null}

    case "MORE_CONTENT":
    
    let contentCopy = [...state.allContent]
    let moreContent = contentCopy.splice(-10)
    let updatedFeed = [...state.onDisplay, ...moreContent]
    return {...state, allContent: contentCopy, onDisplay: updatedFeed, noFeed: null}

    case "NO_FEED":
    return {...state, feedContent: null, noFeed: action.content}


    default:
    return state
  }



}
