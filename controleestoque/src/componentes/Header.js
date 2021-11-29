import React from 'react';
import {Link} from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import styled from 'styled-components';


const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

export default function Header(){

    const sair = () =>{
        sessionStorage.clear()
    }
    const perfil = String(sessionStorage.perfil)

    const verificaPerfil = () =>{
       
        if(perfil === 'Administrador'){

            let flutuanteAdm = document.getElementById('div-flutuante-admin')
            flutuanteAdm.style.display = 'block'
        }
    

    }

    const fechaSession = () =>{
        sessionStorage.clear()
    }

    const expiraSession = () =>{
        setTimeout(fechaSession, 3600000)
    }

    useEffect(()=>{
        verificaPerfil()
    },[])

    return(
        <header>
            {expiraSession()}
            <nav>
                <div className="center-menu">

                        <ul className='menu-header'>
                            <div className='menu-flutuante-gerenciar-div'>
                                <li className='header-li'>Gerenciar</li>
                                    <ul className='menu-header-list-flutuante menu-flutuante-gerenciar'>
                                        <StyledLink to='/consulta'><li className='menu-list-flutuante'>Consultar</li></StyledLink>
                                     
                                        <StyledLink to='/incluir'><li className='menu-list-flutuante'>Incluir</li></StyledLink>
                                    </ul>
                            </div>

                            <div>
                                <StyledLink to='/relatorios'><li className='header-li header-espaco-menu'>Relatórios</li></StyledLink>
                            </div>
                            
                            <div>
                                <StyledLink to='/trocar-senha'><li className='header-li header-espaco-menu'>Perfil</li></StyledLink>
                                
                            </div>
                            
                            <div id='div-flutuante-admin' className='menu-flutuante-adm-div'>
                                <li className='header-li header-espaco-menu menu-admin'>Adm</li>
                                    <ul className='menu-header-list-flutuante menu-flutuante-adm'>
                                        <StyledLink to='/cadastro'><li className='menu-list-flutuante'>Cadastrar usuário</li></StyledLink>
                                        <StyledLink to='/consulta-usuarios'><li className='menu-list-flutuante'>Editar usuário</li></StyledLink>
                                    </ul>
                                
                            </div>
                            
                        </ul>

                        <StyledLink to='/' onClick={()=>sair()}>
                            <button className='button-sair'>
                                Sair
                            </button>
                        </StyledLink>
        

                </div>


                
                
            </nav>
        </header>
    )


}