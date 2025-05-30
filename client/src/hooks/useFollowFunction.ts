import { getFollowFunction } from "../lib/api"
import { useCallback } from "react"

export function useFollowFunction() {
  const execute = useCallback(
    async (payload: {
      variables: string[]
      terminales: string[]
      producciones: { variable: string; production: string }[]
      timestamp: string
    }) => {
      return await getFollowFunction(payload)
    },
    []
  )

  return { execute }
}
