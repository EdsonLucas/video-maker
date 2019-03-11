const readline = require('readline-sync')
const robots = {
  userInput: require('./robots/user-input.js'),
  text: require('./robots/text')
}

function start() {

  robots.userInput(content)
  robots.text(content)

}

start()