import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Skeleton } from 'antd'
import cx from 'classnames'

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
    }, [])

    return (
        <Skeleton loading={!isLoading}>
            <div className={styles.container}>
                <Link to={`/project/${project.id}`}>
                    <div className={styles.imgBox}>
                        <img className={styles.image} src={project.cover} alt='project' />
                    </div>
                </Link>
                <div className={styles.info}>
                    <Link to='#'>
                        <span className={styles.underline}>{project.category}</span>
                    </Link>
                &nbsp; | &nbsp;
                <Link to={`user/${project.user.id}`}>
                        <span className={styles.underline}>{project.user.name}</span>
                    </Link>
                    <p className={cx(styles.title, styles.underline)}>{project.title}</p>
                    <p style={{ fontWeight: 'bold', color: 'red' }}>{percent}% 달성</p>
                </div>
            </div>
        </Skeleton>
    )
}