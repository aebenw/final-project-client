export default function feedReducer(state={}, action){
  switch(action.type){
    case "FETCH_CONTENT":

    // let updatedFeed = [...state.onDisplay, ...action.feed]
    // debugger
    let updatedFeed = state.onDisplay ? [...state.onDisplay, ...action.feed] : action.feed
    return {...state, onDisplay: updatedFeed, noFeed: null, noMoreContent: null}

    case "NO_MORE_CONTENT":
    return {...state,  noMoreContent: action.content}

    case "NO_FEED":
    return {...state, onDisplay: null, noFeed: action.content}

    case "CLEAR_FEED":
    return {...state, onDisplay: null, noMoreContent: null, noFeed: null}


    default:
    return state
  }



}
