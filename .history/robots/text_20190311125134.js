const algorithmia = require('algorithmia')

function robot(content) {
  fetchContentFromWikipedia(content)
  // sanitizeContent(content)
  // breakContentIntoSentences(content)

  function fetchContentFromWikipedia(content) {
    const algorithmiaAuthenticated = algorithmia('API KEY TEMPORARIA')
  }
}

module.exports = robot