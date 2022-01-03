import { PureComponent } from "react";
import { ICommentInfo } from "./CommentInput";
import { Avatar, Comment, Tooltip } from 'antd'
import { DeleteOutlined } from "@ant-design/icons";

interface ICommentItemProps {
  info: ICommentInfo,
  delete: () => any
}

export class CommentItem extends PureComponent<ICommentItemProps> {
  render () {
    const { avatar, username, time, content } = this.props.info

    return (
      <Comment
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
