const { removeLeftRecursion, formatProductionsAsText } = require("../utils/recursionUtil")

module.exports = async function (req, reply) {
  try {
    const { variables, producciones } = req.body
    if (!variables || !producciones) {
      throw new Error("Los campos 'variables' y 'producciones' son requeridos.")
    }

    const result = removeLeftRecursion(variables, producciones)
    const output = formatProductionsAsText(result)

    reply.type("text/plain").send(output)
  } catch (err) {
    reply.code(400).send({ error: err.message })
  }
}
