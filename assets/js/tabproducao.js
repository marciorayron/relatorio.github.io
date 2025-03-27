const tabela = document.getElementById("tabelaProducao");

// Função para calcular a produção (horas montagem e horas padrão)
function calcularProducao(tempoMont, tempoStd, pecas) {
    const hrsMont = tempoMont * pecas;
    const hrsStd = tempoStd * pecas;
    return { hrsMont, hrsStd };
}

// Função para adicionar uma linha na tabela com os dados calculados
function adicionarLinhaTabela(matchingValue, pecasValue) {
    const newRow = tabela.insertRow();

    // Adiciona os valores à nova linha da tabela
    newRow.insertCell(0).textContent = matchingValue.derivativo;
    newRow.insertCell(1).textContent = matchingValue.tempomont;
    newRow.insertCell(2).textContent = matchingValue.tempostd;
    newRow.insertCell(3).textContent = pecasValue;

    // Calcula as horas e insere na nova linha
    const horas = calcularProducao(matchingValue.tempomont, matchingValue.tempostd, pecasValue);
    newRow.insertCell(4).textContent = horas.hrsMont.toFixed(4);
    newRow.insertCell(5).textContent = horas.hrsStd.toFixed(4);

    // Adiciona a célula de botões (editar e excluir)
    const btnCell = newRow.insertCell(6);

    // Botão de editar
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.onclick = () => editarPecas(newRow, matchingValue);
    btnCell.appendChild(btnEditar);

    // Botão de excluir
    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.onclick = () => excluirLinha(newRow);
    btnCell.appendChild(btnExcluir);
}

// Função para editar a quantidade de peças
function editarPecas(row, matchingValue) {
    // Obtém a célula com o valor de peças
    const pecasCell = row.cells[3];
    const pecasAtual = parseInt(pecasCell.textContent);

    // Cria um input para editar a quantidade de peças
    const inputPecas = document.createElement("input");
    inputPecas.type = "number";
    inputPecas.value = pecasAtual;
    
    // Substitui o texto da célula por um campo de input
    pecasCell.innerHTML = "";
    pecasCell.appendChild(inputPecas);

    // Cria um botão para confirmar a alteração
    const btnConfirmar = document.createElement("button");
    btnConfirmar.textContent = "Confirmar";
    btnConfirmar.onclick = () => confirmarEdicao(row, inputPecas.value, matchingValue);
    pecasCell.appendChild(btnConfirmar);
}

// Função para confirmar a edição da quantidade de peças
function confirmarEdicao(row, novoValor, matchingValue) {
    // Atualiza a quantidade de peças
    row.cells[3].textContent = novoValor;

    // Recalcula as horas e atualiza a tabela
    const horas = calcularProducao(matchingValue.tempomont, matchingValue.tempostd, novoValor);
    row.cells[4].textContent = horas.hrsMont.toFixed(4);
    row.cells[5].textContent = horas.hrsStd.toFixed(4);
}

// Função para excluir a linha
function excluirLinha(row) {
    tabela.deleteRow(row.rowIndex);
}


// Função para buscar os dados do arquivo JSON e inserir na tabela
function enviarParaArquivoJson() {
    const derivativoValue = parseInt(document.getElementById("formprod-derivativo").value);
    const pecasValue = parseInt(document.getElementById("formprod-pecas").value);

    fetch('valores_predefinidos.json')
        .then(response => response.json())
        .then(jsonData => {
            // Busca o item que corresponde ao derivativo selecionado
            const matchingValue = jsonData.valores.find(item => item.derivativo === derivativoValue);

            if (matchingValue) {
                // Se encontrado, adiciona uma linha na tabela
                adicionarLinhaTabela(matchingValue, pecasValue);
            } else {
                // Caso não encontrado, exibe uma mensagem de erro
                alert("Valor derivativo não encontrado no arquivo JSON.");
            }
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo JSON:', error);
        });
}

// Atribui a função ao evento de clique do botão
document.getElementById("btnAdicionar").addEventListener("click", enviarParaArquivoJson);

// Função para calcular os totais de peças, horas montagem e horas padrão
function calcularTotais() {
    let totalPecas = 0;
    let totalHrsMont = 0;
    let totalHrsStd = 0;

    // Seleciona todas as linhas da tabela "tabelaProducao" (exceto a primeira linha de cabeçalho)
    const linhas = tabela.querySelectorAll('tr');
    
    // Itera sobre as linhas e soma os valores das células
    linhas.forEach((linha, index) => {
        if (index === 0) return; // Ignora a primeira linha (cabeçalho)

        const celulas = linha.querySelectorAll('td');
        
        // Acessa os valores das células e converte para número
        const pecas = parseFloat(celulas[3].textContent);
        const hrsMont = parseFloat(celulas[4].textContent);
        const hrsStd = parseFloat(celulas[5].textContent);
        
        // Soma os valores aos totais
        totalPecas += pecas;
        totalHrsMont += hrsMont;
        totalHrsStd += hrsStd;
    });

    // Atualiza os elementos da tabela com os totais calculados
    document.getElementById('total_pecas').textContent = totalPecas;
    document.getElementById('total_hrs_mont').textContent = totalHrsMont.toFixed(4);
    document.getElementById('total_hrs_std').textContent = totalHrsStd.toFixed(4);
}
