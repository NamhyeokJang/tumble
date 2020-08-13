import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react';
import cx from 'classnames'
import { Divider } from 'antd'

import styles from './index.module.css'

@inject('userStore')
@observer
class index extends Component {
    state = {}
    render() {
        const { userStore } = this.props
        return (
            <div className={cx('container', styles.container)}>
                <Link to={`/user/${userStore.userInfo.id}`}>
                    <div style={{ display: 'flex', height: '100px', alignItems: 'center', marginTop: '20px' }}>
                        {userStore.userInfo.profileImage ?
                            <img className={styles.profile} src={userStore.userInfo.profileImage} alt='user' />
                            :
                            <div className={styles.profile}>
                                {userStore.userInfo.name[0]}
                            </div>
                        }
                        <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '20px', marginLeft: '10px', color: 'black' }}>{userStore.userInfo.name}</p>
                    </div>
                </Link>
                <Divider />
                <h1 className={styles.font}>메세지</h1>
                <h1 className={styles.font}>후원현황</h1>
                <h1 className={styles.font}>좋아한 프로젝트</h1>
                <h1 className={styles.font}>내가 만든 프로젝트</h1>
                <h1 className={styles.font}>설정</h1>
                <Divider />
                <h1 onClick={this.handleLogout} className={styles.font}>로그아웃</h1>
            </div>
        );

    }
    handleLogout = () => {
        const { userStore, history } = this.props
        userStore.logout()
        history.push('/')
    }
}

export default index;