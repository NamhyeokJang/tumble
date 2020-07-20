import React, { Component } from 'react';
import axios from 'axios'

import { ProjectCard } from '../../components'

import styles from './index.module.css'

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: []
        }

        this.container = React.createRef()
    }

    componentDidMount = async () => {
        await axios.get(`${process.env.REACT_APP_API}/project?page=4&limit=9`)
            .then(res => this.setState({
                projects: res.data.projects,
            }))

    }

    render() {
        console.log(this.props.match)
        return (
            <>
                <div style={{ height: '330px', backgroundColor: '#e84393' }}>
                    <div className={styles.container}>

                    </div>
                </div>
                <div className={styles.container}>
                    <div style={{ display: 'flex' }} >
                        {this.state.projects.map((project, index) =>
                            <ProjectCard key={index} project={project} />
                        )}
                    </div>
                </div>
            </>
        );
    }
}

export default index;