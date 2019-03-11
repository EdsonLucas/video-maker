const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../credentials/algorithmia').apiKey

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
    const withouthBlankLines = removeBlankLines(content.sourceContentOriginal)
    const withoutMarkdown = removeMarkdown(withouthBlankLines)
    const withoutDatesInParentheses = removeDatesInParentheses(withoutMarkdown)
    console.log(withoutDatesInParentheses)

    function removeBlankLines(text) {
      const allLines = text.split('\n')

      const withouthBlankLines = allLines.filter((line) => {
        if (line.trim().length === 0) {
          return false
        }

        return true
      })

      return withouthBlankLines
    }

    function removeMarkdown(lines) {
      const withoutMarkdown = lines.filter((line) => {
        if (line.trim().startsWith('=')) {
          return false
        }

        return true
      })

      return withoutMarkdown
    }
  }
}

module.exports = robot