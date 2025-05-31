"use client"

import { useState, type JSX } from "react"
import Header from "./components/grammar/Header"
import GrammarEditor from "./components/grammar/GrammarEditor"
import LeftRecursionSection from "./components/grammar/LeftRecursionSection"
import FirstFunctionTable from "./components/grammar/FirstFunctionTable"
import FollowFunctionTable from "./components/grammar/FollowFunctionTable"
import SymbolTable from "./components/grammar/SymbolTable"
import TerminalOutput from "./components/grammar/TerminalOutput"
import DashboardLayout from "./components/dashboard/DashboardLayout"

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

  const [primero, setPrimero] = useState<Record<string, string[]>>({})
  const [siguiente, setSiguiente] = useState<Record<string, string[]>>({})


  // 🔧 NUEVO: Estados para controlar visibilidad de componentes
  const allComponents = [
    "GrammarEditor",
    "LeftRecursionSection",
    "FirstFunctionTable",
    "FollowFunctionTable",
    "SymbolTable",
    "TerminalOutput",
  ]

  const [visibleComponents, setVisibleComponents] = useState<string[]>(allComponents)

  // 🔧 NUEVO: Mapa de componentes (mantiene todos los props iguales)
  const componentMap: Record<string, JSX.Element> = {
    GrammarEditor: (
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
    ),
    LeftRecursionSection: (
      <LeftRecursionSection
        leftRecursionInput={leftRecursionInput}
        setTerminalLines={setTerminalLines}
        variables={variablesSinRec}
        terminales={terminalesSinRec}
        producciones={produccionesSinRec}
      />
    ),
    FirstFunctionTable: (
      <FirstFunctionTable
        variables={variablesSinRec}
        terminales={terminalesSinRec}
        producciones={produccionesSinRec}
        setTerminalLines={setTerminalLines}
        setResultado={setPrimero}
      />
    ),
    FollowFunctionTable: (
      <FollowFunctionTable
        variables={variablesSinRec}
        terminales={terminalesSinRec}
        producciones={produccionesSinRec}
        setTerminalLines={setTerminalLines}
        setResultado={setSiguiente}
      />
    ),
    SymbolTable: (
      <SymbolTable
        producciones={produccionesSinRec}
        primero={primero}
        siguiente={siguiente}
        setTerminalLines={setTerminalLines}
      />
    ),
    TerminalOutput: <TerminalOutput terminalLines={terminalLines} />,
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-mono p-6">
      <Header
        allComponents={allComponents}
        visibleComponents={visibleComponents}
        setVisibleComponents={setVisibleComponents}
      />


      {/* Layout Drag & Drop + Resize */}
      <DashboardLayout
        childrenMap={componentMap}
        visibleComponents={visibleComponents}
        onCloseComponent={(key) =>
          setVisibleComponents(visibleComponents.filter((v) => v !== key))
        }
      />
    </div>
  )
}
