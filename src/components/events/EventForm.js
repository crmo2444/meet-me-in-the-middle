import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createEvent } from "../managers/EventManager"
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
  } from "react-places-autocomplete";
import { keys } from "../../Settings";

export const EventForm = () => {
    const navigate = useNavigate()
    const [address, setAddress] = useState("")
    const [coordinates, setCoordinates] = useState("")

    const [gmapsLoaded, setGmapsLoaded] = useState(false)

    // This is how you do componentDidMount() with React hooks
    useEffect(() => {
      window.initMap = () => setGmapsLoaded(true)
      const gmapScriptEl = document.createElement(`script`)
      gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=${keys.Google}&libraries=places&callback=initMap`
      document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)
    }, [])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        description: "",
        date: "",
        time: "",
        address: "",
        organizer: parseInt(localStorage.getItem("mm_id")),
        coordinates: "",
        name: ""
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
    }, [])

    const changeEventState = (evt) => {
        // TODO: Complete the onChange function
        const copy = {...currentEvent}
        copy[evt.target.name] = evt.target.value
        setCurrentEvent(copy)
    }

    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value);
        setCoordinates(latLng);
      };

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentEvent.name}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            {/* TODO: create the rest of the input fields */}
            <fieldset>
                <div>Address:</div>
                {gmapsLoaded ? <PlacesAutocomplete
                    value={address}
                    onChange={setAddress}
                    onSelect={handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input {...getInputProps({ placeholder: "Type address..." })} />
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
                </PlacesAutocomplete> : null}
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Description: </label>
                    <textarea rows="5" cols="80" name="description" 
                        value={currentEvent.description}
                        onChange={changeEventState}></textarea>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        address: address,
                        coordinates: coordinates,
                        name: currentEvent.name,
                        organizer: currentEvent.organizer
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}