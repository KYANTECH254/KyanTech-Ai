"use client"

import { useState } from 'react'

const modelOptions = [
  { id: 'deepseek-r1', name: 'DeepSeek R1' },
  { id: 'deepseek-coder-v2', name: 'DeepSeek Coder v2' },
]

const ModelSelector = ({ onModelChange }: { onModelChange: (model: string) => void }) => {
  const [selectedModel, setSelectedModel] = useState(modelOptions[0].id)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const model = e.target.value
    setSelectedModel(model)
    onModelChange(model)
  }

  return (
    <div className="fixed left-0 top-0 h-full w-60 bg-gray-900 text-white p-4 shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Select AI Model</h2>
      <select
        className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
        value={selectedModel}
        onChange={handleChange}
      >
        {modelOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ModelSelector
