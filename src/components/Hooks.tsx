import { Button } from 'antd'
import { createContext, useContext, useEffect, useReducer } from 'react'

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

function reducer (state: { counter: number }, action: any) {
  switch (action.type) {
    case 'increment':
      return { ...state, counter: state.counter + 1 }
    case 'decrement':
      return { ...state, counter: state.counter - 1 }
    default:
      return state
  }
}

export default function Hooks () {
  // const [counter, setCounter] = useState(0)
  const [state, dispatch] = useReducer(reducer, { counter: 0 })

  useEffect(() => {
    const oriTitle = document.title
    return () => void (document.title = oriTitle)
  }, [])

  // useEffect(() => void (document.title = String(counter)), [counter])

  return (
    <UserCtx.Provider value={{ name: 'blingbling' }}>
      <ThemeCtx.Provider value={{ color: 'black' }}>
        <div>
          <h2>Hooks</h2>
          {/*Counter: {counter}*/}
          Counter: {state.counter}
          {/*<Button onClick={() => setCounter(counter + 1)}>+1</Button>*/}
          {/*<Button onClick={() => setCounter(counter - 1)}>-1</Button>*/}
          <Button onClick={() => dispatch({ type: 'increment' })}>+1</Button>
          <Button onClick={() => dispatch({ type: 'decrement' })}>-1</Button>
          <Inner/>
        </div>
      </ThemeCtx.Provider>
    </UserCtx.Provider>
  )
}
