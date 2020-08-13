import React, { Component } from 'react';
import axios from 'axios'
import HomeCard from '../HomeCard'

import styles from './index.module.css'


class index extends Component {
    state = {
        collection: {
            projects: []
        }
    }

    componentDidMount = async () => {
        await axios.get(`${process.env.REACT_APP_API}/collections`, {
            params: { type: 'spotlight', limit: 8, with: 'project' }
        }).then(res => this.setState({
            collection: res.data.collections[0]
        }))
    }

    render() {
        const { collection } = this.state
        return (
            <div className='container'>
                <h1 className={styles.title}>{collection.title}</h1>
                <div className={styles.cardContainer}>
                    {collection.projects.map((project, index) =>
                        <HomeCard projectId={project.id} key={index} />
                    )}
                </div>
            </div>
        );
    }
}

export default index;