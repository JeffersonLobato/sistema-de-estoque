import React from 'react'


export default function ExcluirItem(props){
    
    const ficha = String(props.ficha)
    const descricao = props.descricao

    const closeWindow = () => {
        let janelaExcluir = document.getElementById('fundo-janela-excluirItem')
        janelaExcluir.style.display = 'none'
    }

    

    return(
        
        <div id='fundo-janela-excluirItem' className='fundo-janela-excluirItem'>
            <div id='excluirItem' className='excluirItem'>
                <div className='fechar' onClick={() => closeWindow()}><div>x</div></div>
                <h2>Tem certeza que deseja excluir o seguinte item?</h2>
                <h3 className='texto-excluir'>{ficha} - {descricao}</h3>
                <div className='botoes-excluir'>
                    <button
                        className='botao-cancelar'
                        onClick={()=>closeWindow()}
                    >
                        Cancelar
                    </button>

                    <button
                        className='botao-excluir'
                        value = {ficha}
                        onClick={(e)=>{
                            props.excluirItem(e.target.value)
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