/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {openRelatorio, closeRelatorio, imprimirRelatorio, exportTable, organizarRelatorio} from './FunctionsRelatorios'


export default function RelatorioUm(){

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
                    organizarRelatorio(response.data)
                )
            })
         }, [itens]);



    return(
        <>
            <button className='aumentar-janela' value='canvas-relatorio1' onClick={(e)=>openRelatorio(e.target.value)}></button>
            <div className='fechar-relatorio' onClick={()=>closeRelatorio()}><div>x</div></div>
            <h2 className='titulo-rel'>Relação de material</h2>

            <table id='tabela-relatorio1' className='bloco-relatorio'>

                <tr className='relatorio-lista'>
                    <th className='rel-ord rel rel-ind'>Ord</th>
                    <th className='rel-ficha rel rel-ind'>Ficha</th>
                    <th className='rel-setor rel rel-ind'>Setor</th>
                    <th className='rel-descricao rel rel-ind'>Descricao</th>
                    <th className='rel-quantidade rel rel-ind'>Qtd</th>
                    <th className='rel-data rel rel-ind'>Data de entrada</th>
                    <th className='rel-retmensal rel rel-ind'>R M</th>
                </tr>

                {

                    itens.map((item, i) => (

                            <tr className='relatorio-lista'>
                                <td className='rel-ord rel'>{i+1}</td>
                                <td className='rel-ficha rel'>{item.ficha}</td>
                                <td className='rel-setor rel'>{item.setor}</td>
                                <td className='rel-descricao rel'>{item.descricao}</td>
                                <td className='rel-quantidade rel'>{item.quantidade}</td>
                                <td className='rel-data rel'>{item.data}</td>
                                <td className='rel-retmensal rel'>{item.retmensal}</td>
                            </tr>

                
                    ))
                }
                

            </table>

            <div class='imprimir-rel'>
                    <button className='botao-imprimir' onClick={()=>imprimirRelatorio()}>
                    Imprimir
                    </button>

                <a class='exportar-excel'>
                <button className='botao-exportar botao-imprimir' value='canvas-relatorio1' onClick={(e)=>exportTable(e.target.value)}>
                    Exportar
                </button>
                </a>
            </div>
        </>
    )

}