import { useState } from "react"
import { NavBar } from "./nav/NavBar"
import { ApplicationViews } from "./views/ApplicationViews"

export const MeetMe = () => {
  const [token, setTokenState] = useState(localStorage.getItem('mm_token'))
  const [userId, setUserIdState] = useState(localStorage.getItem('mm_id'))

  const setToken = (newToken) => {
    localStorage.setItem('mm_token', newToken)
    setTokenState(newToken)
  }

  const setUserId = (userId) => {
    localStorage.setItem('mm_id', userId)
    setUserIdState(userId)
  }



  return <>
    <NavBar token={token} setToken={setToken} />
    <ApplicationViews token={token} setToken={setToken} setUserId={setUserId} userId={userId}/>
  </>
}
