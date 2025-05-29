"use client"

import { useState } from "react"
import Header from "./components/grammar/Header"
import GrammarEditor from "./components/grammar/GrammarEditor"
// import FirstFunctionTable from "./components/grammar/FirstFunctionTable"
// import FollowFunctionTable from "./components/grammar/FollowFunctionTable"
import LeftRecursionSection from "./components/grammar/LeftRecursionSection"
// import SymbolTable from "./components/grammar/SymbolTable"
import TerminalOutput from "./components/grammar/TerminalOutput"

export default function GrammarParser() {
  const [grammarInput, setGrammarInput] = useState("")
  const [leftRecursionInput, setLeftRecursionInput] = useState("")
  const [terminalLines, setTerminalLines] = useState<string[]>([])

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-mono p-6">
      <Header />

      <TerminalOutput terminalLines={terminalLines} />
      <div className="flex flex-col xl:grid xl:grid-cols-2 gap-6 mt-4">
        <GrammarEditor
          grammarInput={grammarInput}
          setGrammarInput={setGrammarInput}
          setTerminalLines={setTerminalLines}
        />

        <LeftRecursionSection
          leftRecursionInput={leftRecursionInput}
          setLeftRecursionInput={setLeftRecursionInput}
        />
{/* 
        <div className="flex flex-col xl:grid xl:grid-cols-2 gap-6">
          <FirstFunctionTable />
          <FollowFunctionTable />
        </div> */}

        {/* <SymbolTable /> */}
      </div>

    </div>
  )
}
