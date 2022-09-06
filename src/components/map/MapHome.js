import { useEffect, useRef, useState } from "react"
import { keys } from "../../Settings"
import "./Map.css"
import { useLoadScript } from '@react-google-maps/api'
import { Map } from "./Map.js"
import { MapAutocomplete } from "./MapAutocomplete.js"
import { NearbySearch } from "./NearbySearch"

export const MapHome = () => {
    const [ libraries ] = useState(['places']);
    const [center, setCenter] = useState({lat: 39.8283, lng: -98.5795})
    const [markerOne, setMarkerOne] = useState({lat: null, lng: null})
    const [markerTwo, setMarkerTwo] = useState({lat: null, lng: null})
    const [nearbyResults, setNearbyResults] = useState([])

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: keys.Google,
        libraries,
    })

    if (!isLoaded) {
        return <div>Loading...</div>
    }
    return <section className="container">
        <div><Map center={center} markerOne={markerOne} markerTwo={markerTwo}/></div>
        <div><MapAutocomplete setCenter={setCenter} setMarkerOne={setMarkerOne} setMarkerTwo={setMarkerTwo}/></div>
        {
            center.lat !== 39.8283 ? <div><NearbySearch lat={center.lat} lng={center.lng} setNearbyResults={setNearbyResults} nearbyResults={nearbyResults}/></div> : null
        }
        </section>
}