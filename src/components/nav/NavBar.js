import { useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = ({ token, setToken }) => {
  const navigate = useNavigate()
  let userId = localStorage.getItem('mm_id')

    return (
        <ul className="navbar">
            <li className="navbar__item">
            <Link className="nav-link" to="/">Home</Link>
            </li>
            {
                token ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                setToken('')
                                navigate('/login')
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}
