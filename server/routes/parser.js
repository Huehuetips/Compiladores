const parserController = require("../controllers/parserController")

async function parserRoute(fastify, options) {
  fastify.post("/analyze", parserController.analyze)
}

module.exports = parserRoute
