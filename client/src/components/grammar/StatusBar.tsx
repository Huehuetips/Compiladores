import { Code, Database, Table, ChevronRight } from "lucide-react"

export default function StatusBar() {
    return (
        <div className="bg-gray-800 border-t border-gray-700 p-4 mt-6 rounded-lg">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
                <Code size={16} className="text-blue-400" />
                <span className="text-gray-300">grammar_parser.exe</span>
            </div>
            <div className="flex items-center gap-2">
                <Database size={16} className="text-blue-400" />
                <span className="text-gray-300">Símbolos: 12</span>
            </div>
            <div className="flex items-center gap-2">
                <Table size={16} className="text-blue-400" />
                <span className="text-gray-300">Producciones: 12</span>
            </div>
            </div>
            <div className="flex items-center gap-2">
            <span className="text-green-400 font-medium">Sistema Listo</span>
            <ChevronRight size={16} className="text-green-400" />
            </div>
        </div>
        </div>
    )
}
