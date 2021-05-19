import React, {useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Avatar, Button, Col, Layout, Menu, Row} from 'antd'
import {UserOutlined} from '@ant-design/icons'
import s from './Header.module.css'
import {useDispatch} from 'react-redux'
import store from "../../redux/redux-store";
import {requestLogin} from "../../redux/auth-reducer";

export type MapPropsType = {}

export const Header: React.FC<MapPropsType> = (props) => {

    const dispatch = useDispatch()
    let history = useHistory()
    const {Header} = Layout
    const isAuth = store.getState().auth.isAuthorized
    const logoutCallback = () => {
        dispatch(requestLogin("", ""))
        history.push("/login")
    }


    return <Header className="header">
        <Row>
            <Col span={18}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1"><Link to="/users">Users</Link></Menu.Item>
                </Menu>
            </Col>
            {
                isAuth ?
                    <>
                        <Col span={1}>
                            <Avatar alt={''} style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                        </Col>
                        <Col onClick={logoutCallback} className={s.logout} span={5}>
                            <Button>Log out</Button>
                        </Col>
                    </>
                    :
                    <Col className={s.logout} span={6}>
                        <Button>
                            <Link to={'/login'}>Log In</Link>
                        </Button>
                    </Col>
            }

        </Row>


    </Header>

    /*  <header className={s.header}>
          <img src='https://www.freelogodesign.org/Content/img/logo-ex-7.png' />

          <div className={s.loginBlock}>
              { props.isAuth
                  ? <div>{props.login} - <button onClick={props.logout}>Log out</button> </div>
                  : <NavLink to={'/login'}>Login</NavLink> }
          </div>
      </header>*/
}
