async function statusRoute(fastify, options) {
  fastify.get("/", async (request, reply) => {
    return { status: "OK", code: 200, message: "API ACTIVA" }
  })
}

module.exports = statusRoute
