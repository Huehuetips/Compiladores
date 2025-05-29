import { useState } from "react"
import { removeLeftRecursion } from "../lib/api"

interface LeftRecursionRequest {
  variables: string[]
  terminales: string[]
  producciones: { variable: string; production: string }[]
  timestamp: string
}

export function useLeftRecursionRemover() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = async (data: LeftRecursionRequest): Promise<string | null> => {
    setLoading(true)
    setError(null)

    try {
      const response = await removeLeftRecursion(data)
      return response
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      setError(message)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { execute, loading, error }
}
