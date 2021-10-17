const handler = require('./handler')

const checkCommandDefinition = {
  command: 'check',
  description: 'Evaluate and report a proxy\'s current performance.',
  regex: /^\/check (.*)/u,
  argMapping: [null, 'proxyURL'],
  handler
}

module.exports = checkCommandDefinition
