import { useCallback, useState } from "react"
import { getSymbolTable } from "../lib/api"

interface SymbolTableRequest {
  producciones: { variable: string; production: string[] }[]
  primero: Record<string, string[]>
  siguiente: Record<string, string[]>
}

interface SymbolTableResponse {
  columns: string[]
  rows: { variable: string; values: (string | null)[] }[]
}

export function useSymbolTable() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = useCallback(async (data: SymbolTableRequest): Promise<SymbolTableResponse | null> => {
    setLoading(true)
    setError(null)

    try {
      const result = await getSymbolTable(data)
      return result
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      setError(message)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return { execute, loading, error }
}
