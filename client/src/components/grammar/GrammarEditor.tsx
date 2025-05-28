import { Button } from "../ui/button"
import { Play, Code, Database } from "lucide-react"

interface Props {
    grammarInput: string
    setGrammarInput: (v: string) => void
    executeGrammar: () => void
    isProcessing: boolean
}

export default function GrammarEditor({ grammarInput, setGrammarInput, executeGrammar, isProcessing }: Props) {
    return (
        <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
                <h2 className="font-bold">Editor de Gramática</h2>
                <div className="flex items-center gap-3">
                    <Button
                        onClick={executeGrammar}
                        disabled={isProcessing}
                        className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white rounded-md"
                    >
                        {isProcessing ? (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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

            {/* Vectores y Producciones */}
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
                                <th className="bg-gray-800 border border-gray-600 p-1 text-center text-gray-300 ">
                                    V
                                </th>
                                <th className="bg-gray-800 border border-gray-600 p-1 text-center text-gray-300 ">
                                    T
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                {["S", "T", "F", "E", "X", "Y"].map((v, i) => (
                                <tr key={v} className="hover:bg-gray-800 transition-colors">
                                    <td className="border border-gray-600 p-1 text-center text-gray-100 font-medium">{v}</td>
                                    <td className="border border-gray-600 p-1 text-center text-blue-400">
                                    {["+", "*", "a", "(", ")", "id"][i] || "..."}
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-600 rounded-lg p-4">
                <h3 className="text-gray-100 mb-3 text-sm flex items-center gap-2">
                    <Database size={18} className="text-blue-400" />
                    Producciones
                </h3>
                <div className="max-h-48 overflow-auto">
                    <table className="w-full border-collapse text-sm">
                        <thead className="sticky top-0 border ">
                            <tr>
                            <th className="bg-gray-800 border border-gray-600 p-1 text-center text-gray-300">
                                V
                            </th>
                            <th className="bg-gray-800 border border-gray-600 p-1 text-center text-gray-300">
                                Producciones
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                            ["S", "S + T"],
                            ["S", "T"],
                            ["T", "T * F"],
                            ["T", "F"],
                            ["F", "( E )"],
                            ["F", "id"],
                            ["E", "E + T"],
                            ["E", "T"],
                            ].map(([v, prod], i) => (
                            <tr key={i} className="hover:bg-gray-800 transition-colors">
                                <td className="border border-gray-600 p-1 text-center text-gray-100 font-medium">{v}</td>
                                <td className="border border-gray-600 p-1 text-blue-400">{prod}</td>
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
