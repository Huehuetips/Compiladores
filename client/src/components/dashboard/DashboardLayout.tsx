import { Responsive, WidthProvider } from "react-grid-layout"
import { GripVertical } from "lucide-react"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import type { JSX } from "react"

const ResponsiveGridLayout = WidthProvider(Responsive)

const fixedComponents = ["GrammarEditor"]

// ✅ Layouts por breakpoint
const layouts = {
  lg: [
    { i: "TerminalOutput", x: 0, y: 0, w: 12, h: 2, minH: 2 },
    { i: "GrammarEditor", x: 0, y: 2, w: 6, h: 3, minH: 2 },
    { i: "LeftRecursionSection", x: 6, y: 2, w: 6, h: 3, minH: 2 },
    { i: "FirstFunctionTable", x: 0, y: 5, w: 3, h: 3, minH: 2 },
    { i: "FollowFunctionTable", x: 3, y: 5, w: 3, h: 3, minH: 2 },
    { i: "SymbolTable", x: 6, y: 5, w: 6, h: 3, minH: 2 },
  ],
  md: [
    { i: "TerminalOutput", x: 0, y: 0, w: 10, h: 2, minH: 2 },
    { i: "GrammarEditor", x: 0, y: 2, w: 10, h: 4, minH: 3 },
    { i: "LeftRecursionSection", x: 0, y: 5, w: 10, h: 4, minH: 3 },
    { i: "FirstFunctionTable", x: 0, y: 6, w: 5, h: 4, minH: 3 },
    { i: "FollowFunctionTable", x: 5, y: 6, w: 5, h: 4, minH: 3 },
    { i: "SymbolTable", x: 0, y: 10, w: 10, h: 4, minH: 4 },
  ],
  sm: [
    { i: "TerminalOutput", x: 0, y: 0, w: 6, h: 2, minH: 2 },
    { i: "GrammarEditor", x: 0, y: 2, w: 6, h: 4, minH: 3 },
    { i: "LeftRecursionSection", x: 0, y: 5, w: 6, h: 4, minH: 3 },
    { i: "FirstFunctionTable", x: 0, y: 6, w: 3, h: 4, minH: 3 },
    { i: "FollowFunctionTable", x: 3, y: 6, w: 3, h: 4, minH: 3 },
    { i: "SymbolTable", x: 0, y: 7, w: 6, h: 4, minH: 4 },
  ],
  xs: [
    { i: "TerminalOutput", x: 0, y: 0, w: 4, h: 4, minH: 2 },
    { i: "GrammarEditor", x: 0, y: 2, w: 4, h: 8, minH: 6 },
    { i: "LeftRecursionSection", x: 0, y: 6, w: 4, h: 8, minH: 6 },
    { i: "FirstFunctionTable", x: 0, y: 9, w: 4, h: 4, minH: 3 },
    { i: "FollowFunctionTable", x: 0, y: 11, w: 4, h: 4, minH: 3 },
    { i: "SymbolTable", x: 0, y: 13, w: 4, h: 5, minH: 4 },
  ],
  xxs: [
    { i: "TerminalOutput", x: 0, y: 0, w: 2, h: 4, minH: 4 },
    { i: "GrammarEditor", x: 0, y: 2, w: 2, h: 12, minH: 10 },
    { i: "LeftRecursionSection", x: 0, y: 7, w: 2, h: 12, minH: 10 },
    { i: "FirstFunctionTable", x: 0, y: 11, w: 2, h: 6, minH: 6 },
    { i: "FollowFunctionTable", x: 0, y: 13, w: 2, h: 6, minH: 6 },
    { i: "SymbolTable", x: 0, y: 15, w: 2, h: 6, minH: 6 },
  ],
}

export default function DashboardLayout({
  childrenMap,
  visibleComponents,
  onCloseComponent,
}: {
  childrenMap: Record<string, JSX.Element>
  visibleComponents: string[]
  onCloseComponent: (key: string) => void
}) {
  return (
    <ResponsiveGridLayout
      className="h-full select-none"
      layouts={layouts}
      breakpoints={{
        lg: 1200,
        md: 996,
        sm: 768,
        xs: 480,
        xxs: 0,
      }}
      cols={{
        lg: 12,
        md: 10,
        sm: 6,
        xs: 4,
        xxs: 2,
      }}
      rowHeight={100}
      isResizable
      isDraggable
      draggableHandle=".drag-handle"
      compactType="vertical"
      preventCollision={false}
    >
      {visibleComponents.map((key) => (
        <div
          key={key}
          className="bg-gray-800 border border-gray-700 px-8 py-4 rounded-lg shadow-md h-full"
        >
          {/* Área de drag */}
          <div className="absolute top-1 left-1 drag-handle cursor-move text-gray-500 hover:text-gray-300 select-none z-10">
            <GripVertical />
          </div>

          {!fixedComponents.includes(key) && (
            <button
              className="absolute top-1 right-2 text-gray-500 hover:text-gray-300 z-10"
              onClick={() => onCloseComponent(key)}
            >
              ✖
            </button>
          )}

          {/* Componente */}
          <div className="h-full w-full overflow-hidden">{childrenMap[key]}</div>
        </div>
      ))}
    </ResponsiveGridLayout>
  )
}
