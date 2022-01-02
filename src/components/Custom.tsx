import React, { Component, createRef, FunctionComponent, memo, PureComponent, RefObject } from 'react'
import { EventEmitter } from "events";

interface ICustomState {
  name: string,
  depth: number,
  msg: string,
  friends: Array<{
    id: number,
    name: string,
    age: number
  }>,
  username: string,
  password: string,
  captcha: string,
  fruit: string
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

const eventBus = new EventEmitter()

class Home extends PureComponent<any> {
  render () {
    return (
      <div>
        <button onClick={() => eventBus.emit('homeEvt', 'from Home', 'emitted')}>Home</button>
        <p>{`区域：${this.props.region}，otherName: ${this.props.otherName}，depth: ${this.props.depth}`}</p>
      </div>
    )
  }
}

class Profile extends PureComponent<any> {
  btnEl: HTMLButtonElement | null = null

  render () {
    return (
      <div>
        <button ref={el => this.btnEl = el} onClick={() => console.log(this.btnEl)}>Profile</button>
        <p>{`区域：${this.props.region}，otherName: ${this.props.otherName}，depth: ${this.props.depth}`}</p>
      </div>
    )
  }

  private static homeEvtHandler (...args: any[]) {
    console.log('Profile接收到homeEvt: ', args)
  }

  componentDidMount () {
    eventBus.addListener('homeEvt', Profile.homeEvtHandler)
  }

  componentWillUnmount () {
    eventBus.removeListener('homeEvt', Profile.homeEvtHandler)
  }
}

const EnhancedHome = enhanceClassCom(withRenderTime(Home))
const EnhancedProfile = enhanceClassCom(withRenderTime(Profile))

function CartPage () {
  return <h2>CartPage</h2>
}

function LoginPage () {
  return <h2>LoginPage</h2>
}

function withAuth (InnerCom: typeof Component | FunctionComponent) {
  const WrappedCom = (props: any) => {
    if (props.isLogin) {
      return <InnerCom {...props}/>
    } else {
      return <LoginPage {...props}/>
    }
  }
  Object.assign(WrappedCom, { displayName: `AuthedCom` })
  return WrappedCom
}

const AuthCartPage = withAuth(CartPage)

function withRenderTime (InnerCom: typeof Component | FunctionComponent) {
   const WrappedCom = class extends PureComponent {
    private readonly begin: number

    private end: number = 0

    constructor (props: any) {
      super(props)
      this.begin = Date.now()
    }

    render () {
      return <InnerCom {...this.props}/>
    }

    componentDidMount () {
      this.end = Date.now()
      console.log(`${InnerCom.name}渲染事件：${this.end - this.begin}ms`)
    }
  }
  Object.assign(WrappedCom, { displayName: `RenderTimeCom` })
  return WrappedCom
}

class Custom extends PureComponent<any, ICustomState> {
  private readonly btnEl: RefObject<HTMLButtonElement>

  constructor (props: any) {
    super(props)
    this.state = {
      name: 'from top',
      depth: 0,
      msg: 'Hello, state!',
      friends: [
        {
          id: 0,
          name: 'lilei',
          age: 20
        },
        {
          id: 1,
          name: 'lily',
          age: 25
        },
        {
          id: 2,
          name: 'lucy',
          age: 22
        }
      ],
      username: '',
      password: '',
      captcha: '',
      fruit: 'apple'
    }
    this.btnEl = createRef()
  }

  render () {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <AuthCartPage isLogin={true}/>

        <hr/>
        <form onSubmit={evt => this.submitHandler(evt)}>
          <label htmlFor="username">用户名：
            <input type="text" id={'username'} name={'username'}
                   onChange={evt => this.formHandler(evt)}
                   value={this.state.username}/>
          </label>
          <br/>
          <label htmlFor="password">密码：
            <input type="password" id={'password'} name={'password'}
                   onChange={evt => this.formHandler(evt)}
                   value={this.state.password}
                   autoComplete={'off'}/>
          </label>
          <br/>
          <label htmlFor="captcha">验证码：
            <input type="text" id={'captcha'} name={'captcha'}
                   onChange={evt => this.formHandler(evt)}
                   value={this.state.captcha}/>
          </label>
          <br/>
          <label htmlFor="fruit">水果：
            <select name="fruit" id="fruit"
                    onChange={evt => this.formHandler(evt)}
                    value={this.state.fruit}>
              <option value="apple">苹果</option>
              <option value="banana">香蕉</option>
              <option value="orange">橘子</option>
            </select>
          </label>
          <input type="submit" value={'提交'}/>
        </form>

        <hr/>
        <Context2.Provider value={{
          otherName: '高阶组件共享',
          depth: 3
        }}>
          <EnhancedHome/>
          <EnhancedProfile/>
        </Context2.Provider>

        <hr/>
        <button onClick={() => this.insertFriend()}>添加新数据</button>
        <ul>
          {this.state.friends.map(friend =>
            <li key={friend.id}>
              姓名：{friend.name}，年龄：{friend.age}
              <button onClick={() => this.grow(friend.id)}>年龄+1</button>
            </li>)}
        </ul>

        <hr/>
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
    // console.log('componentDidUpdate', this.state.msg)
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

  private insertFriend () {
    const friends = this.state.friends
    this.setState({
      friends: [...friends, {
        id: friends.length,
        name: 'tom',
        age: 24
      }]
    })
  }

  private grow (id: number) {
    this.setState({
      friends: this.state.friends.map(friend => {
        return {
          id: friend.id,
          name: friend.name,
          age: friend.id === id ? friend.age + 1 : friend.age
        }
      })
    })
  }

  private submitHandler (evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    console.log(
      this.state.username,
      this.state.password,
      this.state.captcha,
      this.state.fruit
    )
  }

  private formHandler (evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    this.setState({
      [evt.target.name]: evt.target.value
    } as Pick<ICustomState,
      'username' |
      'password' |
      'captcha' |
      'fruit'>)
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
  // console.log('FunctionChild.render()')
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

function enhanceClassCom (InnerCom: typeof Component | FunctionComponent,) {
  const WrappedCom = class extends PureComponent<any, any> {
    render () {
      return <InnerCom {...this.props} region={'China'} {...this.context}/>
    }
  }
  WrappedCom.contextType = Context2
  Object.assign(WrappedCom, { displayName: `RegionContext2${InnerCom.name}` })
  return WrappedCom
}

function enhanceFuncCom (InnerCom: typeof Component | FunctionComponent) {
  function WrappedCom (props: any) {
    return <InnerCom {...props}/>
  }

  Object.assign(WrappedCom, { displayName: `Wrapped${InnerCom.name}` })
  return WrappedCom
}

export default enhanceFuncCom(Custom)
