export async function analyzeGrammar(grammar: string) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}analyze`, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: grammar
  })
  if (!response.ok) {
    const errorData = await response.json().catch(() => null)

    // 💥 Lanza mensaje claro si la API lo tiene, o status genérico
    throw new Error(errorData?.error || `Error ${response.status}: ${response.statusText}`)
  }

  const data = await response.json()
  return data
}


export async function removeLeftRecursion(data: {
  variables: string[]
  terminales: string[]
  producciones: { variable: string; production: string }[]
  timestamp: string
}): Promise<string> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}recursion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const errorData = await response.text().catch(() => null)
    throw new Error(errorData || `Error ${response.status}: ${response.statusText}`)
  }

  const text = await response.text()
  return text
}

export async function getFirstFunction(data: {
  variables: string[]
  terminales: string[]
  producciones: { variable: string; production: string }[]
  timestamp: string
}): Promise<Record<string, string[]>> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}first`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const error = await response.text().catch(() => null)
    throw new Error(error || `Error ${response.status}`)
  }
  return await response.json()
}
export async function getFollowFunction(data: {
  variables: string[]
  terminales: string[]
  producciones: { variable: string; production: string }[]
  timestamp: string
}): Promise<Record<string, string[]>> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}follow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const error = await response.text().catch(() => null)
    throw new Error(error || `Error ${response.status}`)
  }
  return await response.json()
}

export async function getSymbolTable(data: {
  producciones: { variable: string; production: string[] }[]
  primero: Record<string, string[]>
  siguiente: Record<string, string[]>
}): Promise<{
  columns: string[]
  rows: { variable: string; values: (string | null)[] }[]
}> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}table`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const error = await response.text().catch(() => null)
    throw new Error(error || `Error ${response.status}: ${response.statusText}`)
  }

  return await response.json()
}
