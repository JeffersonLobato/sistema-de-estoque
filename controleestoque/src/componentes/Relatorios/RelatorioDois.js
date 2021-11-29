/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {openRelatorio, closeRelatorio, imprimirRelatorio, exportTable, itensEsgotar, backgroundLineColor} from './FunctionsRelatorios'


export default function RelatorioDois(){

    const [itens, setItens] = useState([])

    useEffect(() => {

        const accessToken = sessionStorage.token

        const tokenAxios = axios.create({

            baseURL: 'http://localhost:8000/',
            headers: {
                Authorization: `Token ${accessToken}`,
            },

        })
        tokenAxios.get('itens/')
            .then((response) => {
                setItens(
                    itensEsgotar(response.data)
                )
            })
         }, [itens]);



    return(
        <>
            <button className='aumentar-janela' value='canvas-relatorio2' onClick={(e)=>openRelatorio(e.target.value)}></button>
            <div className='fechar-relatorio' onClick={()=>closeRelatorio()}><div>x</div></div>
            <h2 className='titulo-rel'>Estimativa Término de Estoque</h2>

            <table id='tabela-relatorio1' className='bloco-relatorio'>

                <tr className='relatorio-lista'>
                    <th className='rel-ord rel rel-ind'>Ord</th>
                    <th className='rel-ficha rel rel-ind'>Ficha</th>
                    <th className='rel-setor rel rel-ind'>Setor</th>
                    <th className='rel-descricaoEstimativa rel rel-ind'>Descricao</th>
                    <th className='rel-quantidadeEstimativa rel rel-ind'>Qtd</th>
                    <th className='rel-dias rel rel-ind'>Esgota em</th>
                </tr>

                {

                    // eslint-disable-next-line array-callback-return
                    itens.map((item, i) => (

                        <tr id={i} className='relatorio-lista'>

                            <td className='rel-ord rel'>{i+1}</td>
                            <td className='rel-ficha rel'>{item.ficha}</td>
                            <td className='rel-setor rel'>{item.setor}</td>
                            <td className='rel-descricaoEstimativa rel'>{item.descricao}</td>
                            <td className='rel-quantidadeEstimativa rel'>{item.quantidade}</td>
                            <td className='rel-dias rel'>{item.dias} dias</td>
                            {
                                backgroundLineColor(i, item.dias)
                            }

                        </tr>

                    ))
                    
                }
                

            </table>

            <div class='imprimir-rel'>
                    <button className='botao-imprimir' onClick={()=>imprimirRelatorio()}>
                    Imprimir
                    </button>

                <a class='exportar-excel'>
                <button className='botao-exportar botao-imprimir' value='canvas-relatorio2' onClick={(e)=>exportTable(e.target.value)}>
                    Exportar
                </button>
                </a>
            </div>
        </>
    )

}