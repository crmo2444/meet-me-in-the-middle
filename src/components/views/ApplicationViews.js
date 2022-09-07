import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "../auth/Login"
import { Register } from "../auth/Register"
import { MapHome } from "../map/MapHome"
import { SavedAddressList } from "../savedAddresses/SavedAddresses"
import { SavedLocationList } from "../savedLocations/SavedLocationList"
import { Authorized } from "./Authorized"

export const ApplicationViews = ({ token, setToken, setUserId, userId }) => {
  return <Routes>
    
    <Route path="/login" element={<Login setToken={setToken} setUserId={setUserId} />} />
    <Route path="/register" element={<Register setToken={setToken} setUserId={setUserId} />} />
    <Route element={<Authorized token={token}/>}>
      {/* Add Routes here */}
      <Route path="" element={<MapHome />} />
      <Route path="saved-locations" element={<SavedLocationList />} />
      <Route path="saved-addresses" element={<SavedAddressList />} />
    </Route>
  </Routes>
}
