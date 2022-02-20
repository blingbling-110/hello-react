import { Button } from 'antd'
import { createContext, memo, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react'

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

const Btn = memo((props: {
  onClick: () => void,
  title: string
}) => {
  props.title.startsWith('useState') && console.log(`${props.title} Btn渲染`)
  return <Button onClick={props.onClick}>{props.title}</Button>
})

const Info = memo((props: { info: { content: string } }) => {
  console.log('info渲染')
  return <p>{props.info.content}</p>
})

export default function Hooks () {
  const [counter, setCounter] = useState(0)
  const [state, dispatch] = useReducer(reducer, { counter: 0 })
  const [calc, setCalc] = useState(0)
  const sum = useMemo(() => {
    console.log('求和')
    return calc * (calc + 1) / 2
  }, [calc])
  const info = useMemo(() => ({ content: 'useMemo props' }), [])

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
          useState: {counter}
          <br/>
          <Btn onClick={useCallback(() => setCounter(counter + 1), [counter])} title={'useState +1'}/>
          <Btn onClick={() => setCounter(counter - 1)} title={'useState -1'}/>
          <br/>
          useReducer: {state.counter}
          <br/>
          <Btn onClick={() => dispatch({ type: 'increment' })} title={'useReducer +1'}/>
          <Btn onClick={() => dispatch({ type: 'decrement' })} title={'useReducer -1'}/>
          <Inner/>
          useMemo: {`0 + ... + ${calc} = ${sum}`}
          <Btn onClick={() => setCalc(calc + 1)} title={'useMemo +1'}/>
          <Info info={info}/>
        </div>
      </ThemeCtx.Provider>
    </UserCtx.Provider>
  )
}
