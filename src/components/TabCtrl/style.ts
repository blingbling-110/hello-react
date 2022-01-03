import styled from "styled-components";

export const tabHeight = '2.5rem'
export const bgColor = '#1f2428'
export const fontColor = 'white'

export const TabCtrlWrapper = styled.div`
  width: 100%;
  height: ${tabHeight};
  display: flex;
  justify-content: space-around;
  align-items: center;
  user-select: none;
  font-size: 1.2rem;
  background-color: ${bgColor};
  color: ${fontColor};

  .tab-item {
    box-sizing: border-box;
    height: ${tabHeight};
    line-height: ${tabHeight};
    cursor: pointer;

    &.active {
      color: red;
      border-bottom: solid 2px red;
    }

    &:hover {
      color: red;
    }
  }
`
