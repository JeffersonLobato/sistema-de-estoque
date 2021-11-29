import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import axios from 'axios'


const schema = yup.object({
    setor: yup.string()
    .required('Preenchimento obrigatório'),
    descricao: yup.string()
    .required('Preenchimento obrigatório'),
    data: yup.date()
    .typeError('Preenchimento obrigatório')
    .required('Preenchimento obrigatório'),
    quantidade: yup.number()
    .typeError('Preenchimento obrigatório')
    .positive('O número tem que ser maior que 0')
    .integer('O número tem que ser inteiro')
    .required('Preenchimento obrigatório'),
 }).required()


export default function Editar(props){

    const ficha = props.ficha


    const{ register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema)
    })
    
    const closeEdit = () =>{

        let fecharEditar = document.getElementById('fundo-janela-editar')
        fecharEditar.style.display = 'none'

    }

    const postData = (data) =>{
        let ano, mes, dia
        
        ano = data.data.getFullYear()
        mes = data.data.getMonth() + 1
        if(mes < 10){
            mes = '0' + String(mes)
        }
        dia = data.data.getDate()
        if(dia < 10){
            dia = '0' +String(dia)
        }

        data.data = ano + '-' + mes + '-' + dia

        const accessToken = sessionStorage.token

        const tokenAxios = axios.create({

            baseURL: 'http://localhost:8000/',
            headers: {
                Authorization: `Token ${accessToken}`,
            },

        })
        
        tokenAxios.patch('itens/'+ficha+'/', data)
        .then(()=>{

            alert('Salvo com sucesso!')
            props.setItemEditado(ficha)
            
            let dataCheia, horaCheia
            let ano, mes, dia, hora, min, seg

            let dataHora = new Date()
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
                'acao':'Edição',
                'ficha': data.ficha,
                'setor': data.setor,
                'descricao': data.descricao,
                'quantidadeAcao': 0,
                'quantidadeTotal': data.quantidade,
                'data_saida': dataCheia,
                'data_entrada': data.data,
                'retmensal': data.retmensal,
                'hora': horaCheia,
                'secao': '',
                'homologado': true
        
            }


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

                })
                .catch(()=>{

                    alert('Ocorreu um erro para salvar a ação no histórico, informe ao suporte!')

                })


            closeEdit()
            // eslint-disable-next-line no-restricted-globals
            location.reload()
        })
        .catch(()=>{

            alert('Ocorreu um erro, tente novamente!')
            closeEdit()
            // eslint-disable-next-line no-restricted-globals
            location.reload()
        })

    }

        
    const onSubmit = data => postData(data)

    return(


        <div id='fundo-janela-editar' className='fundo-janela-editar'>
            <form className='form-editar' onSubmit={handleSubmit(onSubmit)}>
                <div className='janela-edicao'>
                    <div className='fechar' onClick={()=>closeEdit()}><div>x</div></div>
                    <h2 className='titulo-janela-edicao'>Item ficha Nr {ficha}</h2>
                    <div className='div-input primeira-opcao'> 
                        <div className='separador-esq'><label className='label-janela-edicao' htmlFor='setor'>Setor</label></div>
                        <div className='separador-dir'>
                            <select
                                id='setor'
                                className='form-incluir setor'
                                name = 'setor' 
                                {...register('setor')} 
                            >   
                                <option value='Limpeza'>Limpeza</option>
                                <option value='Obras'>Obras</option>
                                <option value='Expediente'>Expediente</option>
                            </select>
                            <p className='erro-validacao'>{errors.setor?.message}</p>
                        </div>
                        </div>

                        <div className='div-input'>
                        <div className='separador-esq'><label className='label-janela-edicao' htmlFor='descricao'>Descrição:</label></div>
                        <div className='separador-dir'>
                            <input
                                id='descricao'
                                className='form-incluir descricao'
                                placeholder='Conforme SisCofis'
                                name = 'descricao'
                                {...register('descricao')}
                            >

                            </input>
                            <p className='erro-validacao'>{errors.descricao?.message}</p>
                        </div>
                        </div>

                        <div className='div-input'>
                        <div className='separador-esq'><label className='label-janela-edicao' htmlFor='mediaRetirada'>Data:</label></div>
                        <div className='separador-dir'>
                            <input
                                type='date'
                                id='mediaRetirada'
                                className='form-incluir mediaRetirada'
                                name = 'data'
                                {...register('data')}
                            >                                      
                            </input>
                            <p className='erro-validacao'>{errors.data?.message}</p>
                        </div>
                        </div>

                        <div className='div-input'>
                        <div className='separador-esq'><label className='label-janela-edicao' htmlFor='quantidade'>Quantidade:</label></div>
                        <div className='separador-dir'>
                            <input
                                type='number'
                                id='quantidade'
                                className='form-incluir quantidade'
                                placeholder='Apenas números'
                                name = 'quantidade'
                                {...register('quantidade')}
                                >
                            
                            </input>
                            <p className='erro-validacao'>{errors.quantidade?.message}</p>
                        </div>
                        </div>


                    <div className='center-button-salvar'>
                        <button
                            type='submit'
                            className='salvar-edicao'
                            >
                            
                            SALVAR
                            
                        </button>
                    </div>

                </div>

            </form>
        </div>
        
            

    )

}
