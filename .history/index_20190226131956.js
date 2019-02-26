function start() {

  const content = {}

  content.searchTerm = askAndReturnSearchTerm()

  function askAndReturnSearchTerm() {
    return 'Term Example'
  }

  console.log(content)

}

start()