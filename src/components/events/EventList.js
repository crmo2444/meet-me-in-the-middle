import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createEvent, getCurrentUsersEvents } from "../managers/EventManager.js"

export const EventList = () => {
    const [events, setEvents] = useState([])
    let navigate = useNavigate()

    useEffect(() => {
        getCurrentUsersEvents().then(data => setEvents(data))
    }, [])

    return <section className="eventList">
                <button onClick={() => {
                    navigate({ pathname: "/events/new" })
                }}>Create Event</button>
            {events.map(event => {
                return <section className="event">
                        <div>{event.name} at {event.address}</div>
                        <div>{event.date} at {event.time}</div>
                        <div>{event.description}</div>
                    </section>
            })}
        </section>
}