"use client"

import { Code, Database } from "lucide-react"

interface Props {
  leftRecursionInput: string
  setTerminalLines: React.Dispatch<React.SetStateAction<string[]>>
  variables: string[]
  terminales: string[]
  producciones: { variable: string; production: string[] }[]
}

export default function LeftRecursionSection({
  leftRecursionInput,
  variables,
  terminales,
  producciones
}: Props) {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex justify-between mb-2">
        <h2 className="font-bold m-2">Gramática Sin Recursividad</h2>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-blue-400 text-sm">Actualizando</span>
        </div>
      </div>

      <div className="grid grid-cols-1 min-[832px]:grid-cols-3 gap-2 h-full overflow-hidden">
        <textarea
          placeholder="Resultado sin recursividad"
          aria-label="Texto sin recursividad"
          className=" bg-gray-900 border p-5 min-[832px]:h-full min-h-[300px] text-gray-100 font-mono resize-none focus:outline-none border-transparent rounded-md scrollbar-custom"
          value={leftRecursionInput}
          readOnly
        />

        <div className="h-full bg-gray-900 border border-gray-600 rounded-lg p-4 flex flex-col overflow-hidden">
          <h3 className="text-gray-100 mb-3 text-sm flex items-center gap-2">
            <Code size={18} className="text-blue-400" />
            Vectores
            <span className="ml-2 text-xs text-gray-400">
              (V: {variables.length}, T: {terminales.length})
            </span>
          </h3>
          <div className="flex-1 min-h-0 max-h-full overflow-auto scrollbar-custom">
            <table className="w-full text-sm border-collapse">
              <thead className="sticky top-0">
                <tr>
                  <th className="bg-gray-800 border border-gray-600 p-1 text-center text-gray-300">V</th>
                  <th className="bg-gray-800 border border-gray-600 p-1 text-center text-gray-300">T</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const maxLength = Math.max(variables.length, terminales.length)
                  return Array.from({ length: maxLength }).map((_, i) => (
                    <tr key={i} className="hover:bg-gray-800">
                      <td className="border border-gray-600 p-1 text-center text-gray-100">{variables[i] || ""}</td>
                      <td className="border border-gray-600 p-1 text-center text-blue-400">{terminales[i] || ""}</td>
                    </tr>
                  ))
                })()}
              </tbody>
            </table>
          </div>
        </div>

        <div className="h-full bg-gray-900 border border-gray-600 rounded-lg p-4 flex flex-col overflow-hidden">
          <h3 className="text-gray-100 mb-3 text-sm flex items-center gap-2">
            <Database size={18} className="text-blue-400" />
            Producciones
            <span className="ml-2 text-xs text-gray-400">({producciones.length})</span>
          </h3>
          <div className="flex-1 min-h-0 max-h-full overflow-auto scrollbar-custom">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="bg-gray-800 border border-gray-600 p-1 text-center text-gray-300">V</th>
                  <th className="bg-gray-800 border border-gray-600 p-1 text-center text-gray-300">Producción</th>
                </tr>
              </thead>
              <tbody>
                {producciones.map((p, i) => (
                  <tr key={i} className="hover:bg-gray-800">
                    <td className="border border-gray-600 p-1 text-center text-gray-100">{p.variable}</td>
                    <td className="border border-gray-600 p-1 text-blue-400">{p.production.join(" ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
