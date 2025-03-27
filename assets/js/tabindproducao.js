function calcularValores() {
    // Calcular absenteísmo
    const pessoa1 = parseFloat(document.getElementById("Tab-mannig").textContent);
    const faltas = parseFloat(document.getElementById("tab-Faltas").textContent);
    const absenteismoResult = (faltas / pessoa1) * 100;
    document.getElementById("absenteismo-real").textContent = `${absenteismoResult.toFixed(2)}%`;

    // Calcular primeira hora
    const primeiraHoraQntReal = parseFloat(document.getElementById("formprod-qntRealPecas1hr").value);
    const primeiraHoraQntMeta = parseFloat(document.getElementById("formprod-metaPecas1hr").value);
    const primeiraHoraPorcenResult = (primeiraHoraQntReal / primeiraHoraQntMeta) * 100;
    
    // Atualiza a tabela com os valores de primeira hora
    document.getElementById("primeira-hora-porcen-real").textContent = `${primeiraHoraPorcenResult.toFixed(2)}%`;
    document.getElementById("tab-PrimeiraHoraQntReal").textContent = primeiraHoraQntReal;
    document.getElementById("tab-PrimeiraHoraQntMeta").textContent = primeiraHoraQntMeta;

    // Calcular a aderência
    const pecasProgramadas = parseFloat(document.getElementById("formprod-pecasProgramadas").value);
    const totalPecas = parseFloat(document.getElementById("total_pecas").textContent);
    const aderenciaReal = (totalPecas / pecasProgramadas) * 100;
    document.getElementById("aderencia-real").textContent = `${aderenciaReal.toFixed(2)}%`;

    // Calcular a eficiência
    const totalHrsMont = parseFloat(document.getElementById("total_hrs_mont").textContent);
    const totalHoras = parseFloat(document.getElementById("tab-TotalHRH").textContent);
    const eficienciaReal = (totalHrsMont / totalHoras) * 100;
    document.getElementById("eficiencia-real").textContent = `${eficienciaReal.toFixed(2)}%`;
}
