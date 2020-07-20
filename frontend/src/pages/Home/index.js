import React, { Component } from 'react';
import { Carousel } from 'antd'
import { ProjectCarousel, CollectionCarousel } from '../../components'

import styles from './index.module.css'

class index extends Component {
    state = {}
    render() {
        return (
            <>
                <Carousel autoplay>
                    <div>
                        <div style={{ width: '100%', height: '450px', backgroundColor: '#00cec9' }}></div>
                    </div>
                    <div>
                        <div style={{ width: '100%', height: '450px', backgroundColor: '#fab1a0' }}></div>
                    </div>
                    <div>
                        <div style={{ width: '100%', height: '450px', backgroundColor: '#ffeaa7' }}></div>
                    </div>
                </Carousel>
                <div className={styles.container}>
                    <ProjectCarousel title={'주목할 만한 프로젝트'} type={'editor'} link={'spotlight'} />
                </div>
                <div style={{ backgroundColor: '#FAFAFA', height: '250px', padding: '20px' }}>
                    <CollectionCarousel />
                </div>
                <div className={styles.container}>
                    <ProjectCarousel title={'인기 추천 프로젝트'} type={'popular'} />
                </div>
                <div className={styles.container}>
                    <ProjectCarousel title={'성공 임박 프로젝트'} />
                </div>
                <div className={styles.container}>
                    <ProjectCarousel title={'신규 추천 프로젝트'} type={'new'} />
                </div>
            </>
        );
    }
}

export default index;