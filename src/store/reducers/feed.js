export default function feedReducer(state={}, action){
  switch(action.type){
    case "INITIAL_FETCH":
    return {...state, allContent: action.feed, onDisplay: action.initial, noFeed: null}

    case "ON_DISPLAY":
    return {...state, allContent: action.content, onDisplay: action.content, noFeed: null}

    case "NO_FEED":
    return {...state, feedContent: null, noFeed: action.content}


    default:
    return state
  }



}
