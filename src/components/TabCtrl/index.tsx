import { Component } from 'react'
import { TabCtrlWrapper } from './style'
// import './index.scss'

interface ITabProps {
  tabTitles: string[],
  chgView: (index: number) => void
}

interface ITabState {
  currIndex: number
}

export default class TabCtrl extends Component<ITabProps, ITabState> {
  constructor (props: ITabProps) {
    super(props)

    this.state = {
      currIndex: 0
    }
  }

  render () {
    const { currIndex } = this.state

    return (
      <TabCtrlWrapper>
        {
          this.props.tabTitles.map((tabTitle, index) =>
            <div key={index} className={`tab-item ${index === currIndex ? 'active' : ''}`}
                 onClick={() => this.chgTab(index)}>{tabTitle}</div>)
        }
      </TabCtrlWrapper>
    )
  }

  chgTab (index: number) {
    this.setState({
      currIndex: index
    })
    this.props.chgView(index)
  }
}
