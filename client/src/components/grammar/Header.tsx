"use client"

import { Terminal } from "lucide-react"
import ComponentDropdown from "../dashboard/ComponentDropdown"

export default function Header({
  allComponents,
  visibleComponents,
  setVisibleComponents,
}: {
  allComponents: string[]
  visibleComponents: string[]
  setVisibleComponents: (next: string[]) => void
}) {
  return (
    <div className="bg-gray-800 border border-gray-700 p-4 mb-4 rounded-lg">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Título */}
        <div className="flex items-center gap-3">
          <Terminal size={18} className="text-blue-400" />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-100 leading-tight">
              Analizador de Gramáticas
            </span>
            <span className="text-xs text-blue-300 font-medium leading-tight">
              Eliminación de Recursividad por la Izquierda
            </span>
          </div>
        </div>

        <div className="text-sm text-blue-300 font-semibold text-right md:text-left">
          <div>Edwin Adony Montejo Martínez</div>
          <div className="text-xs text-gray-400">Carné: 9490-21-3898</div>
        </div>

        {/* Estado del sistema + info del alumno */}
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-green-400 text-sm font-medium">Sistema Activo</span>
          </div>
          <div className="bg-gray-700 px-3 py-1 rounded text-gray-300 text-sm w-fit">v2.1.0</div>
          <ComponentDropdown
            allComponents={allComponents}
            visibleComponents={visibleComponents}
            setVisibleComponents={setVisibleComponents}
          />
        </div>
      </div>
    </div>
  )
}
