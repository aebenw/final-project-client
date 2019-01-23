import { URL, HEADERS } from '../../constants'

const contentAction = (content) => ({type: "INITIAL_FETCH", feed: content.feed, initial: content.initial})
const noFeed = (content) => ({type: "NO_FEED", content})

export const getContent = (id) => {
  return (dispatch) => {
    return fetch(URL + `feeds/${id}`, {
      method: "GET",
      headers: HEADERS,
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      } else{
        throw new Error()
      }
    })
    .then(res => {
      return dispatch(contentAction(res))
    })
    .catch(error => {
      let content = "No Friend Activity. hover over the `Subtle` icon in the top left corner, navigate to  `Find Friends` to add friends"
      return  dispatch(noFeed(content))
      })
  }
}
