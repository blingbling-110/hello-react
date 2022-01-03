import logo from './logo.svg';
import './App.scss';
import TabCtrl from './components/TabCtrl'
import { Component } from 'react'
import NavBar from './components/NavBar'
import Custom from './components/Custom'
import styled from "styled-components";
import { AntD } from "./components/AntD";
import { bgColor, fontColor, tabHeight } from "./components/TabCtrl/style";

interface IAppState {
  currView: JSX.Element
}

const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  & > div:first-child {
    max-height: calc(100% - ${tabHeight});
    flex: 1;
    display: flex;
    flex-direction: column;

    & > *:last-child {
      max-height: calc(100% - ${tabHeight});
      flex: 1;
      overflow: auto;
      background-color: ${bgColor};
      color: ${fontColor};
    }

    // 避免antd的影响
    & h1, & h2, & h3 {
      color: ${fontColor};
    }
  }
`

export default class App extends Component<any, IAppState> {
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

  private tabContents: JSX.Element[] = [
    <>
      <NavBar/>
      {this.defApp}
    </>,
    <>
      <NavBar leftSlot={<span>customLeft</span>}
              centerSlot={<span>customCenter</span>}
              rightSlot={<span>customRight</span>}/>
      <Custom name={'自定义'}/>
    </>,
    <>
      <AntD/>
    </>
  ]

  constructor (props: any) {
    super(props)

    this.state = {
      currView: this.tabContents[0]
    }
  }

  render () {
    return (
      <AppWrapper>
        <div className={'tab-view'}>
          {this.state.currView}
        </div>
        <TabCtrl tabTitles={['默认', '自定义', 'antd']} chgView={(index: number) => this.chgView(index)}/>
      </AppWrapper>
    )
  }

  chgView (index: number) {
    this.setState({
      currView: this.tabContents[index]
    })
  }
}
