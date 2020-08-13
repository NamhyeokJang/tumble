import React, { Component } from 'react';
import { ProjectCard } from '../../components'
import { color, fetchCollection } from '../../utils'

import styles from './index.module.css'

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collection: {
                projects: []
            }
        }
    }

    componentDidMount = async () => {
        const id = this.props.match.params.collectionId
        await fetchCollection(id).then(res => this.setState({
            collection: res.collection
        }))
    }

    render() {
        const { collection } = this.state
        const backgroundColor = ['#a29bfe', '#6c5ce7', '#fd79a8', '#fab1a0', '#00cec9', '#ffeaa7', '#55efc4', '#00b894']
        return (
            <>
                <div style={{ height: '330px', backgroundColor: color[parseInt(Math.random() * 15)] }}>
                    <div className={styles.banner}>
                        <img className={styles.cover} src={collection.cover} alt='cover' />
                        <div className={styles.info}>
                            <h1 className={styles.title}>#{collection.title}</h1>
                            <h3 className={styles.description}>{collection.description}</h3>
                            <div style={{ display: 'flex', marginTop: '30px' }}>
                                <div className={styles.snsIcon}>
                                    <i className="fab fa-facebook-f"></i>
                                </div>
                                <div className={styles.snsIcon}>
                                    <i className="fab fa-twitter"></i>
                                </div>
                                <div className={styles.snsIcon}>
                                    <i className="fas fa-comment"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <div className={styles.itemContainer}>
                        {collection.projects.map((project, index) =>
                            <ProjectCard key={index} projectId={project.id} />
                        )}
                    </div>
                </div>
            </>
        );
    }
}

export default index;