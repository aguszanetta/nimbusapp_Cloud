import React from 'react';

// Componente
import NovedadDetalleComp from '../Components/NovedadDetalleComp';

const DetalleNovedad = ({route}) => {

  return (
    <NovedadDetalleComp 
      value = {route.params}  
    />
  )
}

export default DetalleNovedad;