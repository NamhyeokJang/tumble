import React, { Component } from 'react';
import { Input, Button, Divider } from 'antd'

import styles from './index.module.css'

class index extends Component {
    state = {}
    render() {
        return (
            <div className={styles.container}>
                <label style={{ color: '#b2bec3', fontWeight: 'bold', fontSize: '18px' }}>검색</label>
                <div style={{ display: 'flex', marginTop: '10px' }}>
                    <Input type='text' size='large' placeholder='프로젝트를 검색해주세요' style={{ marginRight: '20px' }} />
                    <Button size='large' style={{ width: '120px' }} >검색</Button>
                </div>
                <Divider />
                <div>
                    <h1 style={{ fontWeight: 'bold', fontSize: '28px', marginBottom: '2px' }}>모든 프로젝트</h1>
                    <h1 style={{ fontWeight: 'bold', fontSize: '28px', marginBottom: '2px' }}>인기 추천 프로젝트</h1>
                    <h1 style={{ fontWeight: 'bold', fontSize: '28px', marginBottom: '2px' }}>성공 임박 프로젝트</h1>
                    <h1 style={{ fontWeight: 'bold', fontSize: '28px', marginBottom: '2px' }}>신규 추천 프로젝트</h1>
                </div>
            </div>
        );
    }
}

export default index;