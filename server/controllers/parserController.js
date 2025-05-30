const { parseGrammarFromText } = require("../utils/grammarUtils")

async function analyze(request, reply) {
  const contentType = request.headers["content-type"]

  let grammar = ""

  if (contentType.includes("application/json")) {
    grammar = request.body?.grammar
  } else if (contentType.includes("text/plain")) {
    grammar = request.body
  }

  if (!grammar || typeof grammar !== "string") {
    return reply.code(400).send({ error: "La gramática es requerida" })
  }

  try {
    const result = parseGrammarFromText(grammar)
    return {
      ...result,
      timestamp: new Date().toISOString()
    }
  } catch (err) {
    return reply.code(400).send({ error: err.message })
  }
}

module.exports = {
  analyze
}
