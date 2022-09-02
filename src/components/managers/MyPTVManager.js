export const getCoordinates = (address, key) => {
    return fetch(`https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${address}&apiKey=${key}`,
    {
        headers: {
            "Authorization": `Token ${localStorage.getItem("mm_token")}`,
            "Content-Type": 'application/json'
        }
    })
        .then(response => response.json())
}