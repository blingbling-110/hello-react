import { PureComponent } from "react";
import { Button, DatePicker, Space } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import moment from "moment";
import { CommentItem } from "./Comment/CommentItem";
import { CommentInput, ICommentInfo } from "./Comment/CommentInput";
import request, { requestAll } from "../service/Ajax";

interface IAntDState {
  loadings: boolean[],
  commentInfos: ICommentInfo[]
}

export class AntD extends PureComponent<any, IAntDState> {
  state: IAntDState = {
    loadings: [],
    commentInfos: []
  };

  enterLoading = (index: number) => {
    this.setState(({ loadings }) => {
      const newLoadings = [...loadings];
      newLoadings[index] = true;

      return {
        loadings: newLoadings,
      };
    });
    setTimeout(() => {
      this.setState(({ loadings }) => {
        const newLoadings = [...loadings];
        newLoadings[index] = false;

        return {
          loadings: newLoadings,
        };
      });
    }, 6000);
  };

  render () {
    const { loadings } = this.state;
    return (
      // 没有顶栏因此添加maxHeight: 100%
      <div style={{ maxHeight: '100%', padding: '20px' }}>
        <Space style={{ width: '100%' }}>
          <Button type="primary" loading>
            Loading
          </Button>
          <Button type="primary" size="small" loading>
            Loading
          </Button>
          <Button type="primary" icon={<PoweroffOutlined/>} loading/>
        </Space>

        <Space style={{ width: '100%' }}>
          <Button type="primary" loading={loadings[0]} onClick={() => this.enterLoading(0)}>
            Click me!
          </Button>
          <Button
            type="primary"
            icon={<PoweroffOutlined/>}
            loading={loadings[1]}
            onClick={() => this.enterLoading(1)}
          >
            Click me!
          </Button>
          <Button
            type="primary"
            icon={<PoweroffOutlined/>}
            loading={loadings[2]}
            onClick={() => this.enterLoading(2)}
          />
        </Space>

        <DatePicker defaultValue={moment('2022-01-03', 'YYYY-MM-DD')} allowClear={false}/>

        {this.state.commentInfos.map(commentInfo =>
          <CommentItem key={commentInfo.id} info={commentInfo} delete={() => this.deleteComment(commentInfo.id)}/>
        )}

        <CommentInput addComment={(info: ICommentInfo) => this.setState({
          commentInfos: [...this.state.commentInfos, info]
        })}/>
      </div>
    )
  }

  private deleteComment (id: number) {
    const index = this.state.commentInfos.findIndex(commentInfo => commentInfo.id === id)
    const restCommentInfos = [...this.state.commentInfos]
    restCommentInfos.splice(index, 1)
    this.setState({
      commentInfos: restCommentInfos
    })
  }

  async componentDidMount () {
    // request({
    //   url: '/get',
    //   params: {
    //     name: 'blingbling',
    //     age: 18
    //   }
    // }).then(console.log)
    //   .catch(console.error)
    // request({
    //   url: '/post',
    //   data: {
    //     name: 'blingbling',
    //     age: 18
    //   },
    //   method: 'post'
    // }).then(console.log)
    //   .catch(console.error)

    try {
      const res = await request.post('/post', {
        name: 'blingbling',
        age: 18
      })
      console.log(res)
    } catch (e) {
      console.error(e)
    }

    const request1 = request.get('/get', {
      params: {
        name: 'blingbling',
        age: 18
      }
    })
    const request2 = request.post('/post', {
      name: 'blingbling',
      age: 18
    })

    requestAll([request1, request2])
      .then(console.log)
      .catch(console.error)

    request.get('/get', {
      params: {
        name: 'blingbling',
        age: 18
      }
    }).then(console.log)
      .catch(console.error)
  }
}
