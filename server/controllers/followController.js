const { calcularSiguiente, convertirProduccionesPlano } = require('../utils/followUtil');
const { calcularPrimero } = require('../utils/firstUtil');

module.exports = async function (req, reply) {
  try {
    const { producciones } = req.body;

    if (!producciones || !Array.isArray(producciones)) {
      throw new Error("El campo 'producciones' es requerido y debe ser un array.");
    }

    const produccionesMap = convertirProduccionesPlano(producciones);
    const primero = calcularPrimero(produccionesMap); // ¡Necesario para FOLLOW!
    const siguiente = calcularSiguiente(produccionesMap, primero);

    reply.type("application/json").send({ siguiente });
  } catch (err) {
    reply.code(400).send({ error: err.message });
  }
};
