const { calcularPrimero, convertirProduccionesPlano } = require("../utils/firstUtil")

module.exports = async function (req, reply) {
  try {
    const { producciones } = req.body
    if (!producciones || !Array.isArray(producciones)) {
      throw new Error("El campo 'producciones' es requerido y debe ser un array.")
    }
    const produccionesMap = convertirProduccionesPlano(producciones)
    const primero = calcularPrimero(produccionesMap)
    reply.type("application/json").send({ primero })
  } catch (err) {
    reply.code(400).send({ error: err.message })
  }
}
