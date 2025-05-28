"use client"

import { useState } from "react"

// Importa los nuevos componentes
import Header from "./components/grammar/Header"
import GrammarEditor from "./components/grammar/GrammarEditor"
import FirstFunctionTable from "./components/grammar/FirstFunctionTable"
import FollowFunctionTable from "./components/grammar/FollowFunctionTable"
import LeftRecursionSection from "./components/grammar/LeftRecursionSection"
// import TerminalOutput from "./components/grammar/TerminalOutput"
import SymbolTable from "./components/grammar/SymbolTable"
// import StatusBar from "./components/grammar/StatusBar"

export default function GrammarParser() {
  const [grammarInput, setGrammarInput] = useState("S=S'+'T\nS=T\nT= T'*'F | F\nF='a'")
  const [leftRecursionInput, setLeftRecursionInput] = useState("S= T S1\nS1 =+T S1 |e\n...")
  const [isProcessing, setIsProcessing] = useState(false)
  // const [terminalLines, setTerminalLines] = useState([
  //   "> Sistema iniciado...",
  //   "> Cargando módulos de análisis...",
  //   "> Listo para procesar gramáticas",
  // ])

  const executeGrammar = () => {
    setIsProcessing(true)
    const newLines = [
      "> Iniciando análisis sintáctico...",
      "> Cargando gramática...",
      "> Eliminando recursividad por la izquierda...",
      "> Calculando conjuntos FIRST y FOLLOW...",
      "> Construyendo tabla de análisis sintáctico...",
      "> Análisis completado exitosamente ✓",
    ]

    // newLines.forEach((line, index) => {
      // setTimeout(() => {
        // setTerminalLines((prev) => [...prev, line])
      // }, index * 800)
    // })

    setTimeout(() => setIsProcessing(false), newLines.length * 800)
  }


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-mono p-6">
      <Header />

      <div className="flex flex-col xl:grid xl:grid-cols-2 gap-6">
        <GrammarEditor
          grammarInput={grammarInput}
          setGrammarInput={setGrammarInput}
          executeGrammar={executeGrammar}
          isProcessing={isProcessing}
        />
        <LeftRecursionSection
          leftRecursionInput={leftRecursionInput}
          setLeftRecursionInput={setLeftRecursionInput}
          
        />
        <div className="flex flex-col xl:grid xl:grid-cols-2 gap-6">
          <FirstFunctionTable />
          <FollowFunctionTable />
        </div>
        <SymbolTable />
      </div>
{/* 
      <TerminalOutput terminalLines={terminalLines} />
      <StatusBar /> */}
    </div>
  )
}
