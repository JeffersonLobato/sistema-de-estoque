import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Main from './pages/Main';
import Cadastro from './pages/Cadastro';
import Consulta from './pages/Consulta';
import ConsultaUsuarios from './pages/ConsultaUsuarios';
import Incluir from './pages/Incluir';
import Login from './pages/Login';
import Relatorios from './pages/Relatorios';
import TrocarSenha from './pages/TrocarSenha';

export default function Routes(){

    return(

        <BrowserRouter>
            <Switch>
                <Route path='/home' exact component={Main} />
                <Route path='/cadastro' exact component={Cadastro}/>
                <Route path='/consulta' exact component={Consulta}/>
                <Route path='/consulta-usuarios' exact component={ConsultaUsuarios}/>
                <Route path='/incluir' exact component={Incluir}/>
                <Route path='/' exact component={Login}/>
                <Route path='/relatorios' exact component={Relatorios}/>
                <Route path='/trocar-senha' exact component={TrocarSenha}/>
            </Switch>

        </BrowserRouter>
    )

}