import { useEffect, useRef, useState } from "react"
import { keys } from "../../Settings"
import "./Map.css"
import { useLoadScript } from '@react-google-maps/api'
import { Map } from "./Map.js"
import { MapAutocomplete } from "./MapAutocomplete.js"

export const MapHome = () => {
    const [ libraries ] = useState(['places']);
    const [center, setCenter] = useState({lat: 39.8283, lng: -98.5795})
    const [markerOne, setMarkerOne] = useState({lat: null, lng: null})
    const [markerTwo, setMarkerTwo] = useState({lat: null, lng: null})

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
        </section>
}