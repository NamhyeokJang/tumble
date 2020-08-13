import React from 'react';
import { Divider } from 'antd'

import styles from './index.module.css'

export default ({ user }) => {
    return (
        <div className={styles.container}>
            <p style={{ fontWeight: 'bold', marginBottom: '15px' }}>창작자 소개</p>
            <div className={styles.username}>
                <img src={user.profileImage} alt='user' />
                <p>{user.name}</p>
            </div>
            <p>
                {user.bio}
            </p>

            <Divider />

            <div>
                <button className={styles.mailButton}>
                    <i className="fas fa-envelope"></i>&nbsp;
                    창작자에게 문의하기
                </button>
            </div>
        </div>
    )
}