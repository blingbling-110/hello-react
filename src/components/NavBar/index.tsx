import './index.scss'
import { Component } from 'react'

const defaultProps = {
  leftSlot: <span>dftLeft</span>,
  centerSlot: <span>dftCenter</span>,
  rightSlot: <span>dftRight</span>
}

export default class NavBar extends Component<typeof defaultProps, any>{
  static defaultProps = defaultProps

  render () {
    const {leftSlot, centerSlot, rightSlot} = this.props

    return (
      <div className="nav-bar">
        <div className="nav-left">{leftSlot}</div>
        <div className="nav-center">{centerSlot}</div>
        <div className="nav-right">{rightSlot}</div>
      </div>
    )
  }
}