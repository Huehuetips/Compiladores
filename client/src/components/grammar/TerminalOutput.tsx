"use client"

import { useEffect, useRef } from "react"
import { Activity } from "lucide-react"

interface Props {
  terminalLines: string[]
}

export default function TerminalOutput({ terminalLines }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  // 👉 Hace scroll al final cada vez que cambia terminalLines
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [terminalLines])

  return (    
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-100">Terminal</h2>
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-green-500" />
          <span className="text-green-400 text-sm">Activo</span>
        </div>
      </div>

      <div className="h-full bg-gray-900 border border-gray-600 p-2 overflow-auto scrollbar-custom font-mono text-sm rounded">
        {terminalLines.map((line, index) => (
          <div key={index} className="text-gray-300">
            {line}
          </div>
        ))}

        {/* 💡 Línea activa */}
        <div className="flex items-center">
          <span className="text-blue-400">{">"}</span>
          <span className="animate-pulse ml-1 w-2 h-4 bg-blue-400 inline-block"></span>
        </div>

        {/* 🔽 Aquí se hará scroll */}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
