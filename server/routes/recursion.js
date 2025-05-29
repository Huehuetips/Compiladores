const recursionController = require("../controllers/recursionController")

async function recursionRoute(fastify, options) {
  fastify.post("/recursion", recursionController)
}

module.exports = recursionRoute
