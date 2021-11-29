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
    username: yup.string()
    .required('Preenchimento obrigatório'),
    password: yup.string()
    .required('Preenchimento obrigatório'),
    primeiro_acesso: yup.boolean()
 }).required()

export default function CadastroComponent(){


    const{ register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema)
    })

    const postData = (data) =>{

        data.password = sha256(data.password).toString()

        const accessToken = sessionStorage.token

        const tokenAxios = axios.create({

            baseURL: 'http://localhost:8000/',
            headers: {
                Authorization: `Token ${accessToken}`,
            },

        })

        tokenAxios.post('users/', data)
        .then(()=>{
            alert('Usuário criado com sucesso!')
            // eslint-disable-next-line no-restricted-globals
            location.reload()
        })
        .catch(()=>{
            alert('Ocorreu um erro, não foi possível cadastrar usuário')
            // eslint-disable-next-line no-restricted-globals
            location.reload()
        }) 
    
    }

    const onSubmit = data => postData(data)

    return(
        
        <section className='cadastro-usuario'>
            <h1 className='titulo-cadastro-usuario'>Cadastro de usuários</h1>
            <div className='center-cadastro-usuario'>
                <form className='formulario-cadastro-usuario'  onSubmit={handleSubmit(onSubmit)}>
                    
                    <div className='div-input'> 
                    <div className='separador-esq'><label htmlFor='post-grad'>Cargo:</label></div>
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
                    <div className='separador-esq'><label htmlFor='perfil'>Perfil:</label></div>
                    <div className='separador-dir'>
                        <select
                            id='perfil'
                            className='form-cadastro-usuario setor'
                            name = 'perfil' 
                            {...register('perfil')}
                            >

                            <option value=''></option>
                            <option value='Administrador'>Admin</option>
                            <option value='Gerente'>Gerente</option>
                            <option value='Fiscal'>Fiscal</option>
                            <option value='Operador'>Operador</option>
                        </select>
                        <p className='erro-validacao'>{errors.perfil?.message}</p>
                    </div>
                    </div>

                    <div className='div-input'>
                    <div className='separador-esq'><label htmlFor='nome-usuario'>Nome:</label></div>
                        <div className='separador-dir'>
                            <input
                                type='text'
                                id='nome-usuario'
                                className='form-cadastro-usuario quantidade'
                                name = 'nome_guerra' 
                                {...register('nome_guerra')}
                                >
                            </input>
                            <p className='erro-validacao'>{errors.nome_guerra?.message}</p>
                        </div>
                    </div>

                    
                    <div className='div-input'>
                    <div className='separador-esq'><label htmlFor='cadastro-login'>Login:</label></div>
                    <div className='separador-dir'>
                        <input
                            type='text'
                            id='cadastro-login'
                            className='form-cadastro-usuario mediaRetirada'
                            name = 'username' 
                            {...register('username')}
                            >
                        </input>
                        <p className='erro-validacao'>{errors.username?.message}</p>
                    </div>
                    </div>

                    <div className='div-input'>
                    <div className='separador-esq'><label htmlFor='cadastro-pass'>Senha:</label></div>
                    <div className='separador-dir'>
                        <input
                            type='password'
                            id='cadastro-pass'
                            className='form-cadastro-usuario mediaRetirada'
                            placeholder='Busque utilizar senhas fortes'
                            name = 'password' 
                            {...register('password')}
                        >
                        </input>
                        <p className='erro-validacao'>{errors.password?.message}</p>

                    </div>
                    </div>
                    
                    <input type='hidden' value='true' name='primeiro_acesso' {...register('primeiro_acesso')}/>


                    <button className='button-cadastrar' type='submit' value='cadastrar'>Cadastrar</button>
                    
                </form>
            </div>
        </section>
    )


}