const robots = {
  userInput: require('./robots/user-input.js'),
  text: require('./robots/text')
}

function start() {
  const content = {}

  robots.userInput(content)
  robots.text(content)
}

start()