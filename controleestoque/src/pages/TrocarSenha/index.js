import React from 'react';
import Header from '../../componentes/Header';
import TrocarSenhaComponent from '../../componentes/TrocarSenhaComponent';


// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  
  if(!sessionStorage.token){
    // eslint-disable-next-line no-restricted-globals
    location.assign('/')
  }

  return(
    <body>
    
      <Header/>
      <TrocarSenhaComponent/>

    </body>
  )

}