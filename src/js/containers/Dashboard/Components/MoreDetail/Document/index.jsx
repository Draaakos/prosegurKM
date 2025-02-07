import { useContext, useState } from 'react';
import { DashboardContext } from '../../../context.js';
import DocumentForm from './DocumentForm';
import documentService from '../../../../../services/document.service.js';
import css from './index.css';


const Document = () => {
  const [ isActiveForm, setIsActiveForm ] = useState(false);
  const { states } = useContext(DashboardContext);

  const deleteDocument = (documentId) => {
    if(confirm('¿Estás seguro de eliminar este documento?')) {
      documentService.deleteDocument(states.carActive.id, documentId)
        .then(window.location.reload());
    }
  }

  const documents = states.carActive.documents
    .map((document, idx) => {
      // TODO: add name for each file when it is downloaded. This function has the name formatted just use it :D.
      // const nameFormatted = document.name.replaceAll(' ', '_');
      // const extensionSplitted = document.path.split('.');
      // const extension = extensionSplitted[extensionSplitted.length - 1];
      // const name = `${nameFormatted}.${extension}`;

      return (
        <div className={css.document} key={`document-${idx}`}>
          <div>{document.name}</div>
          <div className={css.expired_date}>
            <div>{ document.hasExpired ? document.expiredDate : 'Sin expiración'}</div>
            <div>{ document.isExpired && <img src={`/static/${VERSION}/images/generic/warning-triangle-solid.svg`} /> }</div>
          </div>
          {/* <a href={document.path} download>descargar</a> */}
          <div className={css.content_actions}>
            <a href={document.path} className={css.download}><img src={`/static/${VERSION}/images/generic/download.svg`} /></a>
            <div className={css.delete} onClick={() => deleteDocument(document.id)}><img src={`/static/${VERSION}/images/generic/trash-solid.svg`} /></div>
          </div>
        </div>
      );
    });

  return (
    <div>
      <div>
        <div className={css.document}>
          <div>Documento</div>
          <div>Fecha de expiración</div>
          <div>Acciones</div>
        </div>
        {documents}
      </div>
      <div className={css.form_content}>
        <button onClick={() => setIsActiveForm(!isActiveForm)}>Agregar Documento</button>
        { isActiveForm ? <div><DocumentForm car={states.carActive}/></div> : null }
      </div>
    </div>
  );
};

export default Document;
