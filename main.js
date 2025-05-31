const apiKey = '2f5fc274fb8a5c3125737379'; // Chave da API
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`; // Corrigido o nome da variável apiKey

// Função para buscar a taxa de câmbio da API
async function getExchangeRate(daMoeda, paraMoeda) {
    try {
        const response = await fetch(`${apiUrl}${daMoeda}`);
        const data = await response.json();

        if (data.result === "success") {
            return data.conversion_rates[paraMoeda]; // Retorna a taxa de conversão da moeda para o valor desejado
        } else {
            throw new Error('Erro ao buscar as taxas de câmbio');
        }
    } catch (error) {
        console.error("Erro:", error);
        return null; // Retorna null caso haja algum erro
    }
}

document.getElementById('currency-form').addEventListener('submit', async function (event) {
    event.preventDefault();
   
    const valor = parseFloat(document.getElementById('amount').value); // Certifique-se de que o valor é um número
    const daMoeda = document.getElementById('daMoeda').value;
    const paraMoeda = document.getElementById('paraMoeda').value;

    // Buscar taxa de câmbio da API
    const exchangeRate = await getExchangeRate(daMoeda, paraMoeda);

    if (exchangeRate) {
        const valorConvertido = valor * exchangeRate; // Calculando o valor convertido

        // Exibir o resultado
        const conversao = document.getElementById('conversao');
        conversao.textContent = `Resultado: ${valorConvertido.toFixed(2)} ${paraMoeda}`; // Exibe com 2 casas decimais
    } else {
        alert("Erro ao buscar a taxa de câmbio. Tente novamente.");
    }
});
