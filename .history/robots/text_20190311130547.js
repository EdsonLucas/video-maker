const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../credentials/algorithmia').apiKey

async function robot(content) {
  await fetchContentFromWikipedia(content)
  // sanitizeContent(content)
  // breakContentIntoSentences(content)

  async function fetchContentFromWikipedia(content) {
    // Autenticação no algorithmia
    const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
    // Definição do algoritmo do wikipedia
    const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
    // Execução da pesquisa do termo
    const wikipediaResponse = await wikipediaAlgorithm.pipe(content.searchTerm)
    // Captura do texto sobre o assunto informado
    const wikipediaContent = wikipediaResponse.get()
    console.log(wikipediaContent)
  }
}

module.exports = robot