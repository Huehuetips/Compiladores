"use client"

import { useState } from "react"
import Header from "./components/grammar/Header"
import GrammarEditor from "./components/grammar/GrammarEditor"
import LeftRecursionSection from "./components/grammar/LeftRecursionSection"
import FirstFunctionTable from "./components/grammar/FirstFunctionTable"
import FollowFunctionTable from "./components/grammar/FollowFunctionTable"
import SymbolTable from "./components/grammar/SymbolTable" // 👈 ¡Ya lo importamos!
import TerminalOutput from "./components/grammar/TerminalOutput"

export default function GrammarParser() {
  const [grammarInput, setGrammarInput] = useState("")
  const [leftRecursionInput, setLeftRecursionInput] = useState("")
  const [terminalLines, setTerminalLines] = useState<string[]>([])

  const [variables, setVariables] = useState<string[]>([])
  const [terminales, setTerminales] = useState<string[]>([])
  const [producciones, setProducciones] = useState<{ variable: string; production: string[] }[]>([])

  const [variablesSinRec, setVariablesSinRec] = useState<string[]>([])
  const [terminalesSinRec, setTerminalesSinRec] = useState<string[]>([])
  const [produccionesSinRec, setProduccionesSinRec] = useState<{ variable: string; production: string[] }[]>([])

  // ✅ Nuevos estados para PRIMERO, SIGUIENTE
  const [primero, setPrimero] = useState<Record<string, string[]>>({})
  const [siguiente, setSiguiente] = useState<Record<string, string[]>>({})

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-mono p-6">
      <Header />
      <TerminalOutput terminalLines={terminalLines} />

      <div className="flex flex-col xl:grid xl:grid-cols-2 gap-6 mt-4">
        <GrammarEditor
          grammarInput={grammarInput}
          setGrammarInput={setGrammarInput}
          setTerminalLines={setTerminalLines}
          setLeftRecursionInput={setLeftRecursionInput}
          setVariables={setVariables}
          setTerminales={setTerminales}
          setProducciones={setProducciones}
          setVariablesSinRec={setVariablesSinRec}
          setTerminalesSinRec={setTerminalesSinRec}
          setProduccionesSinRec={setProduccionesSinRec}
          variables={variables}
          terminales={terminales}
          producciones={producciones}
        />

        <LeftRecursionSection
          leftRecursionInput={leftRecursionInput}
          setTerminalLines={setTerminalLines}
          variables={variablesSinRec}
          terminales={terminalesSinRec}
          producciones={produccionesSinRec}
        />

        <div className="flex flex-col xl:grid xl:grid-cols-2 gap-6">
          <FirstFunctionTable
            variables={variablesSinRec}
            terminales={terminalesSinRec}
            producciones={produccionesSinRec}
            setTerminalLines={setTerminalLines}
            setResultado={setPrimero} // 👈 importante
          />
          <FollowFunctionTable
            variables={variablesSinRec}
            terminales={terminalesSinRec}
            producciones={produccionesSinRec}
            setTerminalLines={setTerminalLines}
            setResultado={setSiguiente} // 👈 importante
          />
        </div>

        <SymbolTable
          producciones={produccionesSinRec}
          primero={primero}
          siguiente={siguiente}
          setTerminalLines={setTerminalLines}
        />

      </div>
    </div>
  )
}
