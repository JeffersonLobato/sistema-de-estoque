import React from 'react';

export default function HomeComponent(){

        let usuario = ' ' + sessionStorage.nome_guerra + ' '

        return(
            <section className="home">

                    <div className="center-home">

                        <h1>Bem-vindo {usuario} ao Sistema de Controle de Estoque!</h1>

                    </div>   

            </section>
        )


}