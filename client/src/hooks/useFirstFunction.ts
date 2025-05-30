import { getFirstFunction } from "../lib/api"

export function useFirstFunction() {
  const execute = async (payload: {
    variables: string[]
    terminales: string[]
    producciones: { variable: string; production: string }[]
    timestamp: string
  }) => {
    return await getFirstFunction(payload)
  }

  return { execute }
}
