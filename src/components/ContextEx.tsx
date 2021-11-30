import React, { Component } from 'react'

interface IContextState {
  name: string,
  depth: number
}

const Context1 = React.createContext({
  name: 'from default 1',
  depth: -1
})

const Context2 = React.createContext({
  otherName: 'from default 2',
  depth: -2
})

export default class ContextEx extends Component<any, IContextState> {
  constructor (props: any) {
    super(props)
    this.state = {
      name: 'from top',
      depth: 0
    }
  }

  render () {
    return (
      <div>
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
}

function MiddleCom () {
  return (
    <div>
      <ClassChild/>
      <FunctionChild/>
    </div>
  )
}

class ClassChild extends Component<any, any> {
  render () {
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