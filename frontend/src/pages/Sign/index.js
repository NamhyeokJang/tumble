import React, { Component } from 'react';
import { Input, Button, Divider } from 'antd'
import axios from 'axios'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import styles from './index.module.css'

@observer
class index extends Component {
    @observable isSign = false
    @observable name
    @observable email
    @observable reEmail
    @observable password
    @observable rePassword

    render() {
        return (
            <div className={styles.container}>
                <Button className='w-btn'
                    style={{ marginBottom: '7px', backgroundColor: '#74b9ff' }}>
                    페이스북 아이디로 가입하기</Button>
                <Button className='w-btn'
                    style={{ backgroundColor: '#00b894' }} >
                    네이버 아이디로 가입하기</Button>
                <Divider plain style={{ fontSize: '12px' }}>또는</Divider>
                {this.isSign ? '' :
                    <Button className='w-btn'
                        style={{ backgroundColor: '#dfe6e9', color: '#636e72' }}
                        onClick={() => this.isSign = true} >
                        이메일로 가입하기</Button>}
                {this.isSign ? this.ViewSignForm() : ''}
                <Divider />
                <p style={{ fontSize: '12px', marginBottom: '3px' }}>이미 계정이 있으신가요?</p>
                <p
                    style={{ fontSize: '12px', color: '#ff7675' }}
                    onClick={() => this.props.history.push('/login')}>
                    기존 계정으로 로그인하기</p>
            </div>
        );
    }

    ViewSignForm = () => {
        return (
            <>
                <label style={{ fontSize: '12px', width: '100%', textAlign: 'left' }}>이름</label>
                <Input size='large' type='text' name='name' style={{ fontSize: '12px' }}
                    placeholder='사용하실 이름을 입력해주세요'
                    onChange={this.handleInput} />
                <label style={{ fontSize: '12px', width: '100%', textAlign: 'left', marginTop: '20px' }}>이메일 주소</label>
                <Input size='large' type='email' name='email' style={{ fontSize: '12px', marginBottom: '5px' }}
                    placeholder='이메일 주소를 입력해주세요'
                    onChange={this.handleInput} />
                <Input size='large' type='email' name='reEmail' style={{ fontSize: '12px' }}
                    placeholder='이메일 주소를 확인합니다'
                    onChange={this.handleInput} />
                {this.checkEmail() ? '' : <p className={styles.errorMsg}>유효하지 않은 이메일 형식입니다</p>}
                {this.email === this.reEmail ? '' : <p className={styles.errorMsg}>이메일이 일치하지 않습니다</p>}
                <label style={{ fontSize: '12px', width: '100%', textAlign: 'left', marginTop: '20px' }}>비밀번호</label>
                <Input.Password name='password' style={{ fontSize: '12px', marginBottom: '5px' }} size='middle'
                    placeholder='비밀번호를 입력해주세요'
                    onChange={this.handleInput} />
                <Input.Password name='rePassword' style={{ fontSize: '12px' }} size='middle'
                    placeholder='비밀번호를 확인합니다'
                    onChange={this.handleInput} />
                {this.password === this.rePassword ? '' : <p className={styles.errorMsg}>비밀번호가 일치하지 않습니다.</p>}
                <Button className='w-btn' style={{ marginTop: '12px', backgroundColor: '#ff7675' }}
                    onClick={this.handleSignSubmit}>다음</Button>
            </>
        )
    }

    checkEmail = () => {
        const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if (this.email === undefined || this.email === '') return true
        console.log(regExp.test(this.email))
        return regExp.test(this.email)
    }

    handleInput = (e) => {
        const { name, value } = e.target
        this[name] = value
    }

    handleSignSubmit = async () => {
        if (this.name === undefined || this.name === '') {
            alert('Not Name')
            return
        }
        if (this.email === undefined || this.email === '' || this.email !== this.reEmail || !this.checkEmail()) {
            alert('Not Email')
            return
        }
        if (this.password === undefined || this.password === '' || this.password !== this.rePassword) {
            alert('Not password')
            return
        }
        await axios.post(`${process.env.REACT_APP_API}/users/sign`, {
            name: this.name,
            email: this.email,
            password: this.password
        }).then(res => console.log(res.data))
        this.props.history.push('/login')
    }
}

export default index;