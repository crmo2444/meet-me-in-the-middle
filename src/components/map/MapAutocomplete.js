import { useEffect, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { midpointTo } from "./Midpoint";

export const MapAutocomplete = ({setCenter, setMarkerOne, setMarkerTwo}) => {
  const [addressOne, setAddressOne] = useState("");
  const [coordinatesOne, setCoordinatesOne] = useState({
    lat: null,
    lng: null
  });
  const [addressTwo, setAddressTwo] = useState("");
  const [coordinatesTwo, setCoordinatesTwo] = useState({
    lat: null,
    lng: null
  });

  useEffect(() => {
    if(coordinatesOne.lat !== null && coordinatesTwo.lat !== null) {
        setMarkerOne(coordinatesOne)
        setMarkerTwo(coordinatesTwo)
        let midpoint = midpointTo(coordinatesOne, coordinatesTwo)
        setCenter(midpoint)
    }
  }, [coordinatesOne, coordinatesTwo])

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddressOne(value);
    setCoordinatesOne(latLng);
  };

  const handleSelectTwo = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddressTwo(value);
    setCoordinatesTwo(latLng);
  };

  return <>
    <div>
      <PlacesAutocomplete
        value={addressOne}
        onChange={setAddressOne}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <p>Latitude: {coordinatesOne.lat}</p>
            <p>Longitude: {coordinatesOne.lng}</p>

            <input {...getInputProps({ placeholder: "Type address one..." })} />

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>

    <div>
    <PlacesAutocomplete
    value={addressTwo}
    onChange={setAddressTwo}
    onSelect={handleSelectTwo}
    >
    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
        <p>Latitude: {coordinatesTwo.lat}</p>
        <p>Longitude: {coordinatesTwo.lng}</p>

        <input {...getInputProps({ placeholder: "Type address one..." })} />

        <div>
            {loading ? <div>...loading</div> : null}

            {suggestions.map(suggestion => {
            const style = {
                backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
            };

            return (
                <div {...getSuggestionItemProps(suggestion, { style })}>
                {suggestion.description}
                </div>
            );
            })}
        </div>
        </div>
    )}
    </PlacesAutocomplete>
    </div>
  </>
}