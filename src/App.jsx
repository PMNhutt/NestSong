import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex justify-center w-full items-center">
      <h1 className="bg-red text-4xl align-middle uppercase pt-5">Vite + React</h1>
    </div>
  )
}

export default App
