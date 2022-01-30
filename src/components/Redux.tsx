import store from '../store'
import { addAction, decAction, incAction, subAction } from '../store/actionCreators'
import { Button } from 'antd'
import { useEffect, useState } from 'react'

function Home () {
  const [counter, setCounter] = useState(store.getState().counter)

  useEffect(() => {
    const unsubscribe = store.subscribe(() => setCounter(store.getState().counter))
    return () => unsubscribe()
  }, [])

  return (
    <>
      <h1>Home</h1>
      <h2>当前计数：{counter}</h2>
      <Button onClick={() => store.dispatch(incAction())}>++</Button>
      <Button onClick={() => store.dispatch(addAction(5))}>+5</Button>
    </>
  )
}

function About () {
  const [counter, setCounter] = useState(store.getState().counter)

  useEffect(() => {
    const unsubscribe = store.subscribe(() => setCounter(store.getState().counter))
    return () => unsubscribe()
  }, [])
  return (
    <>
      <h1>About</h1>
      <h2>当前计数：{counter}</h2>
      <Button onClick={() => store.dispatch(decAction())}>--</Button>
      <Button onClick={() => store.dispatch(subAction(5))}>-5</Button>
    </>
  )
}

export default function Redux () {
  return (
    // 没有顶栏因此添加maxHeight: 100%
    <div style={{ maxHeight: '100%', padding: '20px' }}>
      <Home/>
      <hr/>
      <About/>
    </div>
  )
}
