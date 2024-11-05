const http = {
  get(url) {
    return window.fetch(url)
      .then(response => response.json());
  },
  post(url, payload) {
    return window.fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json());
  },
  put(url, payload) {
    return window.fetch(url, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json());
  },
  delete(url, payload) {
    return window.fetch(url, {
      method: 'DELETE',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json());
  },
};

export default http;
