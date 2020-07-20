import React, { Component, useState, useEffect } from 'react';
import axios from 'axios'
import { Carousel, Typography, Progress } from 'antd'
import { LeftOutlined, RightOutlined, CalendarOutlined } from '@ant-design/icons'

import styles from './index.module.css'

const { Paragraph } = Typography

class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: []
        };
        this.carousel = React.createRef()
    }

    componentDidMount = async () => {
        await axios.get(`${process.env.REACT_APP_API}/project`, {
            params: {
                limit: 8,
                type: this.props.type
            }
        })
            .then(res => this.setState({
                projects: res.data.projects
            }))
    }

    render() {
        const carouselSettings = {
            dots: false,
            slidesToShow: 4,
            slidesToScroll: 4
        }
        return (
            <div className={styles.container}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontWeight: 'bold' }}>{this.props.title} <RightOutlined /></h2>
                    <div>
                        <LeftOutlined onClick={this.prev} style={{ fontSize: '20px', marginRight: '25px' }} />
                        <RightOutlined onClick={this.next} style={{ fontSize: '20px', }} />
                    </div>
                </div>
                <Carousel ref={node => (this.carousel = node)} {...carouselSettings} >
                    {this.state.projects.map((project, index) =>
                        <Card key={index} project={project} />
                    )}
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

// Card Component
const Card = ({ project }) => {
    const [percent, setPercent] = useState(0)
    const [total, setTotal] = useState(0)
    const [date, setDate] = useState('')

    useEffect(() => {
        const today = new Date()
        const deadLine = new Date(project.deadLine)
        const remainingDate = (deadLine.getTime() - today.getTime()) / (1000 * 60 * 60 * 24) // 프로젝트 남은 시간 
        setDate((remainingDate > 0) ? `${Math.floor(remainingDate)}일 남음` : '마감')
        const init = async () => {
            const total = await axios.get(`${process.env.REACT_APP_API}/project/total/${project.id}`)
                .then(res => res.data.total)
            setTotal(total)
            setPercent(Math.ceil(total / project.goal)) // 반올림할지? 올림할지?
        }
        init()
    }, [project])

    return (
        <div className={styles.cardContainer}>
            <img className={styles.cardImage} src={project.cover} alt='cover' />
            <div className={styles.cardInfo}>
                <div style={{ height: '62px' }}>
                    <Paragraph ellipsis={{ rows: 2 }}
                        style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '3px' }}>
                        {project.title}
                    </Paragraph>
                    <p style={{ fontSize: '12px' }}>{project.user.name}</p>
                </div>
                <Progress percent={percent} showInfo={false} strokeWidth={3} strokeColor='red' />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
                        <CalendarOutlined style={{ marginRight: '3px' }} />
                        {date}
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
                        {total.toLocaleString()}원 {percent}%
                    </span>
                </div>
            </div>
        </div>
    )
}

export default index;