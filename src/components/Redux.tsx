import { Button } from 'antd'
import { connect } from 'react-redux'
import {
  addAction,
  decAction,
  getHomeMultiDataAction,
  incAction,
  subAction,
} from '../store/actionCreators'
import { useEffect } from 'react'

function Home (props: any) {
  useEffect(() => props.getHomeMultiData(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return (
    <>
      <h1>Home</h1>
      <h2>当前计数：{props.counter}</h2>
      <Button onClick={() => props.incAction()}>++</Button>
      <Button onClick={() => props.addAction(5)}>+5</Button>
    </>
  )
}

const WrappedHome = connect((state: any) => ({ counter: state.counter }),
  (dispatch: any) => ({
    incAction: () => dispatch(incAction()),
    addAction: (num: number) => dispatch(addAction(num)),
    getHomeMultiData: () => dispatch(getHomeMultiDataAction()),
  }))(Home)

function About (props: any) {
  return (
    <>
      <h1>About</h1>
      <h2>当前计数：{props.counter}</h2>
      <Button onClick={() => props.decAction()}>--</Button>
      <Button onClick={() => props.subAction(5)}>-5</Button>
      <h2>Banner</h2>
      <ul>
        {
          props.banner.map((item: any) => <li key={item.acm}>{item.title}</li>)
        }
      </ul>
      <h2>Recommend</h2>
      <ul>
        {
          props.recommend.map((item: any) => <li key={item.acm}>{item.title}</li>)
        }
      </ul>
    </>
  )
}

const WrappedAbout = connect((state: any) => ({
    counter: state.counter,
    banner: state.banner,
    recommend: state.recommend,
  }),
  (dispatch: any) => ({
    decAction: () => dispatch(decAction()),
    subAction: (num: number) => dispatch(subAction(num)),
  }))(About)

export default function Redux () {
  return (
    // 没有顶栏因此添加maxHeight: 100%
    <div style={{ maxHeight: '100%', padding: '20px' }}>
      <WrappedHome/>
      <hr/>
      <WrappedAbout/>
    </div>
  )
}
