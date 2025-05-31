"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown, CheckCircle, EyeOff } from "lucide-react"

export default function ComponentDropdown({
  allComponents,
  visibleComponents,
  setVisibleComponents,
}: {
  allComponents: string[]
  visibleComponents: string[]
  setVisibleComponents: (next: string[]) => void
}) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const fixedComponents = ["GrammarEditor"]

  // 🔍 Cerrar al hacer click fuera del dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleComponent = (key: string) => {
    setVisibleComponents(
      visibleComponents.includes(key)
        ? visibleComponents.filter((v) => v !== key)
        : [...visibleComponents, key]
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botón que despliega el menú */}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex justify-center items-center gap-2 bg-gray-700 px-4 py-2 rounded-md text-sm text-white hover:bg-gray-600 focus:outline-none transition"
      >
        Componentes
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {/* Menú desplegable */}
      <div
        className={`absolute right-0 mt-2 w-60 origin-top-right bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50 transition-all duration-300 ${
          open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="py-1">
          {allComponents.map((key) => {
            const isFixed = fixedComponents.includes(key)
            const isActive = visibleComponents.includes(key)

            return (
              <button
                key={key}
                onClick={() => {
                  if (!isFixed) toggleComponent(key)
                }}
                className={`group flex w-full items-center justify-between px-4 py-2 text-sm text-left hover:bg-gray-700 text-gray-100 transition ${
                  isFixed ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <span>{key}</span>
                <span className="ml-2">
                  {isActive ? (
                    <CheckCircle size={16} className="text-green-400" />
                  ) : (
                    <EyeOff size={16} className="text-gray-500" />
                  )}
                </span>
              </button>
            )
          })}

        </div>
      </div>
    </div>
  )
}
