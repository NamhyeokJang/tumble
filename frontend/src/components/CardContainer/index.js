import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import qs from 'query-string'
import { RightOutlined } from '@ant-design/icons';
import HomeCard from '../HomeCard'
import { fetchProjects } from '../../utils'

import styles from './index.module.css'

class index extends Component {
    state = {
        projects: []
    }


    componentDidMount = async () => {
        const params = qs.parse(this.props.link)
        await fetchProjects(params).then(res => this.setState({
            projects: res.projects
        }))
    }
    render() {
        const { title, link } = this.props
        const { projects } = this.state
        return (
            <div className='container'>
                <h1 className={styles.title}>{title} <RightOutlined /></h1>
                <div className={styles.cardContainer}>
                    {projects.map((project, index) =>
                        <HomeCard projectId={project.id} key={index} />
                    )}
                </div>
                <div>
                    <Link to={`/discover${link}`}>
                        <button className={styles.moreBtn}>{title} 더보기</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default index;