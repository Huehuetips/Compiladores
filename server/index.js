const Fastify = require("fastify")
const cors = require("@fastify/cors")

const app = Fastify({ logger: true })

// Habilitar CORS
app.register(cors, {
  origin: "http://localhost:5173", // tu frontend
  methods: ["GET", "POST"]
})

// Rutas
app.register(require("./routes/status"))
app.register(require("./routes/parser"))
app.register(require("./routes/recursion"))
app.register(require("./routes/first"))
app.register(require("./routes/follow"))
app.register(require("./routes/table"))

// Iniciar servidor
const PORT = 3000
app.listen({ port: PORT }, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  console.log(`🚀 Servidor escuchando en: ${address}`)
})
