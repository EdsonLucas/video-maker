const robots = {
  userInput: require('./robots/user-input.js'),
  text: require('./robots/text')
}

async function start() {
  const content = {}

  await robots.userInput(content)
  robots.text(content)
}

start()