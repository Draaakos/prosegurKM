import { useContext, useState } from 'react';
import { DashboardContext } from '../../../context.js';
import DocumentForm from './DocumentForm';
import css from './index.css';


const Document = () => {
  const { states } = useContext(DashboardContext);

  const documents = states.carActive.documents
    .map((document, idx) => {
      return (
        <div className={css.document} key={`document-${idx}`}>
          <div>{document.name}</div>
          <div>{ document.hasExpired ? document.expiredDate : 'Sin expiración'}</div>
        </div>
      )
    })

  return (
    <div>
      <div>{documents}</div>
      <div><DocumentForm car={states.carActive}/></div>
    </div>
  )
};

export default Document;
