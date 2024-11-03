import { useContext } from 'react';
import { DashboardContext } from '../../../context.js';


const Resume = () => {
  const { states, actions } = useContext(DashboardContext);

  return (
    <div>
      <div>Sellos: {states.carActive.stamps.length}</div>
      <div>Documentos: {states.carActive.documents.length}</div>
      <div>Estado: {states.carActive.service}</div>
    </div>
  )
};

export default Resume;
