import React from 'react';

export default function JanelaOpcao(){

    const closeWindow = () => {

        let close = document.getElementById('fundo-janela-opcao-edicao')
        close.style.display = 'none'

    }

    const openEdit = () => {

        let abrirEditar = document.getElementById('fundo-janela-editar')

        abrirEditar.style.display = 'block'
        closeWindow()

    }

    const openEntrada = () => {

        let abrirEntrada = document.getElementById('fundo-janela-entrada')

        abrirEntrada.style.display = 'block'
        closeWindow()

    }

    
    const openRetirada = () => {

        let abrirRetirada = document.getElementById('fundo-janela-retirar')

        abrirRetirada.style.display = 'block'
        closeWindow()

    }


    return(
    
            <div id='fundo-janela-opcao-edicao' className='fundo-janela-opcao-edicao'>
                <div className='opcao-edicao'>
                    <div className='fechar' onClick={() => closeWindow()}><div>x</div></div>
                    <div className='center-button'>
                        <button onClick={() => openRetirada()}>Saída</button>
                        <button onClick={() => openEntrada()}>Entrada</button>
                        <button onClick={() => openEdit()}>Editar</button>
                    </div>

                </div>
            </div>

    )

}