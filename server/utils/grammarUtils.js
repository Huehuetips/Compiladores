function splitLine(line) {
    if (line.includes("=")) return line.split("=")
    if (line.includes("->")) return line.split("->")
    throw new Error(`Producción inválida, se esperaba '=' o '->' en: "${line}"`)
}

function extractVariables(grammar) {
    const lines = grammar.split("\n").map(l => l.trim()).filter(Boolean)
    const variables = new Set()

    for (const line of lines) {
        const [left] = splitLine(line)
        if (!left) throw new Error(`Variable inválida en línea: "${line}"`)
        variables.add(left.trim())
    }

    return Array.from(variables)
}

function extractProductions(grammar) {
    const lines = grammar.split("\n").map(l => l.trim()).filter(Boolean)
    const productions = []

    for (const line of lines) {
        const [left, right] = splitLine(line)
        const variable = left.trim()
        const productionList = right.split("|").map(p => p.trim())

        productionList.forEach(prod => {
           productions.push({ variable, production: prod })
        })
    }

    return productions
}

function extractTerminals(grammar) {
    const lines = grammar.split("\n").map(l => l.trim()).filter(Boolean)
    const terminals = new Set()
    const variables = extractVariables(grammar)

    for (const line of lines) {
        const [_, right] = splitLine(line)
        const productionList = right.split("|").map(p => p.trim())

        productionList.forEach(prod => {
            // Encuentra todas las cadenas entre comillas simples
            const matches = prod.match(/'(.*?)'/g)

            if (matches) {
                matches.forEach(match => {
                    const terminal = match.replace(/'/g, "")
                    terminals.add(terminal)
                })
            }

            // Detecta caracteres que no están entre comillas
            const clean = prod.replace(/'(.*?)'/g, "") // remueve terminales
            const unquotedParts = clean.split(/\s+/).filter(Boolean)

            unquotedParts.forEach(token => {
                // Si no es una variable conocida y no es 'e' (épsilon), lanza advertencia
                if (!variables.includes(token) ) {
                    try {
                        decomposeIntoVariables(token, variables)
                    } catch (err) {
                        throw new Error(`Token "${token}" contiene subcadenas no válidas: ${err.message}`)
                    }
                }
            })
        })
    }

    return Array.from(terminals)
}
function isComposedOfVariables(token, variables) {
    // Intentamos encontrar una forma de dividir el token en variables válidas
    if (variables.includes(token)) return true

    // Uso de programación dinámica para validar segmentación (tipo Word Break Problem)
    const dp = new Array(token.length + 1).fill(false)
    dp[0] = true

    for (let i = 1; i <= token.length; i++) {
        for (let j = 0; j < i; j++) {
            const segment = token.substring(j, i)
            if (dp[j] && variables.includes(segment)) {
                dp[i] = true
                break
            }
        }
    }

    return dp[token.length]
}

function decomposeIntoVariables(token, variables) {
    // Permitir que 'e' (épsilon) pase directamente
    if (token === 'e') {
        return ['e']
    }
    const n = token.length
    const dp = Array(n + 1).fill(false)
    const backtrack = Array(n + 1).fill(-1)

    dp[0] = true

    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            const part = token.slice(j, i)
            if (dp[j] && variables.includes(part)) {
                dp[i] = true
                backtrack[i] = j
                break
            }
        }
    }

    if (!dp[n]) {
        // Buscamos dónde falló
        for (let i = n; i >= 0; i--) {
            if (backtrack[i] === -1 && i !== 0) {
                const unknown = token.slice(i - 1, i + 1)
                if (unknown === 'e') {
                    return ['e']
                }
                throw new Error(`"${unknown}" no es una variable conocida`)
            }
        }
        throw new Error(`"${token}" no se puede descomponer en variables conocidas`)
    }

    // Extraer secuencia si es válido (opcional)
    const result = []
    let i = n
    while (i > 0) {
        const j = backtrack[i]
        result.unshift(token.slice(j, i))
        i = j
    }

    return result
}



module.exports = {
    extractVariables,
    extractTerminals,
    extractProductions
}
