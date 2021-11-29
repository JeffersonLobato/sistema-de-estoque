/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {openRelatorio, closeRelatorio, imprimirRelatorio} from './FunctionsRelatorios'
import {itensGrafico, gerarGrafico} from './FunctionsRelatorios'


export default function RelatorioDois(){

    const [itens, setItens] = useState([])
    const [secao, setSecao] = useState('')

    useEffect(() => {

        const accessToken = sessionStorage.token

        const tokenAxios = axios.create({

            baseURL: 'http://localhost:8000/',
            headers: {
                Authorization: `Token ${accessToken}`,
            },

        })
        tokenAxios.get('edicao/')
            .then((response) => {
                setItens(
                    itensGrafico(response.data)
                )
            })
         }, [itens]);



    return(
        <>
            <button className='aumentar-janela' value='canvas-relatorio3' onClick={(e)=>openRelatorio(e.target.value)}></button>
            <div className='fechar-relatorio' onClick={()=>closeRelatorio()}><div>x</div></div>
            <h2 className='titulo-rel'>Gráfico de Consumo por Seção</h2>
            <div className='selecionar-secao'>
            <select value={secao} id='select-relatorio' className='select-relatorio' onChange={(e)=>setSecao(e.target.value)}>
                <option value='' selected></option>
                <option value='1ª Seção'>1ª Seção</option>
                <option value='2ª Seção'>2ª Seção</option>
                <option value='3ª Seção'>3ª Seção</option>
                <option value='4ª Seção'>4ª Seção</option>
                <option value='Relações Públicas'>RP</option>
                <option value='Pelotão de Obras'>PO</option>
                <option value='Manutenção de Viaturas'>Mnt Vtr</option>
                <option value='Bateria de Comando de Selva'>BC</option>
                <option value='1ª Bateria de Mísseis de Selva'>1ª Bia Msl</option>
                <option value='Aprovisionamento'>Rancho</option>
                <option value='Seção de Saúde'>Saúde</option>
                <option value='Ordenança do Comandante'>Ordenança</option>
                <option value='Alvo Aéreo'>Alvo Aéreo</option>
                <option value='RBS'>RBS</option>
                <option value='Armaria'>Armaria</option>
            </select>
            <button id='botao-select-relatorio' className='botao-select-relatorio' value={secao} onClick={(e)=>gerarGrafico(e.target.value, itens)}>Gerar</button>
            </div>
            <div id='canvas-grafico' className='canvas-grafico'>
                <canvas id='grafico'></canvas>
            </div>

            <div class='imprimir-rel'>
                    <button className='botao-imprimir' onClick={()=>imprimirRelatorio()}>
                        Imprimir
                    </button>
            </div>
        </>
    )

}