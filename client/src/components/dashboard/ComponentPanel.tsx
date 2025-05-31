// components/ComponentPanel.tsx
export default function ComponentPanel({
  allComponents,
  visibleComponents,
  setVisibleComponents,
}: {
  allComponents: string[]
  visibleComponents: string[]
  setVisibleComponents: (visible: string[]) => void
}) {
  const toggleComponent = (key: string) => {
    setVisibleComponents(
      visibleComponents.includes(key)
        ? visibleComponents.filter((v) => v !== key)
        : [...visibleComponents, key]
    )
  }

  return (
    <div className="bg-gray-800 p-4 rounded text-sm mb-4">
      <h3 className="text-lg mb-2">Componentes visibles</h3>
      {allComponents.map((key) => {
        const inputId = `component-checkbox-${key}`;
        return (
          <div key={key} className="flex items-center mb-1">
            <input
              id={inputId}
              type="checkbox"
              checked={visibleComponents.includes(key)}
              onChange={() => toggleComponent(key)}
              className="mr-2"
            />
            <label htmlFor={inputId}>{key}</label>
          </div>
        );
      })}
    </div>
  )
}
