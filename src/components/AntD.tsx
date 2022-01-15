import { PureComponent } from "react";
import { Button, Card, DatePicker, Space } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import moment from "moment";
import { CommentItem, COM_ITEM_TIME_OUT } from "./Comment/CommentItem";
import { CommentInput, ICommentInfo } from "./Comment/CommentInput";
import request, { requestAll } from "../service/Ajax";
import { CSSTransition, SwitchTransition, TransitionGroup } from 'react-transition-group'
import styled from "styled-components";

interface IAntDState {
  loadings: boolean[],
  commentInfos: ICommentInfo[],
  showCard: boolean,
  showOn: boolean
}

const CARD_TIME_OUT = 1000
const BTN_TIME_OUT = 500

const StyledCard = styled(Card)`
  display: inline-block;

  &.card-enter, &.card-appear {
    opacity: 0;
  }

  &.card-enter-active, &.card-appear-active {
    opacity: 1;
    transition: opacity ${CARD_TIME_OUT}ms;
  }

  &.card-enter-done, &.card-appear-done {
    opacity: 1;
  }

  &.card-exit {
    opacity: 1;
  }

  &.card-exit-active {
    opacity: 0;
    transition: opacity ${CARD_TIME_OUT}ms;
  }

  &.card-exit-done {
    opacity: 0;
  }
`

const StyledBtn = styled(Button)`
  &.btn-enter {
    opacity: 0;
    transform: translateX(100%);
  }

  &.btn-enter-active {
    opacity: 1;
    transition: opacity ${BTN_TIME_OUT}ms, transform ${BTN_TIME_OUT}ms;
  }

  &.btn-exit-active {
    opacity: 0;
    transform: translateX(-100%);
    transition: opacity ${BTN_TIME_OUT}ms, transform ${BTN_TIME_OUT}ms;
  }
`

export class AntD extends PureComponent<any, IAntDState> {
  state: IAntDState = {
    loadings: [],
    commentInfos: [],
    showCard: true,
    showOn: true
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
    const { loadings, showCard, showOn } = this.state;
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

        <TransitionGroup>
          {
            this.state.commentInfos.map(commentInfo =>
              <CSSTransition
                key={commentInfo.id}
                timeout={COM_ITEM_TIME_OUT}
                classNames={'com-item'}
              >
                <CommentItem info={commentInfo} delete={() => this.deleteComment(commentInfo.id)}/>
              </CSSTransition>
            )
          }
        </TransitionGroup>

        <CommentInput addComment={(info: ICommentInfo) => this.setState({
          commentInfos: [...this.state.commentInfos, info]
        })}/>
        <Button type="primary" onClick={() => this.setState({ showCard: !showCard })}>显示/隐藏</Button>

        <CSSTransition
          in={this.state.showCard}
          classNames={'card'}
          timeout={CARD_TIME_OUT}
          // unmountOnExit={true}
          appear
          onEnter={(el: any) => console.log('onEnter', el)}
          onEntering={(el: any) => console.log('onEntering', el)}
          onEntered={(el: any) => console.log('onEntered', el)}
          onExit={(el: any) => console.log('onExit', el)}
          onExiting={(el: any) => console.log('onExiting', el)}
          onExited={(el: any) => console.log('onExited', el)}
        >
          <StyledCard
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
          >
            <Card.Meta title="Europe Street beat" description="www.instagram.com"/>
          </StyledCard>
        </CSSTransition>

        <SwitchTransition mode={"out-in"}>
          <CSSTransition
            key={showOn ? 'on' : 'off'}
            classNames={'btn'}
            timeout={BTN_TIME_OUT}
          >
            <StyledBtn onClick={() => this.setState({ showOn: !showOn })}>
              {showOn ? 'on' : 'off'}
            </StyledBtn>
          </CSSTransition>
        </SwitchTransition>
      </div>
    )
  }

  private deleteComment (id: number) {
    const index = this.state.commentInfos.findIndex(commentInfo => commentInfo.id === id)
    if (index === -1)
    {
      // 若未找到则直接返回
      return
    }
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
