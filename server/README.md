# Compilador API – Backend

Este proyecto implementa una API RESTful para el análisis y manipulación de gramáticas formales, orientada a la construcción de compiladores y autómatas. Permite analizar gramáticas, eliminar recursividad por la izquierda, calcular las funciones PRIMERO y SIGUIENTE, y construir la tabla de análisis LL(1).

---

## Tabla de Contenidos

- [Características](#características)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Endpoints de la API](#endpoints-de-la-api)
  - [GET /](#get-)
  - [POST /analyze](#post-analyze)
  - [POST /recursion](#post-recursion)
  - [POST /first](#post-first)
  - [POST /follow](#post-follow)
  - [POST /table](#post-table)
- [Ejemplo de Flujo de Trabajo](#ejemplo-de-flujo-de-trabajo)
- [Manejo de Errores](#manejo-de-errores)
- [Notas y Recomendaciones](#notas-y-recomendaciones)
- [Licencia](#licencia)

---

## Características

- **Análisis de gramáticas**: Extrae variables, terminales y producciones a partir de una gramática en texto.
- **Eliminación de recursividad por la izquierda**: Transforma la gramática para eliminar recursividad directa e indirecta.
- **Cálculo de funciones PRIMERO y SIGUIENTE**: Obtiene los conjuntos necesarios para la construcción de analizadores sintácticos.
- **Construcción de tabla LL(1)**: Genera la tabla de análisis sintáctico predictivo.
- **API RESTful**: Interfaz clara y estructurada para integración con frontends o herramientas externas.

---

## Instalación

1. **Clona el repositorio:**

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd server
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

---

## Ejecución

- **Modo desarrollo:**

  ```bash
  npm run dev
  ```

- **Modo producción:**

  ```bash
  npm start
  ```

El servidor se ejecutará por defecto en `http://localhost:3000/`.

---

## Estructura del Proyecto

```  bash
server/
│
├── controllers/         # Lógica de negocio de cada endpoint
├── routes/              # Definición de rutas de la API
├── utils/               # Funciones auxiliares para el análisis de gramáticas
├── app.js               # Configuración principal de Express
├── package.json
└── README.md
```

---

## Endpoints de la API

### GET /

**Descripción:**  
Verifica el estado del servidor.

**Respuesta:**

```json
{
  "status": "OK",
  "code": 200,
  "message": "API ACTIVA"
}
```

---

### POST /analyze

**Descripción:**  
Analiza una gramática enviada en texto plano o JSON y retorna sus componentes.

**Body (texto plano o JSON):**

``` bash
S -> A a | b
A -> a | ε
```

o

```json
{
  "grammar": "S -> A a | b\nA -> a | ε"
}
```

**Respuesta:**

```json
{
  "variables": ["S", "A"],
  "terminales": ["a", "b"],
  "producciones": [
    { "variable": "S", "production": "A a" },
    { "variable": "S", "production": "b" },
    { "variable": "A", "production": "a" },
    { "variable": "A", "production": "ε" }
  ],
  "timestamp": "2025-05-31T12:34:56.789Z"
}
```

---

### POST /recursion

**Descripción:**  
Elimina la recursividad por la izquierda de la gramática.

**Body:**

```json
{
  "variables": ["S", "A"],
  "terminales": ["a", "b"],
  "producciones": [
    { "variable": "S", "production": "S a" },
    { "variable": "S", "production": "b" },
    { "variable": "A", "production": "a" },
    { "variable": "A", "production": "ε" }
  ]
}
```

**Respuesta:**  
Texto plano con la gramática transformada.

---

### POST /first

**Descripción:**  
Calcula el conjunto PRIMERO para cada variable.

**Body:**  
Igual que en `/recursion`.

**Respuesta:**

```json
{
  "primero": {
    "S": ["a", "b"],
    "A": ["a", "ε"]
  }
}
```

---

### POST /follow

**Descripción:**  
Calcula el conjunto SIGUIENTE para cada variable.

**Body:**  
Igual que en `/recursion`.

**Respuesta:**

```json
{
  "siguiente": {
    "S": ["$", "b"],
    "A": ["a"]
  }
}
```

---

### POST /table

**Descripción:**  
Genera la tabla de análisis LL(1).

**Body:**

```json
{
  "producciones": [
    { "variable": "S", "production": ["A", "a"] },
    { "variable": "S", "production": ["b"] },
    { "variable": "A", "production": ["a"] },
    { "variable": "A", "production": ["ε"] }
  ],
  "primero": { "S": ["a", "b"], "A": ["a", "ε"] },
  "siguiente": { "S": ["$"], "A": ["a"] }
}
```

**Respuesta:**

```json
{
  "columns": ["a", "b", "$"],
  "rows": [
    { "variable": "S", "values": ["A a", "b", null] },
    { "variable": "A", "values": ["a", null, "ε"] }
  ]
}
```

---

## Ejemplo de Flujo de Trabajo

1. **Analizar gramática:**  
   Envía la gramática a `/analyze` para obtener variables, terminales y producciones.

2. **Eliminar recursividad:**  
   Envía el resultado a `/recursion` si es necesario.

3. **Calcular PRIMERO y SIGUIENTE:**  
   Usa `/first` y `/follow` con las producciones.

4. **Construir tabla LL(1):**  
   Envía producciones, primero y siguiente a `/table`.

---

## Manejo de Errores

- Los errores se devuelven con código HTTP 400 o 500 y un campo `error` en la respuesta.
- Ejemplo:

  ```json
  {
    "error": "Formato de gramática inválido"
  }
  ```

---

## Notas y Recomendaciones

- Todos los endpoints que procesan gramáticas esperan datos en formato JSON.
- El endpoint `/analyze` acepta texto plano o JSON.
- El campo `ε` representa la cadena vacía.
- El símbolo `$` representa el fin de la entrada en SIGUIENTE.

---

## Licencia

Este proyecto se distribuye bajo la licencia MIT.

---

¿Tienes dudas sobre algún endpoint, formato de datos o deseas ejemplos más específicos?
