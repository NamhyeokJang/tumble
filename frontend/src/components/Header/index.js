import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Avatar, Button } from 'antd';
import { MenuOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import { observer, inject } from 'mobx-react'

import logo from '../../styles/logo.png'
import styles from './index.module.css'


@inject('commonStore')
@observer
class index extends Component {
    render() {
        const { history } = this.props
        return (
            <>
                <div style={{ width: '100%', borderBottom: '1px solid #b2bec3' }}>
                    <div className={styles.container}>
                        <div className={styles.left}>
                            <Button className='link-btn' type='link' onClick={this.handleHeader}>프로젝트 둘러보기</Button>
                            <Button className='link-btn' type='link' onClick={this.handleHeader}>프로젝트 올리기</Button>
                        </div>
                        <div style={{ width: '100%', position: 'absolute', display: 'flex', justifyContent: 'center', zIndex: '0' }}>
                            <Link to='/'>
                                <img src={logo} alt='logo' style={{ zIndex: '1' }} />
                            </Link>
                        </div>
                        <div>
                            <Link to='/login'>
                                <Button className='link-btn' type='link' >
                                    <span style={{ marginRight: '15px', fontWeight: 'bold', color: 'black' }}>
                                        로그인 / 회원가입
                                </span>
                                    <Avatar size="large" icon={<UserOutlined />} />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

            </>
        );
    }

    handleHeader = () => {
        this.props.commonStore.setHeader()
    }
}

export default index;