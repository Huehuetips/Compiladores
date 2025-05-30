const tableController = require('../controllers/tableController')

async function tableRoutes(fastify, options) {
  fastify.post('/table', tableController)
}

module.exports = tableRoutes
