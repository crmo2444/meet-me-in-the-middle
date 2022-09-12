import { useNavigate } from "react-router-dom"

export const Event = () => {
    let navigate = useNavigate()
    
    return <button onClick={() => {
        navigate({ pathname: "/events/new" })
    }}>Create Event</button>
}