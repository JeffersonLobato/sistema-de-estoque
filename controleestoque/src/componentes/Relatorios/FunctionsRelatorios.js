import { Chart, registerables } from "chart.js"
Chart.register(...registerables)



//Função para abrir o relatório ao clicar
export function openRelatorio(e){
    let canva = e

    let fundo = document.getElementById('fundo-relatorios')

    let canvas = document.getElementById(canva)
    let botaoAumentar = document.getElementById(canva).getElementsByClassName('aumentar-janela')
    let fechar = document.getElementById(canva).getElementsByClassName('fechar-relatorio')
    let titulo = document.getElementById(canva).getElementsByClassName('titulo-rel')
    let imprimir = document.getElementById(canva).getElementsByClassName('imprimir-rel')
    let quadroRelatorio = document.getElementsByClassName('quadro-relatorio')

    if(canva === 'canvas-relatorio3'){
        let select = document.getElementById('select-relatorio')
        let botaoSelect = document.getElementById('botao-select-relatorio')
        let canvasGrafico = document.getElementById('canvas-grafico')
        canvasGrafico.style.display = 'block'
        select.style.display = 'block'
        botaoSelect.style.display = 'block'
    }

    if(canva!=='canvas-relatorio3'){
        let relatorio = document.getElementById(canva).getElementsByClassName('relatorio-lista')
        for(let i = 0; i < relatorio.length; i=i+1){
            relatorio[i].style.display = 'flex'
        }
    }
    if(canva!=='canvas-relatorio3'){
        let bloco = document.getElementById(canva).getElementsByClassName('bloco-relatorio')
        bloco[0].style.display = 'block'
    }
    
    fechar[0].style.display = 'block'
    titulo[0].style.display = 'block'
    
    imprimir[0].style.display = 'block'
    botaoAumentar[0].style.display = 'none'
    
    for(let i = 0; i < quadroRelatorio.length; i=i+1){
        if(canva === 'canvas-relatorio1'){
            quadroRelatorio[0].style.display = 'block'
            quadroRelatorio[1].style.display = 'none'
            quadroRelatorio[2].style.display = 'none'
            quadroRelatorio[3].style.display = 'none'
            quadroRelatorio[4].style.display = 'none'
            quadroRelatorio[5].style.display = 'none'

        }
        else if(canva === 'canvas-relatorio2'){
            quadroRelatorio[0].style.display = 'none'
            quadroRelatorio[1].style.display = 'block'
            quadroRelatorio[2].style.display = 'none'
            quadroRelatorio[3].style.display = 'none'
            quadroRelatorio[4].style.display = 'none'
            quadroRelatorio[5].style.display = 'none'
        }
        else if(canva === 'canvas-relatorio3'){
            quadroRelatorio[0].style.display = 'none'
            quadroRelatorio[1].style.display = 'none'
            quadroRelatorio[2].style.display = 'block'
            quadroRelatorio[3].style.display = 'none'
            quadroRelatorio[4].style.display = 'none'
            quadroRelatorio[5].style.display = 'none'
        }
        else if(canva === 'canvas-relatorio4'){
            quadroRelatorio[0].style.display = 'none'
            quadroRelatorio[1].style.display = 'none'
            quadroRelatorio[2].style.display = 'none'
            quadroRelatorio[3].style.display = 'block'
            quadroRelatorio[4].style.display = 'none'
            quadroRelatorio[5].style.display = 'none'
        }
        else if(canva === 'canvas-relatorio5'){
            quadroRelatorio[0].style.display = 'none'
            quadroRelatorio[1].style.display = 'none'
            quadroRelatorio[2].style.display = 'none'
            quadroRelatorio[3].style.display = 'none'
            quadroRelatorio[4].style.display = 'block'
            quadroRelatorio[5].style.display = 'none'
        }
        else if(canva === 'canvas-relatorio6'){
            quadroRelatorio[0].style.display = 'none'
            quadroRelatorio[1].style.display = 'none'
            quadroRelatorio[2].style.display = 'none'
            quadroRelatorio[3].style.display = 'none'
            quadroRelatorio[4].style.display = 'none'
            quadroRelatorio[5].style.display = 'block'
        }
    } 


    fundo.style.display = 'block'
    fundo.style.position = 'absolute'
    fundo.style.width = '100vw'
    fundo.style.height = '100vh'
    fundo.style.top = '0'
    fundo.style.left = '0'
    fundo.style.zIndex = '1999'
    fundo.style.backgroundColor = 'rgb(0,0,50)'

    canvas.style.height = '90%'
    canvas.style.width = '80%'
    canvas.style.position = 'fixed'
    canvas.style.zIndex = '2000'
    canvas.style.backgroundImage = 'linear-gradient(to top, rgb(255,255,255), rgb(240,240,240) 100%)' 
    canvas.style.top = '5%'
    canvas.style.left = '10%'

}


//Função para fechar o relatório, na verdade essa função apenas atualiza a página,
//fazendo com que todos os elementos visuais voltem ao CSS original
export function closeRelatorio(){

    
    // eslint-disable-next-line no-restricted-globals
    location.reload()

}


//Função para imprimir
export function imprimirRelatorio(){

    window.print()

}


