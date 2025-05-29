import { analyzeGrammar } from "../lib/api"

interface AnalyzeResult {
  variables: string[]
  terminales: string[]
  producciones: { variable: string; production: string }[]
}

interface AnalyzeResponse {
  data: AnalyzeResult | null
  error: string | null
}

export function useGrammarAnalyzer() {
  const execute = async (grammar: string): Promise<AnalyzeResponse> => {
    try {
      const data = await analyzeGrammar(grammar)
      return { data, error: null }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      return { data: null, error: message }
    }
  }

  return { execute }
}
