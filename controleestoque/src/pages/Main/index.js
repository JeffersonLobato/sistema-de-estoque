import React from 'react';
import Header from '../../componentes/Header';
import HomeComponent from '../../componentes/HomeComponent';


// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

  if(sessionStorage.acessoNovo === 'true'){
    // eslint-disable-next-line no-restricted-globals
    location.assign('/trocar-senha')
  }
  
  if(!sessionStorage.token){
    // eslint-disable-next-line no-restricted-globals
    location.assign('/')
  }

  return(
    <body>
     
      <Header/>
      <HomeComponent/>

    </body>
  )

}