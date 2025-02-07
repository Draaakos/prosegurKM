import http from '../utils/http.js';


const documentService = {
  fetchDocumentType() {
    const url = '/api/v1/document/types';
    return http.get(url);
  },
  uploadDocument(form, carId) {
    const url = `/api/v1/car/${carId}/document`;

    return http._post(url, form)
      .then(response => response.json());
  },
  deleteDocument(carId, documentId) {
    const url = `/api/v1/car/${carId}/document/${documentId}`;

    return http.delete(url);
  },
};


export default documentService;
