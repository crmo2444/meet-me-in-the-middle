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
        'Authorization': `Token ${localStorage.getItem('auth_token')}`
      }
    })
  }
  