//Função para exportar para excel
export function exportTable(e){

    let exportar = document.getElementById(e).getElementsByClassName('exportar-excel')[0]

    let tableRows = document.getElementById(e).querySelectorAll('tr')

    
    const conteudo =  Array.from(tableRows)
                            .map(row => Array.from(row.cells)
                                .map(cell => cell.textContent)
                                .join(';')
                            )
                            .join('\n')

    exportar.setAttribute(
        'href',
        `data:text/csvcharset=utf-8, ${encodeURIComponent(conteudo)}`
    )

    exportar.setAttribute(
        'download',
        'relatorio.csv'
    )

}

//Função para organizar os itens por setor
export function organizarRelatorio(itens){
    
    let itensOrg = []

    
    // eslint-disable-next-line array-callback-return
    itens.map((item)=>{
        if(item.setor==='Limpeza'){
            itensOrg.push(item)
    }})
    

    // eslint-disable-next-line array-callback-return
    itens.map((item)=>{
        if(item.setor==='Obras'){
            itensOrg.push(item)
    }})


    // eslint-disable-next-line array-callback-return
    itens.map((item)=>{
        if(item.setor==='Expediente'){
            itensOrg.push(item)
    }})



    return itensOrg

}

//Função ordenar os itens por estimativa de término de estoque
export function itensEsgotar(itens){

    let itensEsg = []
    let itensOrdenados = []

    // eslint-disable-next-line array-callback-return
    itens.map((item)=>{
        
        let dias = parseInt(item.quantidade/(item.retmensal/30))

        let objeto = {
            'ficha': item.ficha,
            'setor': item.setor,
            'descricao': item.descricao,
            'quantidade': item.quantidade,
            'dias': dias
        }

        itensEsg.push(objeto)
      
    })
    let tamanho = itensEsg.length
    let i = 0
    while(itensOrdenados.length < tamanho){
        let menorItem = itensEsg[0]
        for(let c = 0; c < itensEsg.length; c = c+1){
            if(itensEsg[c].dias < menorItem.dias){
                menorItem = itensEsg[c]
            }
        }
        
        itensEsg.splice(itensEsg.indexOf(menorItem), 1)

        itensOrdenados.push(menorItem)
        i = i+1
    }

    return itensOrdenados
}

//Função para colorir as linhas dos itens da estimativa de término de estoque
//quanto mais próximo de acabar, mais próximo do vermelho
export function backgroundLineColor(i, dias){
    let linha = document.getElementById(i)
    if(linha){
        if(dias <= 180){
            let g = parseInt((255/180)*dias)
            let b = parseInt(dias)
            linha.style.backgroundColor = 'rgb(255,'+g+','+b+')'
            
        }
    }

}


//Função para organizar os itens do gráfico do relatório 3
export function itensGrafico(itens){
    
    let secao = []

    // eslint-disable-next-line array-callback-return
    itens.map((item)=>{
        if(item.acao === 'Retirada'){
            secao.push(item)
        }})
  
    return secao


}

//Função para agrupar itens por seção
export function agruparSecao(secao, itens){

    let listaItens = []

    // eslint-disable-next-line array-callback-return
    itens.map((item)=>{
        
        if(item.secao === secao){
            const found = listaItens.find(element => element.descricao === item.descricao)

            if(found){
                listaItens.forEach(element => {
                    if(element.descricao===item.descricao){
                        element.quantidadeAcao = element.quantidadeAcao + item.quantidadeAcao
                    }                
                })
            }else{
                listaItens.push(item)
            }
        }
    })

    return listaItens
}


//Função para gerar gráfico
export function gerarGrafico(secao, itens){
    
    let listaItens = agruparSecao(secao, itens)

    let labelItens = []
    let quantItens = []
    let cores = []
    let borderCores = []

    listaItens.forEach(element => {
        labelItens.push(element.descricao)
        quantItens.push(element.quantidadeAcao)
        
        let min = Math.ceil(1);
        let max = Math.floor(6);
        let num = Math.floor(Math.random() * (max - min + 1)) + min
        
        if(num === 1){
            cores.push('rgba(255, 99, 132, 0.2)')
            borderCores.push('rgba(255, 99, 132, 1)')
        }
        else if(num === 2){
            cores.push('rgba(54, 162, 235, 0.2)')
            borderCores.push('rgba(54, 162, 235, 1)')
        }
        else if(num === 3){
            cores.push('rgba(255, 206, 86, 0.2)')
            borderCores.push('rgba(255, 206, 86, 1)')
        }
        else if(num === 4){
            cores.push('rgba(75, 192, 192, 0.2)')
            borderCores.push('rgba(75, 192, 192, 1)')
        }
        else if(num === 5){
            cores.push('rgba(153, 102, 255, 0.2)')
            borderCores.push('rgba(153, 102, 255, 1)')
        }
        else if(num === 6){
            cores.push('rgba(255, 159, 64, 0.2)')
            borderCores.push('rgba(255, 159, 64, 1)')
        }
        
        
    })
    if(window.myChart instanceof Chart){
        window.myChart.destroy()
    }

    const ctx = document.getElementById("grafico").getContext("2d")
    // eslint-disable-next-line no-unused-vars
    window.myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labelItens,
        datasets: [{
            label: secao,
            data: quantItens,
            backgroundColor: cores,
            borderColor: borderCores,
            borderWidth: 1
        }]
    },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })


}
