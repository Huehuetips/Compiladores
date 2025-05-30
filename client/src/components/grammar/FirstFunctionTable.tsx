"use client"

import { useEffect, useState } from "react"
import { getFirstFunction } from "../../lib/api"

interface Props {
  variables: string[]
  terminales: string[]
  producciones: { variable: string; production: string[] }[]
  setTerminalLines: React.Dispatch<React.SetStateAction<string[]>>
  setResultado: React.Dispatch<React.SetStateAction<Record<string, string[]>>>
}

export default function FirstFunctionTable({
  variables,
  terminales,
  producciones,
  setTerminalLines,
  setResultado
}: Props) {
  const [firstSet, setFirstSet] = useState<Record<string, string[]>>({})
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    const run = async () => {
      if (!variables.length || !terminales.length || !producciones.length) return

      try {
        const timestamp = new Date().toISOString()
        const result = await getFirstFunction({
          variables,
          terminales,
          producciones: producciones.map(p => ({
            variable: p.variable,
            production: p.production.join(" ")
          })),
          timestamp
        })

        const primero = result.primero as unknown as Record<string, string[]>
        setFirstSet(primero)
        setResultado(primero)

        setTerminalLines(prev => [
          ...prev,
          "🎯 Función PRIMERO generada correctamente",
          ...Object.entries(primero).map(([v, symbols]) => `> ${v} → ${symbols.join(", ")}`)
        ])
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        setTerminalLines(prev => [...prev, `❌ Error función PRIMERO: ${message}`])
      }
    }

    run()
  }, [variables, terminales, producciones, setTerminalLines, setResultado])

  return (
    <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
      <h2 className="font-bold text-gray-100 mb-4">Función PRIMERO</h2>
      <div className="overflow-auto max-h-120">
        <table className="w-full text-sm border-collapse">
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
            {Object.entries(firstSet).map(([variable, symbols], idx) => (
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
                <td className="border border-gray-600 p-1 text-center text-blue-400">
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
