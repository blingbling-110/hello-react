import React, { Component, createRef, memo, PureComponent, RefObject } from 'react'

interface ICustomState {
  name: string,
  depth: number,
  msg: string
}

function SubCom (props: { msg: string }) {
  return <h2>SubCom: {props.msg}</h2>
}

const Context1 = React.createContext({
  name: 'from default 1',
  depth: -1
})

const Context2 = React.createContext({
  otherName: 'from default 2',
  depth: -2
})

export default class Custom extends Component<any, ICustomState> {
  private readonly btnEl: RefObject<HTMLButtonElement>

  constructor (props: any) {
    super(props)
    this.state = {
      name: 'from top',
      depth: 0,
      msg: 'Hello, state!'
    }
    this.btnEl = createRef()
  }

  render () {
    return (
      <div>
        <h2>state: {JSON.stringify(this.state)}</h2>
        <button onClick={() => this.chgState()}>更新</button>
        <SubCom msg={this.state.msg}/>
        <button ref={this.btnEl}>DOM事件</button>
        <button onClick={() => this.merge()}>合并</button>

        <hr/>
        <MiddleCom/>

        <hr/>
        <Context1.Provider value={this.state}>
          <MiddleCom/>
        </Context1.Provider>

        <hr/>
        <Context1.Provider value={this.state}>
          <Context1.Provider value={{
            name: 'from inner',
            depth: 1
          }}>
            <MiddleCom/>
          </Context1.Provider>
        </Context1.Provider>

        <hr/>
        <Context1.Provider value={this.state}>
          <Context2.Provider value={{
            otherName: 'from inner',
            depth: 2
          }}>
            <MiddleCom/>
          </Context2.Provider>
        </Context1.Provider>
      </div>
    )
  }

  private chgState () {
    setTimeout(() => {
      this.setState({
        msg: '延时'
      })
      console.log('setTimeout', this.state.msg)
    }, 2000)
    this.setState({
      msg: '你好，状态！'
    }, () => console.log('setStateCb', this.state.msg))
    console.log('sync', this.state.msg)
  }

  componentDidUpdate (prevProps: Readonly<any>, prevState: Readonly<ICustomState>, snapshot?: any) {
    console.log('componentDidUpdate', this.state.msg)
  }

  componentDidMount () {
    this.btnEl.current?.addEventListener('click', () => {
      this.setState({
        msg: 'DOM事件'
      })
      console.log('dom', this.state.msg)
    })
  }

  private merge () {
    this.setState(state => {
      return {
        msg: state.msg + '+'
      }
    })
    this.setState(state => {
      return {
        msg: state.msg + '+'
      }
    })
    this.setState(state => {
      return {
        msg: state.msg + '+'
      }
    })
  }
}

const MemoFunctionChild = memo(FunctionChild)

function MiddleCom () {
  return (
    <div>
      <ClassChild/>
      <MemoFunctionChild/>
    </div>
  )
}

class ClassChild extends PureComponent<any, any> {
  render () {
    // console.log('ClassChild.render()')
    return (
      <div>
        <h3>ClassChild</h3>
        <span>{this.context.name}</span>
        <span>,depth: {this.context.depth}</span>
      </div>
    )
  }
}

ClassChild.contextType = Context1

function FunctionChild () {
  console.log('FunctionChild.render()')
  return (
    <Context2.Consumer>
      {
        value => (
          <div>
            <h3>FunctionChild</h3>
            <span>{value.otherName}</span>
            <span>,depth: {value.depth}</span>
          </div>
        )
      }
    </Context2.Consumer>
  )
}
