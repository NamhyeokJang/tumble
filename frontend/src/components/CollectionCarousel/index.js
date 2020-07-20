import React, { Component } from 'react';
import { Carousel, } from 'antd'
import { LeftOutlined, RightOutlined, } from '@ant-design/icons'

import styles from './index.module.css'

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.carousel = React.createRef()
    }

    render() {
        const carouselSettings = {
            dots: false,
            slidesToShow: 2,
            slidesToScroll: 2
        }
        return (
            <div className={styles.container}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontWeight: 'bold' }}>진행중인 기획전</h2>
                    <div>
                        <LeftOutlined onClick={this.prev} style={{ fontSize: '20px', marginRight: '25px' }} />
                        <RightOutlined onClick={this.next} style={{ fontSize: '20px', }} />
                    </div>
                </div>
                <Carousel ref={node => (this.carousel = node)} {...carouselSettings}>
                    <Collection />
                    <Collection />
                    <Collection />
                    <Collection />
                </Carousel>
            </div>
        );
    }

    next = () => {
        this.carousel.next()
    }

    prev = () => {
        this.carousel.prev()
    }
}

const Collection = (props) => {

    const sample = {
        title: 'Sample',
        count: '4',
        cover: 'https://picsum.photos/200/300'
    }
    return (
        <div className={styles.collectionContainer}>
            <div className={styles.info}>
                <h1 style={{ fontSize: '18px', fontWeight: 'bold' }}>{sample.title}</h1>
                <span className={styles.divider}></span>
                <span className={styles.bottom}>
                    <b style={{ color: '#FA5882' }}>{sample.count}</b>
                    개 프로젝트
                </span>
            </div>
            <img className={styles.cover} src={sample.cover} alt='sample' />
        </div>
    )
}

export default index;