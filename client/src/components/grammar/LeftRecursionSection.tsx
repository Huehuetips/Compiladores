import { Code, Database } from "lucide-react"
interface Props {
    leftRecursionInput: string
    setLeftRecursionInput: (v: string) => void
}

export default function LeftRecursionSection({ leftRecursionInput, setLeftRecursionInput }: Props) {
    return (
        <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
                <h2 className="font-bold m-2">Gramática Sin Recursividad</h2>
                <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-blue-400 text-sm">Procesando</span>
                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <textarea
                    className="w-full h-full bg-gray-900 border p-4 text-gray-100 font-mono resize-none focus:outline-none border-transparent rounded-md"
                    value={leftRecursionInput}
                    onChange={(e) => setLeftRecursionInput(e.target.value)}
                    placeholder="Sin recursividad"
                    readOnly
                />
                <div className="h-full bg-gray-900 border border-gray-600 rounded-lg p-4">
                    <h3 className="text-gray-100 mb-3 text-sm flex items-center gap-2">
                        <Code size={18} className="text-blue-400" />
                        Vectores
                    </h3>
                    <div className="max-h-48 overflow-auto">
                        <table className="w-full border-collapse text-sm">
                            <thead className="sticky top-0">
                                <tr>
                                <th className="bg-gray-800 border border-gray-600 p-1 text-center text-gray-300">
                                    V
                                </th>
                                <th className="bg-gray-800 border border-gray-600 p-1 text-center text-gray-300">
                                    T
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                {["S", "S1", "T", "T1", "F"].map((v, i) => (
                                <tr key={v} className="hover:bg-gray-800 transition-colors">
                                    <td className="border border-gray-600 p-1 text-center text-gray-100 font-medium">{v}</td>
                                    <td className="border border-gray-600 p-1 text-center text-blue-400">
                                    {["e", "+", "*", "a", "("][i] || "..."}
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
                            <thead className="sticky top-0">
                                <tr>
                                <th className="bg-gray-800 border border-gray-600 p-1 text-center text-gray-300 font-medium">
                                    V
                                </th>
                                <th className="bg-gray-800 border border-gray-600 p-1 text-center text-gray-300 font-medium">
                                    Producciones
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                ["S", "T S1"],
                                ["S1", "+ T S1"],
                                ["S1", "ε"],
                                ["T", "F T1"],
                                ["T1", "* F T1"],
                                ["T1", "ε"],
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
