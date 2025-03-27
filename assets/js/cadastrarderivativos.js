let registros = [];

// Função para carregar os registros do arquivo JSON
function carregarRegistros() {
    fetch("valores_predefinidos.json")
        .then(response => response.json())
        .then(data => {
            registros = data.valores;
            atualizarListaSelecao(); // Atualiza a lista de seleção
            preencherListaRegistros(); // Preenche a lista com os registros
        })
        .catch(error => {
            console.error("Erro ao carregar registros:", error);
        });
}

// Função para cadastrar um registro
function cadastrarRegistro() {
    const valorDerivativo = parseFloat(document.getElementById("derivativoInput").value);
    const tempoMontagem = parseFloat(document.getElementById("tempoMontInput").value);
    const tempoStandard = parseFloat(document.getElementById("tempoStdInput").value);

    try {
        if (!isNaN(valorDerivativo) && !isNaN(tempoMontagem) && !isNaN(tempoStandard)) {
            const derivativoExistente = registros.find(registro => registro.derivativo === valorDerivativo);

            if (derivativoExistente) {
                alert("Derivativo já cadastrado.");
            } else {
                const novoRegistro = {
                    derivativo: valorDerivativo,
                    tempomont: tempoMontagem,
                    tempostd: tempoStandard
                };

                registros.push(novoRegistro);
                atualizarListaSelecao();
                preencherListaRegistros();

                document.getElementById("derivativoInput").value = "";
                document.getElementById("tempoMontInput").value = "";
                document.getElementById("tempoStdInput").value = "";

                alert("Cadastro realizado com sucesso.");
            }
        } else {
            alert("Preencha todos os campos com valores numéricos.");
        }
    } catch (error) {
        console.error("Erro ao cadastrar registro:", error);
    }
}

// Função para atualizar a lista de seleção (dropdown)
function atualizarListaSelecao() {
    const selecionarRegistro = document.getElementById("selecionarRegistro");
    selecionarRegistro.innerHTML = "";

    registros.forEach((registro, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `Registro ${index + 1}: Derivativo ${registro.derivativo}`;
        selecionarRegistro.appendChild(option);
    });
}

// Função para preencher a lista de registros
function preencherListaRegistros() {
    const ulElement = document.getElementById("valoresPredefinidos");
    ulElement.innerHTML = "";

    registros.forEach((registro, index) => {
        const liElement = document.createElement("li");
        liElement.textContent = `Registro ${index + 1}: Derivativo=${registro.derivativo}, Tempo Montagem=${registro.tempomont}, Tempo Standard=${registro.tempostd}`;
        ulElement.appendChild(liElement);
    });
}

// Função para excluir um registro
function excluirRegistro() {
    const selecionarRegistro = document.getElementById("selecionarRegistro");
    const selectedIndex = selecionarRegistro.selectedIndex;

    if (selectedIndex >= 0) {
        const registroExcluido = registros.splice(selectedIndex, 1)[0];
        alert(`O registro ${registroExcluido.derivativo} foi excluído com sucesso!`);
        atualizarListaSelecao();
        preencherListaRegistros();
    } else {
        alert("Selecione um registro para excluir.");
    }
}

// Função para salvar os registros em um arquivo JSON
function salvarRegistros() {
    const jsonData = JSON.stringify({ valores: registros });

    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "valores_predefinidos.json";
    a.textContent = "Download dos Registros";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Adicionando os eventos
document.getElementById("cadastrarButton").addEventListener("click", cadastrarRegistro);
document.getElementById("excluirButton").addEventListener("click", excluirRegistro);
document.getElementById("salvarButton").addEventListener("click", salvarRegistros);

// Carregar os registros ao carregar a página
carregarRegistros();
