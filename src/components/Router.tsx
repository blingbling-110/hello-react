import {
  Navigate,
  NavLink,
  Outlet,
  useLocation,
  useMatch,
  useNavigate, useRoutes,
  useSearchParams,
} from 'react-router-dom'
import styled from 'styled-components'
import { Button } from 'antd'
import Hooks from './Hooks'

const StyledDiv = styled.div`
  a {
    margin-right: 8px;

    &.active {
      color: red;
    }
  }
`

function User (props: { isLogin: boolean }) {
  return props.isLogin ? <div>User</div> : <Navigate to={'/login'}/>
}

function About () {
  const navigate = useNavigate()
  return (
    <div>
      <NavLink to={'history'}>企业历史</NavLink>
      <NavLink to={'culture'}>企业文化</NavLink>
      <NavLink to={'contact'}>联系我们</NavLink>
      <Button onClick={() => navigate('join')}>加入我们</Button>

      <Outlet/>
    </div>
  )
}

function Detail () {
  const match = useMatch('detail/:id')
  return (
    <div>Detail: {match?.params.id}</div>
  )
}

function Detail2 () {
  const searchParams = useSearchParams()[0]
  return (
    <div>
      Detail2
      <br/>
      id: {searchParams.get('id')}
      <br/>
      amount: {searchParams.get('amount')}
    </div>
  )
}

function Detail3 () {
  const location = useLocation()
  console.log(location)
  const state = location.state as any
  return (
    <div>
      Detail3
      <br/>
      id: {state.id}
      <br/>
      amount: {state.amount}
    </div>
  )
}

export default function Router () {
  return (
    // 没有顶栏因此添加maxHeight: 100%
    <StyledDiv style={{ maxHeight: '100%', padding: '20px' }}>
      <h1>Router</h1>
      <NavLink
        to={''}
        style={({ isActive }) => isActive ? { color: 'red' } : {}}
        className={({ isActive }) => isActive ? 'link-active' : ''}
      >首页</NavLink>
      <NavLink to={'about'}>关于</NavLink>
      <NavLink to={'profile'}>我的</NavLink>
      <NavLink to={'user'}>用户</NavLink>
      <NavLink to={'detail/prod'}>详情</NavLink>
      <NavLink to={'detail2?id=prod&amount=2'}>详情2</NavLink>
      <NavLink
        to={{
          pathname: 'detail3',
          search: '?param=3',
          hash: '#hash',
        }}
        state={{
          id: 'prod',
          amount: 2,
        }}
      >详情3</NavLink>

      {/*<Routes>*/}
      {/*  <Route path={'*'} element={<div>NotFound</div>}/>*/}
      {/*  <Route path={''} element={<div>Home</div>}/>*/}
      {/*  <Route path={'about'} element={<About/>}>*/}
      {/*    <Route index element={<Navigate to={'history'} replace={true}/>}/>*/}
      {/*    <Route path={'history'} element={<div>History</div>}/>*/}
      {/*    <Route path={'culture'} element={<div>Culture</div>}/>*/}
      {/*    <Route path={'contact'} element={<div>Contact</div>}/>*/}
      {/*    <Route path={'join'} element={<div>Join</div>}/>*/}
      {/*  </Route>*/}
      {/*  <Route path={'profile'} element={<div>Profile</div>}/>*/}
      {/*  <Route path={'user'} element={<User isLogin={true}/>}/>*/}
      {/*  <Route path={'login'} element={<div>Login</div>}/>*/}
      {/*  <Route path={'detail/:id'} element={<Detail/>}/>*/}
      {/*  <Route path={'detail2'} element={<Detail2/>}/>*/}
      {/*  <Route path={'detail3'} element={<Detail3/>}/>*/}
      {/*</Routes>*/}
      {useRoutes([
        {
          path: '*',
          element: <div>NotFound</div>,
        },
        {
          path: '',
          element: <Hooks/>,
        },
        {
          path: 'about',
          element: <About/>,
          children: [
            {
              index: true,
              element: <Navigate to={'history'} replace={true}/>,
            },
            {
              path: 'history',
              element: <div>History</div>,
            },
            {
              path: 'culture',
              element: <div>Culture</div>,
            },
            {
              path: 'contact',
              element: <div>Contact</div>,
            },
            {
              path: 'join',
              element: <div>Join</div>,
            },
          ],
        },
        {
          path: 'profile',
          element: <div>Home</div>,
        },
        {
          path: 'user',
          element: <User isLogin={true}/>,
        },
        {
          path: 'login',
          element: <div>Login</div>,
        },
        {
          path: 'detail/:id',
          element: <Detail/>,
        },
        {
          path: 'detail2',
          element: <Detail2/>,
        },
        {
          path: 'detail3',
          element: <Detail3/>,
        },
      ])}
    </StyledDiv>
  )
}
