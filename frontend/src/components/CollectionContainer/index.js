import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Button } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';

import styles from './index.module.css'

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collections: []
        }
        this.carousel = React.createRef()
    }

    componentDidMount = async () => {
        await axios.get(`${process.env.REACT_APP_API}/collections`, {
            params: { with: 'project' }
        })
            .then(res => this.setState({ collections: res.data.collections }))
    }

    render() {
        const { collections } = this.state
        const carouselSetting = {
            dots: false,
            slidesToShow: 2,
            slidesToScroll: 2
        }
        return (
            <div className='container'>
                <div style={{ padding: '0 15px', marginTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 className={styles.title}>진행중인 기획전</h1>
                    <div>
                        <Button type='text' onClick={() => this.carousel.prev()}><LeftOutlined /></Button>
                        <Button type='text' onClick={() => this.carousel.next()}><RightOutlined /></Button>
                    </div>
                </div>
                <Carousel ref={c => this.carousel = c} {...carouselSetting}>
                    {collections.map((collection, index) =>
                        <Collection collection={collection} key={index} />
                    )}
                </Carousel>
            </div>
        );
    }
}

const Collection = ({ collection }) => {
    return (
        <Link to={`/collection/${collection.id}`}>
            <div className={styles.collectionContainer}>
                <img src={collection.cover} alt='collection' />
                <div style={{ padding: '22px' }}>
                    <p className={styles.collectionTitle}>{collection.title}</p>
                    <div className={styles.divider} ></div>
                    <p style={{ marginTop: '30px', color: '#a4b0be' }}>
                        <span style={{ color: 'red' }}>{collection.projects.length}</span>
                    개 프로젝트
                </p>
                </div>
            </div>
        </Link>
    )
}

export default index;