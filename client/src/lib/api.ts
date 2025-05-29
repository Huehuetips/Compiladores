export async function analyzeGrammar(grammar: string) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ grammar })
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
  const response = await fetch(`${import.meta.env.VITE_API_URL}/grammar/remove-left-recursion`, {
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
