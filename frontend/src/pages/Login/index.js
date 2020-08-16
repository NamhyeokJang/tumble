import React, { Component } from 'react';
import axios from 'axios'
import { Input, Button, Divider, message, notification } from 'antd'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'

import styles from './index.module.css'

@inject('userStore')
@observer
class index extends Component {
    @observable email
    @observable password

    render() {
        return (
            <div className={styles.container}>
                <Button className='w-btn'
                    style={{ marginBottom: '7px', backgroundColor: '#74b9ff' }}
                    onClick={this.snsForLogin} >
                    페이스북 아이디로 로그인</Button>
                <Button className='w-btn'
                    style={{ backgroundColor: '#00b894' }}
                    onClick={this.snsForLogin} >
                    네이버 아이디로 로그인</Button>
                <Divider plain style={{ fontSize: '12px' }}>또는</Divider>
                <Input className='input'
                    style={{ marginBottom: '7px' }} type='text' name='email'
                    placeholder='이메일 주소 입력'
                    onChange={this.handleInput} />
                <Input className='input'
                    style={{ marginBottom: '25px' }} type='password' name='password'
                    placeholder='비밀번호 입력'
                    onChange={this.handleInput} />
                <Button className='w-btn'
                    onClick={this.handleSubmit}
                    style={{ backgroundColor: '#ff7675' }}>
                    로그인</Button>
                <p className={styles.font} style={{ marginTop: '30px' }}
                    onClick={() => this.props.history.push('/sign')}>
                    아직 계정이 없으신가요?
                    <span style={{ color: '#ff7675' }}>   텀블벅 가입하기</span>
                </p>
                <Divider plain />
                <p onClick={this.searchPassword} className={styles.font} style={{ color: '#ff7675' }}>혹시 비밀먼호를 잊으셨나요?</p>
            </div>
        );
    }

    handleInput = (e) => {
        const { name, value } = e.target
        this[name] = value
    }

    handleSubmit = async () => {
        const res = await axios.post(`${process.env.REACT_APP_API}/users/login`, {
            email: this.email,
            password: this.password
        }).then(res => res.data)

        if (res.result === 'ok') {
            this.props.userStore.login(res.user)
            this.props.history.push('/')
        } else if (res.result === 'failed') {
            notification.warning({
                message: res.message
            })
        } else {
            notification.error({
                message: '다시 시도해주세요'
            })
        }

    }

    searchPassword = () => {
        console.log(this.props.userStore.userInfo)
        // message.warning('아직 미구현...')
    }

    snsForLogin = () => {
        message.warning('아직 미구현...')
    }
}

export default index;