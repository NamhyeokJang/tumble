import React, { useState, useEffect } from 'react';
import { Progress, Skeleton } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import axios from 'axios'

import styles from './index.module.css'


export default ({ projectId }) => {
    const [isLoading, setLoading] = useState(false)
    const [project, setProject] = useState({ user: {}, sponsors: [] })
    const [percent, setPercent] = useState(0)

    useEffect(() => {
        const getData = async () => {
            const fetchProject = await axios.get(`${process.env.REACT_APP_API}/projects/${projectId}`, {
                params: { desc: true }
            })
                .then(res => res.data.project)
            setLoading(true)
            const getPercent = parseInt((fetchProject.donation / fetchProject.goal) * 100)
            setPercent(getPercent)
            setProject(fetchProject)
        }
        getData()
    }, [projectId])

    const date = parseInt((new Date(project.deadLine) - new Date()) / (1000 * 60 * 60 * 24))
    return (
        <Skeleton loading={!isLoading}>
            <div className={styles.container}>
                <Link to={`/project/${project.id}`}>
                    <div className={styles.coverBox}>
                        <img className={styles.cover} src={project.cover} alt='project' />
                    </div>
                </Link>
                <div className={styles.info} >
                    <Link to={`/project/${project.id}`}>
                        <p className={cx(styles.title, styles.underline)} >
                            {project.title}
                        </p>
                    </Link>
                    <div style={{ marginBottom: '5px' }}>
                        <Link to='#'>
                            <span className={cx(styles.text, styles.underline)}>{project.category}</span>&nbsp;
                    </Link>
                    |&nbsp;&nbsp;
                    <Link to={`/user/${project.user.id}`} >
                            <span className={cx(styles.text, styles.underline)}>{project.user.name}</span>
                        </Link>
                    </div>
                    <div className={styles.desc}>
                        {project.description}
                    </div>
                </div>
                <Progress strokeWidth={2} strokeColor={'red'} percent={percent} showInfo={false} style={{ padding: '3px' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px' }}>
                    <div>
                        <span style={{ fontSize: '17px', fontWeight: '500', marginRight: '5px' }}>
                            {parseInt(project.donation).toLocaleString()}원
                    </span>
                        <span style={{ fontWeight: '400', color: 'red' }}>
                            {percent}%
                    </span>
                    </div>
                    <span className={styles.date}><ClockCircleOutlined /> {date > 0 ? `${date}일 남음` : '마감되었습니다.'}</span>
                </div>
            </div>
        </Skeleton>
    )
}