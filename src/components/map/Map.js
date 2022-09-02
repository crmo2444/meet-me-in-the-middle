import { GoogleMap, Marker } from "@react-google-maps/api"
import { useEffect, useState } from "react"

export const Map = ({center, markerOne, markerTwo}) => {
    const [zoom, setZoom] = useState(5)

    useEffect(
        () => {
            if(center.lat !== 39.8283 && center.lng !== -98.5795) {
                setZoom(8)
            }
        }, [center]
    )

    return <GoogleMap zoom={zoom}
                center={center}
                mapContainerClassName="mapContainer">
                    <Marker position={center}
                            icon={require('./bluemarker.png')}/>
                    <Marker position={markerOne}/>
                    <Marker position={markerTwo}/>
            </GoogleMap>
}