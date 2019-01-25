import { URL, HEADERS } from '../../constants'

const contentAction = (content) => ({type: "FETCH_CONTENT", feed: content.feed})
const noFeed = (content) => ({type: "NO_FEED", content})
const noMoreContent = (content) => ({type: "NO_MORE_CONTENT", content})
export const moreContent = () => ({type: "MORE_CONTENT"})


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
      if(res.noMoreContent){
        return dispatch(noMoreContent(res.noMoreContent))
      } else {
        return dispatch(contentAction(res))
      }
    })
    .catch(error => {
      let content = "No Friend Activity. hover over the `Subtle` icon in the top left corner, navigate to  `Find Friends` to add friends"
      return  dispatch(noFeed(content))
      })
  }
}
