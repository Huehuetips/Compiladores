const { calcularPrimero } = require('./firstUtil'); // <- Usa el mismo que ya tenés

function convertirProduccionesPlano(prods) {
  const resultado = {};
  for (const { variable, production } of prods) {
    let partes;
    if (Array.isArray(production)) {
      partes = production;
    } else if (production === "ε" || production === "e") {
      partes = [production];
    } else {
      partes = production
        .replace(/'/g, '')
        .trim()
        .split(/\s+/);
    }
    if (!resultado[variable]) resultado[variable] = [];
    resultado[variable].push(partes);
  }
  return resultado;
}

function calcularSiguiente(producciones, primero) {
  const siguiente = {};
  for (const variable in producciones) {
    siguiente[variable] = new Set();
  }

  const inicial = Object.keys(producciones)[0];
  siguiente[inicial].add('$');

  let cambio = true;
  while (cambio) {
    cambio = false;
    for (const variable in producciones) {
      producciones[variable].forEach(produccion => {
        for (let i = 0; i < produccion.length; i++) {
          const simbolo = produccion[i];
          if (producciones[simbolo]) {
            let siguienteTemporal = new Set();
            let epsilonEncontrado = true;

            for (let j = i + 1; j < produccion.length && epsilonEncontrado; j++) {
              const siguienteSimbolo = produccion[j];
              if (producciones[siguienteSimbolo]) {
                primero[siguienteSimbolo].forEach(s => {
                  if (s !== 'e') siguienteTemporal.add(s);
                });
                epsilonEncontrado = primero[siguienteSimbolo].includes('e');
              } else {
                siguienteTemporal.add(siguienteSimbolo);
                epsilonEncontrado = false;
              }
            }

            if (epsilonEncontrado || i === produccion.length - 1) {
              siguiente[variable].forEach(s => siguienteTemporal.add(s));
            }

            const sizeBefore = siguiente[simbolo].size;
            siguienteTemporal.forEach(s => siguiente[simbolo].add(s));
            if (siguiente[simbolo].size > sizeBefore) cambio = true;
          }
        }
      });
    }
  }

  const resultado = {};
  for (const variable in siguiente) {
    resultado[variable] = Array.from(siguiente[variable]);
  }

  return resultado;
}

module.exports = { calcularSiguiente, convertirProduccionesPlano, calcularPrimero };
