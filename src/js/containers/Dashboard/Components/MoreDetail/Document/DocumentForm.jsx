import { useEffect, useRef, useState } from "react";
import documentService from "../../../../../services/document.service.js";


const DocumentForm = ({ car }) => {
  // const [ startDate, setStartDate ] = useState(new Date());
  // const [ documentType, setDocumentType ] = useState(null);
  const [ documentTypes, setDocumentTypes ] = useState([]);
  const [ isExpired, setIsExpired ] = useState(false);

  useEffect(() => {
    documentService.fetchDocumentType()
      .then(response => setDocumentTypes(response.types))
  }, []);

  const file = useRef(null);
  const expiredDateRef = useRef(null);
  const expiredRef = useRef(null);
  const documentTypeSelectedRef = useRef(null);

  const onSubmit = evt => {
    evt.preventDefault();

    if(documentTypeSelectedRef.current.value) {
      if (!file.current.files[0]) {
        alert("Debes seleccionar un archivo");
        return;
      }

      const form = new FormData();
      form.append('document_type', documentTypeSelectedRef.current.value);
      form.append('upload', file.current.files[0]);
      form.append('expired_date', !expiredDateRef.current ? '2012-12-12': expiredDateRef.current.value);
      form.append('has_expired', isExpired);

      documentService.uploadDocument(form, car.id)
        .then(window.location.reload());
    }
  }

  return (
    <form className="form-register" encType="multipart/form-data" >
      <div className="form-register__title">Subir documento</div>
      {/* <Selector data={selectors.documentType} valueKey="documentType" onChange={onChangeSelectorType} isEditable /> */}
      <select ref={documentTypeSelectedRef}>
        { documentTypes.map((item, idx) => <option value={item.id} key={`option-${idx}`}>{item.name}</option>)}
      </select>
      <div className="form-register__checkbox">
        <input onClick={() => setIsExpired(!isExpired)} ref={expiredRef} type="checkbox" />
        <label>Con fecha de expiración</label>
      </div>
      <label style={{ display: isExpired ? 'block' : 'none' }} className="form-register__label" type="date">Fecha de expiración</label>
      {isExpired && (
        <input ref={expiredDateRef} type="date" />
      )}
      <input ref={file} type="file" className="form-register__input"/>

      <button onClick={onSubmit} className="form-register__btn">Crear</button>
    </form>
  )
};

export default DocumentForm;
