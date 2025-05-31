"use client"

import { useEffect, useState } from "react"
import { Table } from "lucide-react"
import { useSymbolTable } from "../../hooks/useSymbolTable"

interface Props {
  producciones: { variable: string; production: string[] }[]
  primero: Record<string, string[]>
  siguiente: Record<string, string[]>
  setTerminalLines: React.Dispatch<React.SetStateAction<string[]>>
}

export default function SymbolTable({
  producciones,
  primero,
  siguiente,
  setTerminalLines
}: Props) {
  const [columns, setColumns] = useState<string[]>([])
  const [rows, setRows] = useState<{ variable: string; values: (string | null)[] }[]>([])
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)

  const { execute } = useSymbolTable()

  useEffect(() => {
    const run = async () => {
      const canRun =
        producciones.length > 0 &&
        Object.keys(primero).length > 0 &&
        Object.keys(siguiente).length > 0

      if (!canRun) return

      try {
        const result = await execute({ producciones, primero, siguiente })
        if (result && result.columns && result.rows) {
          setColumns(result.columns)
          setRows(result.rows)

          setTerminalLines(prev => [
            ...prev,
            "📊 Tabla de símbolos generada correctamente",
            `> Columnas: ${result.columns.length}`,
            `> Filas: ${result.rows.length}`
          ])
        } else {
          setTerminalLines(prev => [...prev, "⚠️ No se recibió una tabla válida desde la API"])
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        setTerminalLines(prev => [...prev, `❌ Error tabla de símbolos: ${message}`])
      }
    }

    run()
  }, [producciones, primero, siguiente, execute, setTerminalLines])

  return (
    <div className="h-full flex flex-col">
      <h2 className="font-bold text-gray-100 mb-4 flex items-center gap-2">
        <Table size={18} className="text-blue-400" />
        Tabla de Símbolos
      </h2>

      <div className="overflow-auto scrollbar-custom">
        <table className="w-full text-sm border-collapse">
          <thead className="sticky top-0 z-10">
            <tr>
              <th className="bg-gray-700 border border-gray-600 p-1 text-center text-gray-300 font-medium sticky left-0 z-20 min-w-[120px]">
                Variable
              </th>
              {columns.map((col, colIdx) => (
                <th
                  key={colIdx}
                  className={
                    "bg-gray-700 border border-gray-600 p-1 text-center text-gray-300 font-medium min-w-[80px] transition-colors" +
                    (hovered?.col === colIdx + 1 ? " bg-blue-800/50" : "")
                  }
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr key={row.variable}>
                <td className="border border-gray-600 p-1 text-center text-gray-100 font-medium sticky left-0 bg-gray-800 z-10">
                  {row.variable}
                </td>
                {row.values.map((value, colIdx) => (
                  <td
                    key={colIdx}
                    className={
                      "border border-gray-600 p-1 text-center text-green-400 transition-colors duration-100" +
                      (hovered?.col === colIdx + 1 ? " bg-gray-600/30" : "") +
                      (hovered?.row === rowIdx ? " bg-gray-600/30" : "")
                    }
                    onMouseEnter={() => setHovered({ row: rowIdx, col: colIdx + 1 })}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {typeof value === "string" ? value.split(" ").join("") : "—"}
                  </td>
                ))}
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="text-center p-4 text-gray-400">
                  Sin datos para mostrar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
