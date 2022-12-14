export const createSavedResultLocation = (location) => {
    return fetch("http://localhost:8000/saved_result_locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Token ${localStorage.getItem('mm_token')}`
      },
      body: JSON.stringify(location)
    }).then(res => res.json())
  }

export const deleteSavedResultLocation = (id) => {
    return fetch(`http://localhost:8000/saved_result_locations/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Token ${localStorage.getItem('mm_token')}`
      }
    })
  }

export const getAllSavedResultLocations = () => {
    return fetch("http://localhost:8000/saved_result_locations", {
      headers: {
        'Authorization': `Token ${localStorage.getItem('mm_token')}`
      }
    }).then(res => res.json())
  }

export const getCurrentUsersSavedLocations = () => {
    return fetch(`http://localhost:8000/saved_result_locations?user=${localStorage.getItem('mm_id')}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('mm_token')}`
      }
    })
      .then(res => res.json())
  }