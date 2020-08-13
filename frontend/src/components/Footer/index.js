import React from 'react';
import cx from 'classnames'
import { Descriptions } from 'antd';

import styles from './index.module.css'

export default () => {
    return (
        <div className={cx('container', styles.container)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex' }}>
                    <div className={styles.menuContainer} style={{ width: '220px' }}>
                        <p>공지사항</p>
                        <p>채용</p>
                        <p>텀블벅 시작하기 가이드</p>
                        <p>서비스 개선사항</p>
                    </div>
                    <div className={styles.menuContainer} style={{ width: '220px' }}>
                        <p>이용약관</p>
                        <p>개인정보 처리방침</p>
                        <p>수수료 정책</p>
                        <p>헬프센터</p>
                    </div>
                </div>
                <div>
                    <div style={{ marginBottom: '8px' }}>
                        <i className={cx("fas fa-comment", styles.icon)}></i>
                        <i className={cx("fab fa-facebook-f", styles.icon)}></i>
                        <i className={cx("fab fa-twitter", styles.icon)}></i>
                        <i className={cx("fab fa-instagram", styles.icon)}></i>
                    </div>
                    <button className={styles.qBtn}><i className="far fa-question-circle"></i>문의하기</button>
                </div>
            </div>
            <p style={{ fontSize: '12px' }}>000은 플랫폼 제공자로서 프로젝트의 당사자가 아니며, 직접적인 통신판매를 진행하지 않습니다. 프로젝트의 완수 및 선물제공의 책임은 해당 프로젝트의 창작자에게 있으며, 프로젝트와 관련하여 후원자와 발생하는 법적 분쟁에 대한 책임은 해당 창작자가 부담합니다.</p>
            <p style={{ fontSize: '12px' }}>000(주) | 대표 000 000-00-00000 | 000 00 0000 000, 0000000 00 (000) | 통신판매업 0000-000000-00-00-0000 | 대표전화 00-0000-0000 000 0000000 Inc.</p>
        </div>
    )
}