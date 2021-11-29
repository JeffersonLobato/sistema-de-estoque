import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import axios from 'axios'

const schema = yup.object({
    quantidade: yup.number()
    .typeError('Preenchimento obrigatório')
    .positive('O número tem que ser maior que 0')
    .integer('O número tem que ser inteiro')
    .required('Preenchimento obrigatório'),
 }).required()

export default function Entrada(props){

    let fichaItem = props.ficha
    let descricaoItem = props.descricao
    let item = props.item
    const [quantidade, setQuant] = useState()

    const{ register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    //Função para enviar o histórico da ação para a tabela de Edição do banco de dados
    const enviarHistorico = (historico) => {

        const accessToken = sessionStorage.token

        const tokenAxios = axios.create({

            baseURL: 'http://localhost:8000/',
            headers: {
                Authorization: `Token ${accessToken}`,
            },

        })
        tokenAxios.post('edicao/', historico)
        .then(()=>{

            alert('Ação salva no histórico com sucesso!')

            }).then(()=>{
                // eslint-disable-next-line no-restricted-globals
                location.reload() 
            })
            .catch(()=>{

                alert('Ocorreu um erro para salvar a ação no histórico, informe ao suporte!')
                // eslint-disable-next-line no-restricted-globals
                location.reload() 

            })
        
           
    }

    //função para fechar a janela
    const closeEntrada = () =>{
        
        let fecharEntrada = document.getElementById('fundo-janela-entrada')
        fecharEntrada.style.display = 'none'

    }



    //esta função envia os dados do formulário pelo axios com a formatação correta de todos os itens
    const postData = (data) =>{
                
                let quantItem = parseInt(item.quantidade)
                let quantDigitado = parseInt(data.quantidade)

                let somaQuantidade = quantItem + quantDigitado

                // eslint-disable-next-line no-self-assign
                item.ficha = item.ficha
                // eslint-disable-next-line no-self-assign
                item.setor = item.setor
                // eslint-disable-next-line no-self-assign
                item.descricao = item.descricao
                item.quantidade = somaQuantidade
                // eslint-disable-next-line no-self-assign
                item.data = item.data
                // eslint-disable-next-line no-self-assign
                item.retmensal = item.retmensal
    
                const accessToken = sessionStorage.token

                const tokenAxios = axios.create({

                    baseURL: 'http://localhost:8000/',
                    headers: {
                        Authorization: `Token ${accessToken}`,
                    },

                })
                tokenAxios.put('itens/'+fichaItem+'/', item)
                .then((response)=>{

                    alert('Salvo com sucesso!')
                   
                    closeEntrada()

                    let dataHora = new Date()
                   
                    let dataCheia, horaCheia
                    let ano, mes, dia, hora, min, seg

                
                    ano = dataHora.getFullYear()
                    mes = dataHora.getMonth() + 1
                    if(mes < 10){
                        mes = '0' + String(mes)
                    }
                    dia = dataHora.getDate()
                    if(dia < 10){
                        dia = '0' + String(dia)
                    }

                    hora = dataHora.getHours()
                    if(hora < 10){
                        hora = '0' + String(hora)
                    }
                    min = dataHora.getMinutes()
                    if(min < 10){
                        min = '0' + String(min)
                    }
                    seg = dataHora.getSeconds()
                    if(seg < 10){
                        seg = '0' + String(seg)
                    }


                    dataCheia = ano + '-' + mes + '-' + dia
                    horaCheia = hora + ':' + min + ':' + seg
                    
                    
                    let historico = {
                        
                                'usuario':'Lobato',
                                'acao':'Entrada',
                                'ficha': fichaItem,
                                'setor': item.setor,
                                'descricao': item.descricao,
                                'quantidadeAcao': quantDigitado,
                                'quantidadeTotal': item.quantidade,
                                'data_saida': item.data,
                                'data_entrada': dataCheia,
                                'retmensal': item.retmensal,
                                'hora': horaCheia,
                                'secao': '',
                                'homologado': true
                        
                            }
            
                    enviarHistorico(historico)
                })
                .catch(()=>{

                alert('Ocorreu um erro, tente novamente!')
                closeEntrada()

                })

    }

  

    const onSubmit = data => postData(data)

    return(

        <div id='fundo-janela-entrada' className='fundo-janela-entrada'>

            <form className='form-entrada' onSubmit={handleSubmit(onSubmit)}>
                <div className='janela-entrada'>
                    <div className='fechar' onClick={() => closeEntrada()}><div>x</div></div>
                    
                        <div className='div-input primeira-opcao-entrada'>
                            <div className='separador-esq'><label className='label-janela-edicao' htmlFor='ficha'>Ficha:</label></div>
                            <div className='separador-dir'><h2 className='descricao-item-retirada ficha'>{fichaItem}</h2></div>
                        </div>

                        <div className='div-input primeira-opcao-entrada'>
                            <div className='separador-esq'><label className='label-janela-edicao' htmlFor='descricao'>Descrição:</label></div>
                            <div className='separador-dir'><h2 className='descricao-item-retirada descricao'>{descricaoItem}</h2></div>
                        </div>


                        <div className='div-input'>
                            <div className='separador-esq'><label className='label-janela-edicao' htmlFor='quantidade'>Quantidade:</label></div>
                            <div className='separador-dir'>
                                <input
                                    type='number'
                                    id='quantidade'
                                    className='form-incluir quantidade'
                                    placeholder='Apenas números'
                                    value = {quantidade}
                                    onChange={(e)=>setQuant(e.target.value)}
                                    name = 'quantidade' 
                                    {...register('quantidade')}
                                    >
                                </input>
                                <p className='erro-validacao'>{errors.quantidade?.message}</p>
                            </div>
                        </div>

                        <div className='center-button-entrada'>
                            <button type='submit' className='salvar-edicao'>SALVAR</button>
                        </div>

                </div>
            </form>

        </div>
            

    )

}
