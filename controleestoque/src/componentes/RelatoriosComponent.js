import React from 'react'
import RelatorioUm from './Relatorios/RelatorioUm'
import RelatorioDois from './Relatorios/RelatorioDois'
import RelatorioTres from './Relatorios/RelatorioTres'


export default function RelatoriosComponent(){

  
    return(

        <section className='relatorios'>

            <div id='center-relatorios' className='center-relatorios'>

                <div className='divisoria1'>
                    <div id='canvas-relatorio1' className='quadro-relatorio'>
                        
                        <RelatorioUm/>
                        
                    </div>
                    

                    <div id='canvas-relatorio2' className='quadro-relatorio'>
                        
                        <RelatorioDois/>
                        
                    </div>

                    <div id='canvas-relatorio3' className='quadro-relatorio'>
                        <RelatorioTres/>
                    </div>
                    
                </div>

                <div className='divisoria2'>
                    <div id='canvas-relatorio4' className='quadro-relatorio'>
                        
                    </div>

                    <div id='canvas-relatorio5' className='quadro-relatorio'>
                       
                    </div>

                    <div id='canvas-relatorio6' className='quadro-relatorio'>
                      
                    </div>
                </div>

                
            </div>
            <div id='fundo-relatorios'></div>

  
        </section>
            

    )

}
