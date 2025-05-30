"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Play, Code, Database } from "lucide-react"
import { useGrammarAnalyzer } from "../../hooks/useGrammarAnalyzer"
import { useLeftRecursionRemover } from "../../hooks/useLeftRecursion"

interface Props {
  grammarInput: string
  setGrammarInput: (v: string) => void
  setTerminalLines: React.Dispatch<React.SetStateAction<string[]>>
  setLeftRecursionInput: (v: string) => void
  setVariables: React.Dispatch<React.SetStateAction<string[]>>
  setTerminales: React.Dispatch<React.SetStateAction<string[]>>
  setProducciones: React.Dispatch<React.SetStateAction<{ variable: string; production: string[] }[]>>
  setVariablesSinRec: React.Dispatch<React.SetStateAction<string[]>>
  setTerminalesSinRec: React.Dispatch<React.SetStateAction<string[]>>
  setProduccionesSinRec: React.Dispatch<React.SetStateAction<{ variable: string; production: string[] }[]>>
  variables: string[]
  terminales: string[]
  producciones: { variable: string; production: string[] }[]
}

export default function GrammarEditor({
  grammarInput,
  setGrammarInput,
  setTerminalLines,
  setLeftRecursionInput,
  setVariables,
  setTerminales,
  setProducciones,
  setVariablesSinRec,
  setTerminalesSinRec,
  setProduccionesSinRec,
  variables,
  terminales,
  producciones
}: Props) {
  const [loading, setLoading] = useState(false)

  const { execute } = useGrammarAnalyzer()
  const { execute: removeRecursion } = useLeftRecursionRemover()

  const handleExecute = async () => {
    setLoading(true)
    setTerminalLines(prev => [...prev, "> Enviando gramática al servidor..."])

    const { data: initialAnalysis, error } = await execute(grammarInput)

    if (error || !initialAnalysis) {
      setLoading(false)
      setTerminalLines(prev => [...prev, `> ❌ Error: ${error}`])
      return
    }

    const { variables, terminales, producciones } = initialAnalysis
    const timestamp = new Date().toISOString()

    setVariables(variables)
    setTerminales(terminales)
    setProducciones(
      producciones.map(p => ({
        variable: p.variable,
        production: Array.isArray(p.production)
          ? p.production
          : p.production.split(/\s+/).filter(Boolean)
      }))
    )

    setTerminalLines(prev => [
      ...prev,
      "> ✅ Análisis completado",
      `> Variables: ${variables.join(", ")}`,
      `> Terminales: ${terminales.join(", ")}`,
      `> Producciones: ${producciones.length}`
    ])

    const recursionText = await removeRecursion({ variables, terminales, producciones, timestamp })

    if (!recursionText) {
      setLoading(false)
      setTerminalLines(prev => [...prev, "> ❌ Error en eliminación de recursividad"])
      return
    }

    setLeftRecursionInput(recursionText)
    setTerminalLines(prev => [...prev, "> ✂️ Recursividad eliminada."])

    const { data: secondAnalysis, error: secondError } = await execute(recursionText)

    if (secondError || !secondAnalysis) {
      setLoading(false)
      setTerminalLines(prev => [...prev, `> ❌ Error tras eliminar recursividad: ${secondError}`])
      return
    }

    setVariablesSinRec(secondAnalysis.variables)
    setTerminalesSinRec(secondAnalysis.terminales)
    setProduccionesSinRec(
      secondAnalysis.producciones.map(p => ({
        variable: p.variable,
        production: Array.isArray(p.production)
          ? p.production
          : p.production.split(/\s+/).filter(Boolean)
      }))
    )

    setTerminalLines(prev => [
      ...prev,
      "> ✅ Gramática sin recursividad analizada correctamente.",
      `> Variables: ${secondAnalysis.variables.join(", ")}`,
      `> Terminales: ${secondAnalysis.terminales.join(", ")}`,
      `> Producciones: ${secondAnalysis.producciones.length}`
    ])

    setLoading(false)
  }

  return (
    <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
      <div className="flex justify-between mb-2">
        <h2 className="font-bold m-2">Editor de Gramática</h2>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleExecute}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white rounded-md"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Procesando...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Play size={16} />
                Ejecutar
              </div>
            )}
          </Button>
          <div className="bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-300 text-sm font-medium">
            F9
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <textarea
          className="h-64 bg-gray-900 border p-5 text-gray-100 font-mono resize-none focus:outline-none border-transparent rounded-md"
          value={grammarInput}
          onChange={(e) => setGrammarInput(e.target.value)}
          placeholder="Gramática..."
        />

        <div className="h-full bg-gray-900 border border-gray-600 rounded-lg p-4">
          <h3 className="text-gray-100 mb-3 text-sm flex items-center gap-2">
            <Code size={18} className="text-blue-400" />
            Vectores
          </h3>
          <div className="max-h-48 overflow-auto">
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

        <div className="bg-gray-900 border border-gray-600 rounded-lg p-4">
          <h3 className="text-gray-100 mb-3 text-sm flex items-center gap-2">
            <Database size={18} className="text-blue-400" />
            Producciones
            <span className="ml-2 text-xs text-gray-400">({producciones.length})</span>
          </h3>
          <div className="max-h-48 overflow-auto">
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
