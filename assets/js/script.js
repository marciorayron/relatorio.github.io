// Função que executa todas as operações de cálculo
function calcularTudo() {
        atualizarTabela();
        calcularTotais();
        calcularHoras();
        calcularValores();
    }
    
    // Adiciona o evento de clique para o botão
    document.getElementById("btnCalcular").addEventListener("click", calcularTudo);
    