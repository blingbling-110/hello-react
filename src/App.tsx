import logo from './logo.svg';
import './App.css';
import TabCtrl from './components/TabCtrl'
import { Component } from 'react'

interface IAppState {
  currView: JSX.Element
}

export default class App extends Component<any, IAppState> {
  tabContents: JSX.Element[];

  constructor (props: object) {
    super(props)

    this.state = {
      currView: this.defApp
    }

    this.tabContents = [this.defApp, <h2>customApp</h2>]
  }

  private defApp = (
    <div className="App">
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

  render () {
    const { currView } = this.state

    return (
      <div className="app-wrapper">
        <div className="tab-view">
          {currView}
        </div>
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
