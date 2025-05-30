const firstController = require('../controllers/firstController')

async function firstRoutes(fastify, options) {
  fastify.post('/first', firstController)
}

module.exports = firstRoutes
