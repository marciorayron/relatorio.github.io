// Função para atualizar a tabela com base nos valores do formulário
function atualizarTabela() {
  // Obter os valores do formulário
  const formPessoas = {
      maningAtual: document.getElementById("formPessoas-maningAtual").value,
      faltas: document.getElementById("formPessoas-faltas").value,
      ferias: document.getElementById("formPessoas-ferias").value,
      emprestimos: document.getElementById("formPessoas-emprestimos").value,
  };

  // Obter as células da tabela "Pessoas"
  const tabPessoas = {
      maning: document.getElementById("Tab-mannig"),
      faltas: document.getElementById("tab-Faltas"),
      ferias: document.getElementById("tab-Ferias"),
      emprestimos: document.getElementById("tab-Emprestimos")
  };

  // Atualizar as células da tabela com os valores do formulário
  tabPessoas.maning.textContent = formPessoas.maningAtual;
  tabPessoas.faltas.textContent = formPessoas.faltas;
  tabPessoas.ferias.textContent = formPessoas.ferias;
  tabPessoas.emprestimos.textContent = formPessoas.emprestimos;

  // Limpeza dos campos de entrada no formulário (se necessário)
  // Como já foi comentado, caso queira, descomente as linhas abaixo
  // Object.values(formPessoas).forEach(input => input.value = "");
}


// Função para calcular as horas
function calcularHoras() {
  // Pegar os dados dos inputs e criar variáveis correspondentes
  const pessoa1 = parseFloat(document.getElementById("Tab-mannig").textContent);
  const faltas = parseFloat(document.getElementById("tab-Faltas").textContent);
  const ferias = parseFloat(document.getElementById("tab-Ferias").textContent);
  const emprestimos = parseFloat(document.getElementById("tab-Emprestimos").textContent);

  // Calcular total de faltas e férias
  const totalFaltas = faltas + ferias;

  // Calcular presentes
  const presentes = pessoa1 - totalFaltas + emprestimos;
  document.getElementById("tab-Presentes").textContent = presentes.toFixed(2);

  // Pegar o valor do turno e calcular total de horas
  const hr2t = parseFloat(document.getElementById("selectTurno").value);
  const totalHoras = presentes * hr2t;

  // Exibir total de horas
  document.getElementById("tab-TotalHRH").textContent = totalHoras.toFixed(2);
}
