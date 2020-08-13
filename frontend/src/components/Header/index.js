import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Avatar, Button } from 'antd';
import { MenuOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import { observer, inject } from 'mobx-react';

import logo from '../../styles/logo.png'
import styles from './index.module.css'



@inject('userStore')
@observer
class index extends Component {
    render() {
        const { userStore } = this.props
        return (
            <div style={{ width: '100%', borderBottom: '1px solid #b2bec3' }}>
                <div className={styles.container}>
                    <div className={styles.left}>
                        <Button className='link-btn' type='link'>
                            <Link to='/menu'>
                                <MenuOutlined />
                                <span>프로젝트 둘러보기</span>
                            </Link>
                        </Button>
                        <Button className='link-btn' type='link' >
                            프로젝트 올리기
                            </Button>
                    </div>
                    <div style={{ width: '100%', position: 'absolute', display: 'flex', justifyContent: 'center', zIndex: '0' }}>
                        <Link to='/'>
                            <img src={logo} alt='logo' style={{ zIndex: '1' }} />
                        </Link>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <Link to='/search' >
                            <Button className='link-btn' type='link'
                                style={{ fontSize: '22px', color: 'black' }}>
                                <SearchOutlined />
                            </Button>
                        </Link>
                        {userStore.isLogin ?
                            <Link to={`/user/menu/${userStore.userInfo.id}`} style={{ zIndex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span className={styles.username} >{userStore.userInfo.name}</span>
                                    <div className={styles.userProfile}>
                                        {userStore.userInfo.profileImage ?
                                            <img className={styles.userProfile} src={userStore.userInfo.profileImage} alt='user' />
                                            :
                                            userStore.userInfo.name[0]
                                        }
                                    </div>
                                </div>
                            </Link>
                            :
                            <Link to='/login'>
                                <Button className='link-btn' type='link' >
                                    <span style={{ marginRight: '15px', fontWeight: 'bold', color: 'black' }}>
                                        로그인 / 회원가입
                                </span>
                                    <Avatar size="large" icon={<UserOutlined />} />
                                </Button>
                            </Link>}

                    </div>
                </div>
            </div>
        );
    }
}

export default index;