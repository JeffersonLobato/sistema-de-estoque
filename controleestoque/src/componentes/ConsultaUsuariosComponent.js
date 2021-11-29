import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditarUsuarios from './EditarUsuarios';
import ExcluirUser from './ExcluirUser';



export default function ConsultaUsuariosComponent(){

    const [usuarios, setUsers] = useState([])
    const [busca, setBusca] = useState('')
    const [login, setLogin] = useState('')
    const [nome, setNome] = useState('')
    const [posto, setPosto] = useState('')


    const handleChangeBusca=(e)=>{

        setBusca(e.target.value)

    }

    const excluirUser = (e) =>{

        let usernameExcluir = e
        const accessToken = sessionStorage.token

        const tokenAxios = axios.create({

            baseURL: 'http://localhost:8000/',
            headers: {
                Authorization: `Token ${accessToken}`,
            },

        })
        tokenAxios.delete('users/'+ usernameExcluir +'/').then(()=>{
            alert( 'Usuário excluído com sucesso!')
            // eslint-disable-next-line no-restricted-globals
            location.reload()
        }).catch(()=>{
            alert('Ocorreu um erro ao excluir usuário!')
            // eslint-disable-next-line no-restricted-globals
            location.reload()
        })
    }

    const buscaUser = (busca) =>{

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
        let opcaoEdicao = document.getElementById('fundo-janela-editar-usuario')
        opcaoEdicao.style.display = 'block'
        setLogin(values[0])
        setNome(values[1])
    
    }

    const openExcluir = (e) =>{
    
        let values = e.target.value.split('/')
        let opcaoEdicao = document.getElementById('fundo-janela-excluirUser')
        opcaoEdicao.style.display = 'block'
        setLogin(values[0])
        setNome(values[1])
        setPosto(values[2])
    
    }


    useEffect(() => {

        const accessToken = sessionStorage.token

        const tokenAxios = axios.create({

            baseURL: 'http://localhost:8000/',
            headers: {
                Authorization: `Token ${accessToken}`,
            },

        })
        tokenAxios.get('users/'+ buscaUser(busca))
            .then((response) => {
                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].perfil === 'admin'){
                        delete response.data[i]
                    }
                
                }
                    
                setUsers(response.data);
            })
         }, [busca]);


    return(
    
        <div className='consulta-usuarios'>

            <div className='buscar-usuario'>
                <label htmlFor='input-busca-item' className='label-input-busca-item'>Buscar:</label>
                <input
                    id='input-busca-item'
                    className='input-busca-item'
                    type='text'
                    value={busca}
                    onChange={(e)=>handleChangeBusca(e)}
                />
            </div>

            <div className='consulta-linha-usuario consulta-linha-individual-usuario'>
                <div className='consulta-post-grad indice-coluna-consulta'><span>Cargo</span></div>
                <div className='consulta-perfil indice-coluna-consulta'><span>Perfil</span></div>
                <div className='consulta-nome indice-coluna-consulta'><span>Nome</span></div>
                <div className='consulta-login indice-coluna-consulta'><span>Login</span></div>
                <div className='consulta-editar-usuario indice-coluna-consulta'><span>Editar</span></div>
            </div>

            <div className='linhas-usuarios'>
                {usuarios.map((usuario) => (
                
                <div className='consulta-linha-usuario'>
                    <div className='consulta-post-grad'>{usuario.posto}</div>
                    <div className='consulta-perfil'>{usuario.perfil}</div>
                    <div className='consulta-nome'>{usuario.nome_guerra}</div>
                    <div className='consulta-login'>{usuario.username}</div>
                    <div className='consulta-editar-usuario'>
                        <button
                            className='botao-editar-usuario'
                            value={usuario.username  + '/' + usuario.nome_guerra}
                            onClick={(e)=>optionEdit(e)}
                            
                        >
                            
                            Editar

                        </button>

                        <button
                            className='botao-editar-usuario excluir-usuario'
                            value={usuario.username  + '/' + usuario.nome_guerra + '/' + usuario.posto}
                            onClick={(e)=>openExcluir(e)}
                        >
                            
                            Excluir

                        </button>

                    </div>
                </div>

                ))}
            </div>

            <EditarUsuarios
                login = {login}
                nome = {nome}
            />

            <ExcluirUser
                login = {login}
                nome = {nome}
                posto = {posto}
                excluirUser = {excluirUser}
            
            />

            
            
        </div>


    )

}
