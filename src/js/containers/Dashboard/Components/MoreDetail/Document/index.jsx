import { useContext, useState } from 'react';
import { DashboardContext } from '../../../context.js';
import DocumentForm from './DocumentForm';
import css from './index.css';


const Document = () => {
  const [ isActiveForm, setIsActiveForm ] = useState(false);
  const { states } = useContext(DashboardContext);

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
          <div>{ document.hasExpired ? document.expiredDate : 'Sin expiración'}</div>
          <a href={document.path} download>descargar</a>
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
