import styled from "styled-components";

export const TabCtrlWrapper = styled.div`
  width: 100%;
  height: 2.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  user-select: none;
  font-size: 1.2rem;
  background-color: #1f2428;
  color: white;

  .tab-item {
    box-sizing: border-box;
    height: 2.5rem;
    line-height: 2.5rem;
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
