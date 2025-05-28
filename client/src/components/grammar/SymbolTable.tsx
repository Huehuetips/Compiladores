import { Table } from "lucide-react"
import { useState } from "react"

export default function SymbolTable({ className = "" }: { className?: string }) {
    const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)
    const variables = ["S", "S'", "T", "T'", "F", "E", "X", "Y", "Z", "A", "B", "C", "S'", "T", "T'", "F", "E", "X", "Y", "Z"]
    const columns = [
        "Variables", "+", "*", "a", "(", ")", "$", "id", "num", "=", ";", "+", "*", "a", "(", ")", "$", "id", "num", "=", ";"
    ]

    return (
        <div className={`bg-gray-800 border border-gray-700 p-4 rounded-lg ${className}`}>
            <h2 className="font-bold text-gray-100 mb-4 flex items-center gap-2">
                <Table size={18} className="text-blue-400" />
                Tabla de Símbolos
            </h2>
            <div className="overflow-auto max-h-120">
                <table className="w-full text-sm">
                    <thead className="sticky top-0 z-20">
                        <tr>
                            {columns.map((col, colIdx) => (
                                <th
                                    key={col}
                                    className={
                                        "bg-gray-700 border border-gray-600 p-1 text-center text-gray-300 font-medium min-w-[80px]" +
                                        (colIdx === 0 ? " min-w-[100px] sticky left-0 z-30" : "") +
                                        (hovered && hovered.col === colIdx ? " bg-blue-900" : "")
                                    }
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {variables.map((variable, rowIdx) => (
                            <tr
                                key={variable}
                                className={
                                    "transition-colors" +
                                    (hovered && hovered.row === rowIdx ? " bg-gray-700" : "")
                                }
                            >
                                {columns.map((col, colIdx) => {
                                    if (colIdx === 0) {
                                        return (
                                            <td
                                                key={col}
                                                className={
                                                    "border border-gray-600 p-1 text-center text-gray-100 font-medium sticky left-0 bg-gray-800 z-10" +
                                                    (hovered && hovered.col === colIdx ? " bg-gray-700" : "") +
                                                    (hovered && hovered.row === rowIdx ? " bg-gray-700" : "")
                                                }
                                                onMouseEnter={() => setHovered({ row: rowIdx, col: colIdx })}
                                                onMouseLeave={() => setHovered(null)}
                                            >
                                                {variable}
                                            </td>
                                        )
                                    }
                                    // Simula los valores de las celdas como antes
                                    let value = "—"
                                    if (col === "+") value = rowIdx < 3 ? (Math.random() > 0.5 ? "✓" : "—") : "—"
                                    if (col === "*") value = rowIdx < 4 ? (Math.random() > 0.5 ? "✓" : "—") : "—"
                                    if (col === "a") value = rowIdx < 5 ? "✓" : "—"
                                    if (col === "(") value = rowIdx < 3 ? "✓" : "—"
                                    if (col === ")") value = rowIdx === 2 || rowIdx === 4 ? "✓" : "—"
                                    if (col === "$") value = rowIdx === 0 ? "✓" : "—"
                                    if (col === "id") value = rowIdx < 6 ? (Math.random() > 0.6 ? "✓" : "—") : "—"
                                    if (col === "num") value = rowIdx < 4 ? (Math.random() > 0.7 ? "✓" : "—") : "—"
                                    if (col === "=") value = rowIdx < 2 ? (Math.random() > 0.8 ? "✓" : "—") : "—"
                                    if (col === ";") value = rowIdx < 3 ? (Math.random() > 0.5 ? "✓" : "—") : "—"

                                    return (
                                        <td
                                            key={col}
                                            className={
                                                "border border-gray-600 p-1 text-center text-green-400" +
                                                (hovered && hovered.col === colIdx ? " bg-gray-700" : "") +
                                                (hovered && hovered.row === rowIdx ? " bg-gray-700" : "")
                                            }
                                            onMouseEnter={() => setHovered({ row: rowIdx, col: colIdx })}
                                            onMouseLeave={() => setHovered(null)}
                                        >
                                            {value}
                                        </td>
                                    )
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
