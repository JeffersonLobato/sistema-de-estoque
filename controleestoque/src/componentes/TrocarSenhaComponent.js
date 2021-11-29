import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import sha256 from 'crypto-js/sha256'
import axios from 'axios'

const schema = yup.object({
    senhaAtual: yup.string()
    .required('Preenchimento obrigatório'),
    senhaNova: yup.string()
    .required('Preenchimento obrigatório')
    .min(6, 'Senha muito curta')
    .matches(/[a-z]/, 'Sua senha deve conter pelo menos uma letra minúscula')
    .matches(/[A-Z]/, 'Sua senha deve conter pelo menos uma letra maiúscula')
    .matches(/[0-9]/, 'Sua senha deve conter pelo menos um número'),
    senhaNovaRepita: yup.string()
    .oneOf([yup.ref('senhaNova'), null], 'As senhas não são iguais')
   
 }).required()

export default function TrocarSenhaComponent(){

    const{ register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema)
    })
    
    const postData = (data) =>{

        let senhaAtual = sha256(data.senhaAtual).toString()

        if(senhaAtual === sessionStorage.pass){
            
                const accessToken = sessionStorage.token
    
                const tokenAxios = axios.create({
    
                    baseURL: 'http://localhost:8000/',
                    headers: {
                        Authorization: `Token ${accessToken}`,
                    },
        
                })
    
                tokenAxios.get(`users/${sessionStorage.username}/`)
                .then((response)=>{
 
                    const trocaSenha = {
                        'id': response.data.id,
                        'password': sha256(data.senhaNovaRepita).toString(),
                        'primeiro_acesso': false
                    }

                    tokenAxios.patch(`users/${sessionStorage.username}/`, trocaSenha)
                    .then((response)=>{
                        sessionStorage.pass = sha256(data.senhaNovaRepita).toString()
                        sessionStorage.acessoNovo = false
                        alert(response.data)
                        // eslint-disable-next-line no-restricted-globals
                        location.assign('home')
                    })
                    .catch(()=>{
                        alert('Não foi possível atualizar senha.')
                    })
                    


                })
                .catch(()=>{
                    alert('Ocorreu um erro ao tentar alterar senha')
                })
            


            
        }else{
            alert('Verifique se o campo senha atual foi digitado corretamente.')
        }

    }

    const onSubmit = data => postData(data)

    return(

        <section className='trocar-senha'>
            <form className='form-Troca-Senha' onSubmit={handleSubmit(onSubmit)}>
                <div className='center-trocar-senha'>
                    <p>A senha deve ter obrigatoriamente o mínimo de 6 digitos, pela menos uma 
                        letra maiúscula, uma letra minúscula e um número. Caso esqueça a senha, 
                        fale com o administrador do sistema.
                    </p>

                    <div className='inputs-trocas-senhas'>
                        <div className='separador-esquerdo'><label htmlFor='input-trocar-senha'>Senha atual:</label></div>
                        <div className='separador-direito'>
                            <input
                                type='password'
                                id='input-trocar-senha'
                                className='input-trocar-senha'
                                name = 'senhaAtual' 
                                {...register('senhaAtual')} 
                                >
                            </input>
                            <p className='erro-validacao'>{errors.senhaAtual?.message}</p>
                        </div>         
                    </div>
    
                    <div className='inputs-trocas-senhas'>
                        <div className='separador-esquerdo'><label htmlFor='input-trocar-senha'>Nova Senha:</label></div>
                        <div className='separador-direito'>
                            <input
                                type='password'
                                id='input-trocar-senha'
                                className='input-trocar-senha'
                                name = 'senhaNova' 
                                {...register('senhaNova')} 
                                >
                                </input>
                                <p className='erro-validacao'>{errors.senhaNova?.message}</p>
                            </div>         
                    </div>
                    <div className='inputs-trocas-senhas'>
                        <div className='separador-esquerdo'><label htmlFor='input-trocar-senha'>Repita a nova senha</label></div>
                        <div className='separador-direito'>
                            <input
                                type='password'
                                id='input-trocar-senha'
                                className='input-trocar-senha'
                                name = 'senhaNovaRepita' 
                                {...register('senhaNovaRepita')} 
                                >
                                </input>
                                <p className='erro-validacao'>{errors.senhaNovaRepita?.message}</p>
                            </div>        
                    </div>
                    <div className='center-trocar-senha-button'>
                        <button type='submit' className='trocar-senha-button'>Salvar</button>
                    </div>
                </div>
            </form>
        </section>
            

    )

}
