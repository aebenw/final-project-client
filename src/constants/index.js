export const token = localStorage.getItem("jwt");

//API URL for Production
// export const SHORT_URL = "murmuring-oasis-50773.herokuapp.com"

//API URL for Local
export const SHORT_URL = "8eb4916a.ngrok.io"

export const URL = "https://" + SHORT_URL + "/api/v1/"
export const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json"
}

export const DEFAULT_PROFILE_PIC = "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.freepik.com%2Ffree-icon%2Fuser-image-with-black-background_318-34564.jpg&f=1"
