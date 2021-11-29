import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import axios from 'axios'
import sha256 from 'crypto-js/sha256'

const schema = yup.object({
    username: yup.string()
    .required('Preenchimento obrigatório'),
    password: yup.string()
    .required('Preenchimento obrigatório'),
 }).required()

export default function LoginComponent(){

    const{ register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema)
    })

    if(sessionStorage.token){
        // eslint-disable-next-line no-restricted-globals
        location.assign('home')
    }

    const postData = (data) =>{

        data.password = sha256(data.password).toString()

        const login = axios.create({

            baseURL: 'http://localhost:8000/',

        })

        login.post('api-token-auth/', data)
        .then((response)=>{

            sessionStorage.token = response.data.token


            const accessToken = response.data.token

            const tokenAxios = axios.create({

                baseURL: 'http://localhost:8000/',
                headers: {
                    Authorization: `Token ${accessToken}`,
                },
    
            })

            tokenAxios.get(`users/${data.username}/`)
            .then((response)=>{
                sessionStorage.username = response.data.username
                sessionStorage.nome_guerra = response.data.nome_guerra
                sessionStorage.perfil = response.data.perfil
                sessionStorage.posto = response.data.posto
                sessionStorage.pass = data.password
                sessionStorage.acessoNovo = response.data.primeiro_acesso
                // eslint-disable-next-line no-restricted-globals
                location.assign('home')
            
            })
            .catch(()=>{
                alert('Erro de comunicação com o servidor')
                sessionStorage.clear()
            })
            
        })
        .catch(()=>{
            
            let senhaIvalida = document.getElementById('senha-invalida')
            senhaIvalida.style.display = 'block'

        }) 

    }

    const onSubmit = data => postData(data)

    return(

        <section className='pagina-login'>
            <h1 className='titulo-login'>Sistema de Controle de Estoque</h1>
            <div className='area-login'>
                <form className='form-login' onSubmit={handleSubmit(onSubmit)}>
                    <div className='inputs-login primeiro-el-login'>
                        <div className='separador-esquerdo-log-pass'><label htmlFor='input-login' className='label-login'>Login:</label></div>
                        <div className='separador-direito-log-pass'>
                            <input
                                type='text'
                                id='input-login'
                                className='input-login-senha'
                                name = 'username' 
                                {...register('username')}
                                >
                            </input>
                            <p className='erro-validacao'>{errors.username?.message}</p>
                        </div>         
                    </div>
                    <div className='inputs-login'>
                        <div className='separador-esquerdo-log-pass'><label htmlFor='input-senha' className='label-login'>Senha:</label></div>
                        <div className='separador-direito-log-pass'>
                            <input
                                type='password'
                                id='input-senha'
                                className='input-login-senha'
                                name = 'password' 
                                {...register('password')}
                                >
                            </input>
                            <p className='erro-validacao'>{errors.password?.message}</p>
                        </div>         
                    </div>
                    <div className='center-button-login'>
                        <button className='button-login'>Entrar</button>
                    </div>
                    <p id='senha-invalida' className='senha-invalida'>Credenciais inválidas!</p>
                </form>
            </div>
        </section>
            

    )

}
