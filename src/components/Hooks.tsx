import { Button, Input } from 'antd'
import {
  createContext, ForwardedRef,
  forwardRef,
  memo,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle, useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'

const UserCtx = createContext<{ name: string } | null>(null)
const ThemeCtx = createContext<{ color: string } | null>(null)

function Inner () {
  const { user, theme } = useCtx()

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
  useLoggingLife('Info')
  console.log('info渲染')
  return <p>{props.info.content}</p>
})

const HYInput = forwardRef((props, ref: ForwardedRef<{ focus: () => any }>) => {
  useLoggingLife('HYInput')
  const innerRef = useRef<Input>(null)
  useImperativeHandle(ref, () => ({ focus: () => innerRef.current && innerRef.current.focus() }))
  return <Input style={{ width: '200px' }} ref={innerRef}/>
})

function useLoggingLife (name: string) {
  useEffect(() => {
    console.log(`${name}已创建`)
    return () => console.log(`${name}将被销毁`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

function useCtx () {
  const user = useContext(UserCtx)
  const theme = useContext(ThemeCtx)
  return { user, theme }
}

function usePageY () {
  const [pageY, setPageY] = useState(0)
  useEffect(() => {
    const handleMousemove = (event: MouseEvent) => setPageY(event.pageY)
    document.addEventListener('mousedown', handleMousemove)
    return () => document.removeEventListener('mousedown', handleMousemove)
  }, [])
  return pageY
}

function useLocalStorage (key: string) {
  const [data, setData] = useState(() => JSON.parse(String(window.localStorage.getItem(key))) || 'null')
  useEffect(() => window.localStorage.setItem('data', JSON.stringify(data)), [data])
  return [data, setData]
}

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

  const titleRef = useRef<HTMLHeadingElement>(null)
  const counterRef = useRef<number>(counter)
  useEffect(() => {
    counterRef.current = counter
  }, [counter])

  const inputRef = useRef<{ focus: () => any }>(null)

  useLayoutEffect(() => {
    counter === 888 && setCounter(Math.random())
  }, [counter])

  const pageY = usePageY()

  const [data, setData] = useLocalStorage('data')

  return (
    <UserCtx.Provider value={{ name: 'blingbling' }}>
      <ThemeCtx.Provider value={{ color: 'black' }}>
        <div>
          <h2 ref={titleRef}>Hooks</h2>
          useState: {counter}
          <br/>
          useRef: {counterRef.current}
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
          <Button onClick={() => (titleRef.current && (titleRef.current.innerHTML = 'useRef'))}>useRef</Button>
          <HYInput ref={inputRef}/>
          <Button onClick={() => inputRef.current && inputRef.current.focus()}>focus</Button>
          <br/>
          <Button onClick={() => setCounter(888)}>useLayoutEffect</Button>
          <h2 style={{ position: 'fixed', right: '100px', top: 0 }}>{pageY}</h2>
          <h2>{data}</h2>
          <Button onClick={() => setData('Custom Hook')}>SetData</Button>
        </div>
      </ThemeCtx.Provider>
    </UserCtx.Provider>
  )
}
