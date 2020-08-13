import React, { Component, createRef } from 'react';
import { Carousel } from 'antd'
import { fetchProjects } from '../../utils'

import styles from './index.module.css'

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: []
        }
        this.carousel = createRef()
    }

    componentDidMount = async () => {
        await fetchProjects({ limit: 5 }).then(res => this.setState({
            projects: res.projects
        }))
    }

    render() {
        const { projects } = this.state
        const setting = {
            dots: false,
            speed: 200
        }
        return (
            <div style={{ position: 'relative', height: '480px' }}>
                <Carousel ref={slider => (this.carousel = slider)} {...setting}>
                    {projects.map((project, index) =>
                        <div style={{ width: '100%', height: '300px', position: 'relative' }}>
                            <img className={styles.cover} src={project.cover} alt='cover' />
                            <div className={styles.info}>
                                <h1 className={styles.title}>{project.title}</h1>
                                <p className={styles.description}>{project.description}</p>
                            </div>
                        </div>
                    )}
                </Carousel>
                <div className='container' style={{ position: 'relative' }}>
                    <div className={styles.pageContainer}>
                        {projects.map((project, index) =>
                            <div key={index} onClick={() => this.carousel.slick.slickGoTo(index)}>
                                <img className={styles.customBtn} src={project.cover} alt='paging' />
                            </div>
                        )}
                    </div>
                </div>
            </div >
        );
    }
}

export default index;