const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../credentials/algorithmia').apiKey

function robot(content) {
  fetchContentFromWikipedia(content)
  // sanitizeContent(content)
  // breakContentIntoSentences(content)

  function fetchContentFromWikipedia(content) {
    // Autenticação no algorithmia
    const algorithmiaAuthenticated = algorithmia('API KEY TEMPORARIA')
    // Definição do algoritmo do wikipedia
    const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
    // Execução da pesquisa do termo
    const wikipediaResponse = wikipediaAlgorithm.pipe(content.searchTerm)
    // Captura do texto sobre o assunto informado
    const wikipediaContent = wikipediaResponse.get()
    console.log(wikipediaContent)
  }
}

module.exports = robot