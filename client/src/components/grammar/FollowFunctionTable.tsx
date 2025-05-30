"use client"

import { useEffect, useState } from "react"
import { useFollowFunction } from "../../hooks/useFollowFunction"

interface Props {
  variables: string[]
  terminales: string[]
  producciones: { variable: string; production: string[] }[]
  setTerminalLines: React.Dispatch<React.SetStateAction<string[]>>
  setResultado: React.Dispatch<React.SetStateAction<Record<string, string[]>>>
}

export default function FollowFunctionTable({
  variables,
  terminales,
  producciones,
  setTerminalLines,
  setResultado
}: Props) {
  const [followSet, setFollowSet] = useState<Record<string, string[]>>({})
  const [hovered, setHovered] = useState<number | null>(null)

  const { execute } = useFollowFunction()

  useEffect(() => {
    const run = async () => {
      if (!variables.length || !terminales.length || !producciones.length) return

      try {
        const timestamp = new Date().toISOString()
        const result = await execute({
          variables,
          terminales,
          producciones: producciones.map(p => ({
            variable: p.variable,
            production: p.production.join(" ")
          })),
          timestamp
        })

        const siguiente = result.siguiente as unknown as Record<string, string[]>
        setFollowSet(siguiente)
        setResultado(siguiente)

        setTerminalLines(prev => [
          ...prev,
          "📍 Función SIGUIENTE generada correctamente",
          ...Object.entries(siguiente).map(([v, symbols]) => `> ${v} → ${symbols.join(", ")}`)
        ])
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        setTerminalLines(prev => [...prev, `❌ Error función SIGUIENTE: ${message}`])
      }
    }

    run()
  }, [variables, terminales, producciones, setTerminalLines, execute, setResultado])

  return (
    <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
      <h2 className="font-bold text-gray-100 mb-4">Función SIGUIENTE</h2>
      <div className="max-h-120 overflow-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 z-10">
            <tr>
              <th className="bg-gray-700 border border-gray-600 p-1 text-center text-gray-300 sticky left-0 z-20 min-w-[120px]">
                Variable
              </th>
              <th className="bg-gray-700 border border-gray-600 p-1 text-center text-gray-300">
                Terminales
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(followSet).map(([variable, symbols], idx) => (
              <tr
                key={variable}
                className={
                  hovered === idx ? "bg-gray-600/30 transition-colors" : "transition-colors"
                }
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
              >
                <td className="border border-gray-600 p-1 text-center text-gray-100 font-medium sticky left-0 bg-gray-800 z-10">
                  {variable}
                </td>
                <td className="border border-gray-600 p-1 text-center text-green-400">
                  {symbols.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
