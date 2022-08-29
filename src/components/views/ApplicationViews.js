import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "../auth/Login"
import { Register } from "../auth/Register"
import { Test } from "../test"
import { Authorized } from "./Authorized"

export const ApplicationViews = ({ token, setToken, setUserId, userId }) => {
  return <Routes>
    
    <Route path="/login" element={<Login setToken={setToken} setUserId={setUserId} />} />
    <Route path="/register" element={<Register setToken={setToken} setUserId={setUserId} />} />
    <Route element={<Authorized token={token}/>}>
      {/* Add Routes here */}
      <Route path="" element={<Test />} />
    </Route>
  </Routes>
}
