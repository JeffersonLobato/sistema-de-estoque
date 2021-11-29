import React, { useEffect, useState } from 'react'
import axios from 'axios'
import JanelaOpcao from './JanelaOpcao'
import Editar from './Editar'
import Retirar from './Retirar'
import Entrada from './Entrada'
import ExcluirItem from './ExcluirItem'

export default function ConsultaComponent(){

    const [itens, setItens] = useState([])
    const [itemProp, setItemProp] = useState({
        'ficha': '',
        'setor': '',
        'descricao': '',
        'quantidade': '',
        'data': '',
        'retmensal': ''
    })
    const [busca, setBusca] = useState('')
    const [ficha, setFicha] = useState('')
    const [descricao, setDescricao] = useState('')
    const [itemEditado, setItemEditado] = useState('')


    const handleChangeBusca=(e)=>{

        setBusca(e.target.value)

    }

    //Função para enviar o histórico da ação para a tabela de Edição do banco de dados

    const excluirItem = (ficha) => {
        const accessToken = sessionStorage.token

        const tokenAxios = axios.create({

            baseURL: 'http://localhost:8000/',
            headers: {
                Authorization: `Token ${accessToken}`,
            },

        })
        tokenAxios.delete('itens/'+ ficha +'/')
        .then(() => {
            
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
                'acao':'Exclusão',
                'ficha': parseInt(ficha),
                'setor': itemProp.setor,
                'descricao': itemProp.descricao,
                'quantidadeAcao': 0,
                'quantidadeTotal': itemProp.quantidade,
                'data_saida': dataCheia,
                'data_entrada': itemProp.data,
                'retmensal': itemProp.retmensal,
                'hora': horaCheia,
                'secao': '',
                'homologado': true
        
            }

            alert( 'Item excluído com sucesso!')

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
                    // eslint-disable-next-line no-restricted-globals
                    location.reload()

                })
                .catch(()=>{

                    alert('Ocorreu um erro para salvar a ação no histórico, informe ao suporte!')
                    // eslint-disable-next-line no-restricted-globals
                    location.reload()

                })

            

        })
    }


    const buscaItem = (busca) =>{

            if(busca === ''){

                return ''

            }else{

                let search
                search = '?search=' + busca

                return search
            }

    }

    const optionEdit = (e) =>{
    
        let values = e.target.value.split('/')

        let opcaoEdicao = document.getElementById('fundo-janela-opcao-edicao')
        opcaoEdicao.style.display = 'block'
        setFicha(values[0])
        setDescricao(values[1])
        setItemProp({
            'ficha': parseInt(values[0]),
            'setor': values[2],
            'descricao': values[1],
            'quantidade': parseInt(values[3]),
            'data': values[4],
            'retmensal': parseInt(values[5])
        })

        
 
    }

    const openExcluir = (e) =>{

        let values = e.target.value.split('/')

        let opcaoEdicao = document.getElementById('fundo-janela-excluirItem')
        opcaoEdicao.style.display = 'block'
        setFicha(values[0])
        setDescricao(values[1])
        setItemProp({
            'ficha': parseInt(values[0]),
            'setor': values[2],
            'descricao': values[1],
            'quantidade': parseInt(values[3]),
            'data': values[4],
            'retmensal': parseInt(values[5])
        })

    }



    useEffect(() => {

        const accessToken = sessionStorage.token

        const tokenAxios = axios.create({

            baseURL: 'http://localhost:8000/',
            headers: {
                Authorization: `Token ${accessToken}`,
            },

        })
        tokenAxios.get('itens/'+ buscaItem(busca))
            .then((response) => {
                setItens(response.data);
            })
         }, [busca, itemEditado]);
         

    return(
    
        <div className='consulta'>
            <div className='busca-item'>
                <label htmlFor='input-busca-item' className='label-input-busca-item'>Buscar:</label>
                <input
                    id='input-busca-item'
                    className='input-busca-item'
                    type='text'
                    value={busca}
                    onChange={(e)=>handleChangeBusca(e)}
                />
            </div>
            <div className='consulta-linha consulta-linha-individual'>

                <div className='consultaFicha indice-coluna-consulta'><span>Ficha</span></div>
                <div className='consultaSetor indice-coluna-consulta'><span>Setor</span></div>
                <div className='consultaDescricao indice-coluna-consulta'><span>Descrição</span></div>
                <div className='consultaQuantidade indice-coluna-consulta'><span>Qtd</span></div>
                <div className='consultaData indice-coluna-consulta'><span>Última entrada</span></div>
                <div className='consultaMediaRetirada indice-coluna-consulta'><span>Retirada mensal</span></div>
                <div className='consultaEditar indice-coluna-consulta'><span>Editar</span></div>
               

            </div>

            <div className='linhas-itens'>
              
                {itens.map((item) => (
                
                <div className='consulta-linha'>
            
                    <div className='consultaFicha'>{item.ficha}</div>
                    <div className='consultaSetor'>{item.setor}</div>
                    <div className='consultaDescricao'>{item.descricao}</div>
                    <div className='consultaQuantidade'>{item.quantidade}</div>
                    <div className='consultaData'>{item.data}</div>
                    <div className='consultaMediaRetirada'>{item.retmensal}</div>
                    <div className='consultaEditar'>
                        <button
                        className='logo-editar'
                        value={item.ficha + '/' + item.descricao + '/' + item.setor + '/' + item.quantidade + '/' + item.data + '/' + item.retmensal}
                        onClick={(e)=>optionEdit(e)}>
                            
                            Editar

                        </button>

                        <button
                            className='botao-editar-usuario excluir-usuario'
                            value={item.ficha + '/' + item.descricao + '/' + item.setor + '/' + item.quantidade + '/' + item.data + '/' + item.retmensal}
                            onClick={(e)=>openExcluir(e)}>
                        
                            Excluir

                        </button>

                    </div>
                </div>

                ))}
            </div>
           
            <JanelaOpcao/>

            <Editar
                ficha = {ficha}
                setItemEditado = {setItemEditado}
            />
            <Retirar

                ficha = {ficha}
                descricao = {descricao}
                setItemEditado = {setItemEditado}
                item = {itemProp}

            />

            <Entrada
            
                ficha = {ficha}
                descricao = {descricao}
                item = {itemProp}
            
            />

            <ExcluirItem
                ficha = {ficha}
                descricao = {descricao}
                excluirItem = {excluirItem}
            />
            
        </div>


    )

}
