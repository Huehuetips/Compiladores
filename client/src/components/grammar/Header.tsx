import { Terminal } from "lucide-react"

export default function Header() {
    return (
        <div className="bg-gray-800 border border-gray-700 p-4 mb-6 rounded-lg">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
            <Terminal size={15} className="text-blue-400" />
            <span className="text-xl font-bold text-gray-100">Grammar Parser</span>
            </div>
            <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-400 text-sm font-medium">Sistema Activo</span>
            </div>
            <div className="bg-gray-700 px-3 py-1 rounded text-gray-300 text-sm">v2.1.0</div>
            </div>
        </div>
        </div>
    )
}
