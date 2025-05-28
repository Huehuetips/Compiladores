export default function FollowFunctionTable() {
    return (
        <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
            <h2 className="font-bold text-gray-100 mb-4">Función Siguiente</h2>
            <div className="max-h-120 overflow-auto">
                <table className="w-full border-collapse text-sm">
                    <thead className="sticky top-0">
                        <tr>
                        <th className="bg-gray-700 border border-gray-600 p-1 text-center text-gray-300">
                            Variable
                        </th>
                        <th className="bg-gray-700 border border-gray-600 p-1 text-center text-gray-300">
                            Terminales
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {["S", "S'", "T", "T'", "F", "E", "X", "Y", "Z", "S'", "T", "T'", "F", "E", "X", "Y", "Z", "S'", "T", "T'", "F", "E", "X", "Y", "Z"].map((v) => (
                        <tr key={v} className="hover:bg-gray-700 transition-colors">
                            <td className="border border-gray-600 p-1 text-center text-gray-100 font-medium">{v}</td>
                            <td className="border border-gray-600 p-1 text-green-400">
                            {v === "S"
                                ? "{ $, ) }"
                                : v === "T"
                                ? "{ +, $, ) }"
                                : v === "F"
                                ? "{ *, +, $, ) }"
                                : "{ ... }"}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
