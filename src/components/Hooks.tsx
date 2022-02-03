import { Button } from 'antd'
import { createContext, useContext, useEffect, useState } from 'react'

const UserCtx = createContext<{ name: string } | null>(null)
const ThemeCtx = createContext<{ color: string } | null>(null)

function Inner () {
  const user = useContext(UserCtx)
  const theme = useContext(ThemeCtx)

  return (
    <>
      <p>User: {user?.name}</p>
      <p>Theme: {theme?.color}</p>
    </>
  )
}

export default function Hooks () {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const oriTitle = document.title
    return () => void (document.title = oriTitle)
  }, [])

  useEffect(() => void (document.title = String(counter)), [counter])

  return (
    <UserCtx.Provider value={{ name: 'blingbling' }}>
      <ThemeCtx.Provider value={{ color: 'black' }}>
        <div>
          <h2>Hooks</h2>
          Counter: {counter}
          <Button onClick={() => setCounter(counter + 1)}>+1</Button>
          <Button onClick={() => setCounter(counter - 1)}>-1</Button>
          <Inner/>
        </div>
      </ThemeCtx.Provider>
    </UserCtx.Provider>
  )
}
