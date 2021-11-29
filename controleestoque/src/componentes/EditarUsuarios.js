import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import axios from 'axios'
import sha256 from 'crypto-js/sha256'

const schema = yup.object({
    posto: yup.string()
    .required('Preenchimento obrigatório'),
    perfil: yup.string()
    .required('Preenchimento obrigatório'),
    nome_guerra: yup.string()
    .required('Preenchimento obrigatório'),
    password: yup.string()
    .required('Preenchimento obrigatório'),
 }).required()

export default function EditarUsuarios(props){

    const login = props.login

    const usuario = {
        'id': '',
        'posto': '',
        'perfil': '',
        'nome_guerra': '',
        'username': login,
        'password': '',
        'primeiro_acesso': true
    }


    const{ register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema)
    })

    const closeEdit = () =>{

        let fecharEditar = document.getElementById('fundo-janela-editar-usuario')
        fecharEditar.style.display = 'none'

    }

    const postData = (data) =>{

        const accessToken = sessionStorage.token

        const tokenAxios = axios.create({

            baseURL: 'http://localhost:8000/',
            headers: {
                Authorization: `Token ${accessToken}`,
            },

        })
        tokenAxios.get('users/'+login+'/')
        .then((response)=>{

            usuario.id = response.data.id
            usuario.posto = data.posto
            usuario.perfil = data.perfil
            usuario.nome_guerra = data.nome_guerra
            usuario.password = sha256(data.password).toString()
            usuario.primeiro_acesso = true

            console.log(usuario)

            const accessToken = sessionStorage.token

            const tokenAxios = axios.create({

                baseURL: 'http://localhost:8000/',
                headers: {
                    Authorization: `Token ${accessToken}`,
                },

            })
            tokenAxios.patch('users/'+login+'/', usuario)
            .then(()=>{
                alert('Usuário editado com sucesso!')
                closeEdit()
                // eslint-disable-next-line no-restricted-globals
                location.reload()
            })
            .catch(()=>{
                alert('Ocorreu um erro, não foi possível editar usuário')
                closeEdit()
                // eslint-disable-next-line no-restricted-globals
                location.reload()
            })

            
        })
        .catch(()=>{
            alert('Não foi possível acessar o banco de dados!')
            // eslint-disable-next-line no-restricted-globals
            location.reload()
        })
    
    }

    const onSubmit = data => postData(data)


    return(

        <div id='fundo-janela-editar-usuario' className='fundo-janela-editar-usuario'>
        
            <form className='form-editar-user' onSubmit={handleSubmit(onSubmit)}>
                <div className='janela-edicao-usuario'>
                    <div className='fechar' onClick={()=>closeEdit()}><div>x</div></div>
                    
                    <div className='div-input primeira-opcao-usuario'> 
                        <div className='separador-esq'><label className='label-janela-edicao-usuario' htmlFor='post-gradr'>Post/grad</label></div>
                        <div className='separador-dir'>
                            <select
                                id='post-grad'
                                className='form-cadastro-usuario setor'
                                name = 'posto' 
                                {...register('posto')} 
                                >
                                <option value=''></option>
                                <option value='Cargo 1'>Cargo 1</option>
                                <option value='Cargo 2'>Cargo 2</option>
                                <option value='Cargo 3'>Cargo 3</option>
                                
                            </select>
                            <p className='erro-validacao'>{errors.posto?.message}</p>
                            
                            </div>
                        </div>

                        <div className='div-input'>
                        <div className='separador-esq'><label className='label-janela-edicao-usuario' htmlFor='perfil'>Perfil:</label></div>
                        <div className='separador-dir'>
                            <select
                                id='perfil'
                                className='form-cadastro-usuario setor'
                                name = 'perfil' 
                                {...register('perfil')} 
                            >
                                <option value=''></option>
                                <option value='Administrador'>Administrador</option>
                                <option value='Operador'>Operador</option>
                                <option value='Fiscal'>Fiscal</option>
                                <option value='Gerente'>Gerente</option>
                            </select>
                            <p className='erro-validacao'>{errors.perfil?.message}</p>
                        </div>
                        </div>

                        <div className='div-input'>
                        <div className='separador-esq'><label className='label-janela-edicao-usuario' htmlFor='nome-edicao'>Nome:</label></div>
                        <div className='separador-dir'>
                            <input
                                type='text'
                                id='nome-edicao'
                                className='form-incluir quantidade'
                                name = 'nome_guerra' 
                                {...register('nome_guerra')}
                                >
                            </input>
                            <p className='erro-validacao'>{errors.nome_guerra?.message}</p>
                        </div>
                        </div>

                        <div className='div-input'>
                        <div className='separador-esq'><label className='label-janela-edicao-usuario' htmlFor='login-edicao'>Login:</label></div>
                        <div className='separador-dir'>
                            <input
                                type='text'
                                id='login-edicao'
                                className='form-incluir quantidade'
                                value={props.login}
                                readonly='true'
                                >
                            </input>
                            
                        </div>
                        </div>

                        <div className='div-input'>
                        <div className='separador-esq'><label className='label-janela-edicao-usuario' htmlFor='senha-edicao'>Senha:</label></div>
                        <div className='separador-dir'>
                            <input
                                type='password'
                                id='senha-edicao'
                                className='form-incluir quantidade'
                                placeholder='Digite uma senha'
                                name = 'password' 
                                {...register('password')}
                                >
                            </input>
                            <p className='erro-validacao'>{errors.password?.message}</p>
                            
                        </div>
                        </div>
                    
                    <div className='center-button-salvar-usuario'>
                        <button className='salvar-edicao-usuario'>SALVAR</button>
                    </div>

                </div>
            </form>
        </div>
            

    )

}
