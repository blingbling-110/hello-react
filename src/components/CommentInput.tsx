import { Button, Input } from "antd";
import moment, { Moment } from "moment";
import { PureComponent } from "react";

export interface ICommentInfo {
  id: number,
  avatar: string,
  username: string,
  time: Moment,
  content: string
}

export class CommentInput extends PureComponent<{ addComment: (info: ICommentInfo) => any }> {
  state = {
    content: ''
  }

  render () {
    return (
      <div style={{ width: '500px' }}>
        <Input.TextArea rows={4} value={this.state.content} onChange={event => this.setState({
          content: event.target.value
        })}/>
        <Button type={'primary'} onClick={() => this.addComment()}>添加评论</Button>
      </div>
    )
  }

  addComment () {
    let { content } = this.state
    content = content.trim()
    this.setState({
      content: ''
    })
    if (!content) {
      return
    }
    this.props.addComment({
      id: moment().valueOf(),
      avatar: 'https://avatars.githubusercontent.com/u/45316234?v=4',
      username: 'blingbling',
      time: moment(),
      content: content
    })
  }
}
