import React from 'react'


export default function ExcluirUser(props){
    
    const login = props.login
    const posto = props.posto
    const nome = props.nome

    const closeWindow = () => {
        let janelaExcluir = document.getElementById('fundo-janela-excluirUser')
        janelaExcluir.style.display = 'none'
    }

    

    return(
        
        <div id='fundo-janela-excluirUser' className='fundo-janela-excluirUser'>
            <div id='excluirUser' className='excluirUser'>
                <div className='fechar' onClick={() => closeWindow()}><div>x</div></div>
                <h2>Tem certeza que deseja o usuário</h2>
                <h3 className='texto-excluir'>{posto} {nome}</h3>
                <div className='botoes-excluir'>
                    <button
                        className='botao-cancelar'
                        onClick={()=>closeWindow()}
                    >
                        Cancelar
                    </button>

                    <button
                        className='botao-excluir'
                        value = {login}
                        onClick={(e)=>{
                            props.excluirUser(e.target.value)
                            closeWindow()                        
                            }}                        
                    >
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    )
}