import { PureComponent } from "react";
import { ICommentInfo } from "./CommentInput";
import { Avatar, Comment, Tooltip } from 'antd'
import { DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";

interface ICommentItemProps {
  info: ICommentInfo,
  delete: () => any
}

export const COM_ITEM_TIME_OUT = 888

const StyledComItem = styled(Comment)`
  &.com-item-enter {
    opacity: 0;
  }

  &.com-item-enter-active {
    opacity: 1;
    transition: opacity ${COM_ITEM_TIME_OUT}ms;
  }

  &.com-item-exit-active {
    opacity: 0;
    transition: opacity ${COM_ITEM_TIME_OUT}ms;
  }
`

export class CommentItem extends PureComponent<ICommentItemProps> {
  render () {
    const { avatar, username, time, content } = this.props.info

    return (
      <StyledComItem
        actions={[<span onClick={() => this.props.delete()}><DeleteOutlined/>删除</span>]}
        author={username}
        avatar={<Avatar src={avatar} alt={username}/>}
        content={<p>{content}</p>}
        datetime={
          <Tooltip title={time.format('YYYY-MM-DD HH:mm:ss')}>
            <span>{time.fromNow()}</span>
          </Tooltip>
        }
      />
    )
  }
}
