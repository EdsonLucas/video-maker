const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../credentials/algorithmia').apiKey
const sentenceBoundaryDetection = require('sbd')

async function robot(content) {
  await fetchContentFromWikipedia(content)
  sanitizeContent(content)
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

    content.sourceContentOriginal = wikipediaContent.content
  }

  function sanitizeContent(content) {
    const withoutBlankLinesAndMarkdown = removeBlankLinesAndMarkdown(content.sourceContentOriginal)
    const withoutDatesInParentheses = removeDatesInParentheses(withoutBlankLinesAndMarkdown)

    content.sourceContentSanitized = withoutDatesInParentheses

    function removeBlankLinesAndMarkdown(text) {
      const allLines = text.split('\n')

      const withoutBlankLinesAndMarkdown = allLines.filter((line) => {
        if (line.trim().length === 0 || line.trim().startsWith('=')) {
          return false
        }

        return true
      })

      return withoutBlankLinesAndMarkdown.join(' ')
    }
  }

  function removeDatesInParentheses(text) {
    return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g, ' ')
  }

  function breakContentIntoSentences(content) {
    const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanitized)
    console.log(sentences)
  }

}

module.exports = robot