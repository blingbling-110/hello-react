import logo from './logo.svg';
import './App.css';
import TabCtrl from './components/TabCtrl'
import { Component } from 'react'
import NavBar from './components/NavBar'
import ContextEx from './components/ContextEx'

interface IAppState {
  currView: JSX.Element
}

export default class App extends Component<any, IAppState> {
  private defApp = (
    <div className="App page-view">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )

  private tabContents: JSX.Element[] = [
    <div className="tab-view">
      <NavBar/>
      {this.defApp}
    </div>,
    <div className="tab-view">
      <NavBar leftSlot={<span>customLeft</span>}
              centerSlot={<span>customCenter</span>}
              rightSlot={<span>customRight</span>}/>
      <ContextEx className="page-view"/>
    </div>
  ]

  constructor (props: object) {
    super(props)

    this.state = {
      currView: this.tabContents[0]
    }
  }

  render () {
    const { currView } = this.state

    return (
      <div className="app-wrapper">
        {currView}
        <TabCtrl tabTitles={['缺省', '自定义']} chgView={index => this.chgView(index)}/>
      </div>
    )
  }

  chgView (index: number) {
    this.setState({
      currView: this.tabContents[index]
    })
  }
}
