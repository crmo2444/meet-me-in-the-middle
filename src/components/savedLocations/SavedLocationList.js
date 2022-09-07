import { useEffect, useState } from "react"
import { deleteSavedResultLocation, getCurrentUsersSavedLocations } from "../managers/SavedResultLocationManager"

export const SavedLocationList = () => {
    const [locations, setLocations] = useState([])

    const loadLocations = () => {
        getCurrentUsersSavedLocations().then(data => setLocations(data))
    }
    
    useEffect(() => {
         loadLocations()
    }, [])
    
    const handleDelete = (id) => {
        deleteSavedResultLocation(id).then(loadLocations)
    }

    return <section className="savedLocationList">
        {
            locations.map(location => {
                return <section className="savedLocation">
                    <div>{location.name}</div>
                    <div>{(location.distance).toFixed(2)} miles from you.</div>
                    <button onClick={() => {
                        handleDelete(location.id)
                    }}>Delete</button>
                    </section>
            })
        }
    </section>
}