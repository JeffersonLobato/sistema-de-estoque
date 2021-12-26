<h1>Sistema de controle de estoque</h1>

<p>O Sistema de controle de estoque foi feito para suprir a necessidade de um determinado local,
porém pode ser adaptado a outras situações.</p>

<p>Possui vídeo demonstrativo ao final desse readme.</p>

<p>Backend em Python com DJANGO e DJANGO RESTFRAMEWORKING.</p>

<p>Frontend em React.JS.</p>

<p>Código ainda não refatorado.</p>

<p>Os campos das tabelas podem ser trocados de acordo com a necessidade direto nos models criados no DJANGO.</p>

<p>Atente para o seguinte, alguns campos são preenchidos automaticamente de acordo com as funções dentro das Views.</p>

<p>O Campo retmensal corresponde a Retirada Mensal de material do estoque, no cadastro inicial do item, esse campo
é preenchido pelo usuário do sistema, contudo, após 90 dias de registros, ele é preenchido com base na média
de saídas de itens por mês.</p>

<p>O campo Ficha, corresponde a um número único do item, como um id, cada item tem seu número de ficha exclusivo.</p>

<p>A soma e retirada de itens, é feita no frontend, mas isso pode ser alterado, se o sistema for usado em grande escala,
com vários usuários simultâneos, o ideal é que o cálculo de saída e entrada de material sejam feitos no backend.</p>

******************************************************

<p>API - Controle de Estoque</p>

<p>A API foi feita em DJANGO, para utilizalá-la,
deverá instalar o DJANGO (sugiro dentro de uma VENV).</p>

<p>Crie um banco de dados MYSQL.</p>

<p>Altere as informações do banco de dados no arquivo settings.py
no DJANGO.</p>

<p>Faça as migrations</p>


<h3>********** COMO UTILIZAR A API ***********************</h3>

<h4>Consultar Recursos</h4>

-> Para conseguir um token

	Método POST
	(endereço da api)/api-token-auth/

	enviar:

		username
		password

-> Para consumir a API precisa enviar o token.

Ex.:
Authorization: Token 995959595sadasdasd959595as9das95959


<p>Obs.: Para fins de segurança, apesar de que o ideal é trafegar
os dados via https, coloquei no front-end, tanto para criar um novo usuário,
quanto para fazer login, uma conversão do texto claro para sha-256, então
a senha criada pelo painel administrador do Django será diferente da senha
criada pelo Adm do front, fiz isso, pois para o caso específico em que eu 
estava trabalhando, essa era a melhor solução. Contudo, é necessário ter dois
perfis de Adm, um do administrador Django (superuser) criado no terminal e
outro no frontend para fins de criação e controle de novos usuários.</p>

-> Pegar todos os elementos de uma
tabela do banco de dados:

	Método GET
	(endereço da api)/users
	(endereço da api)/itens
	(endereço da api)/edicao

-> Pegar um usuário específico
	
	Método GET
	(endereço da api)/users/?nome=lobato
	
	pode ser nome ou qualquer campo do banco

	se eu quiser outra tabela basta substituir
	users

-> Fazer busca por qualquer campo da tabela pelo valor

	Método GET
	(endereço da api)/users/?search=lobato
	
	pode ser nome ou qualquer campo do banco
	
	não precisa ser o nome completo

	se eu quiser outra tabela basta substituir
	users
	
	OBS: TABELA USERS SÓ É POSSÍVEL BUSCAR
	PELO NOME OU PERFIL

-> Criar novas linhas

	Método POST
	(endereço da api)/users/

	enviar todos os campos da tabela com seus
	respectivos valores

	se eu quiser outra tabela basta substituir
	users

-> Alterar uma linha inteira da tabela

	Método PUT
	(endereço da api)/users/nome/ -> users
	ou
	(endereço da api)/itens/ficha/ -> itens
	ou
	(endereço da api)/users/1/ -> edicao
	
	onde 1 é o id do elemento

	enviar todos os elementos

-> Alterar apenas um elemento ou alguns elementos,
mas não todos

	Método PATCH
	(endereço da api)/users/nome/ -> users
	ou
	(endereço da api)/itens/ficha/ -> itens
	ou
	(endereço da api)/users/1/ -> edicao
	
	onde 1 é o id, nome é o valor do campo nome,
	e ficha é o valor do campo ficha
	
	enviar apenas os elementos alterados

-> Deletar uma linha da tabela

	Método DELETE
	(endereço da api)/users/nome/ -> users
	ou
	(endereço da api)/itens/ficha/ -> itens
	ou
	(endereço da api)/users/1/ -> edicao
	
	onde 1 é o id, nome é o valor do campo nome,
	e ficha é o valor do campo ficha

-> campos dos itens

	ficha
	setor
	descricao
	quantidade
	data
	retmensal


<h3>Segue um vídeo explicativo sobre o projeto:</h3>

[![Alt text](https://img.youtube.com/vi/0nkebcUJhKs/0.jpg)](https://www.youtube.com/watch?v=0nkebcUJhKs)