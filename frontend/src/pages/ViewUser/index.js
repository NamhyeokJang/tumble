import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { Tabs } from 'antd'
import { ProjectCard, Footer } from '../../components'

import styles from './index.module.css'

const { TabPane } = Tabs

class index extends Component {
    state = {
        user: {
            projects: []
        }
    }

    componentDidMount = async () => {
        await axios.get(`${process.env.REACT_APP_API}/users/${this.props.match.params.userId}`)
            .then(res => this.setState({
                user: res.data.user
            }))
    }

    render() {
        const { user } = this.state
        const createAt = parseInt((new Date() - new Date(user.created_at)) / (1000 * 60 * 24))
        return (
            <>
                <Helmet>
                    <title>{`${user.name}`} :: 텀블벅</title>
                </Helmet>
                <div className='container'>
                    <div className={styles.userProfile}>
                        {user.profileImage ?
                            <img className={styles.profileImage} src={user.profileImage} alt='profile' />
                            :
                            <div className={styles.profileImage}>
                                {user.name ? user.name[0] : ''}
                            </div>
                        }

                        <div style={{ marginLeft: '25px' }}>
                            <h1 style={{ marginBottom: '5px', fontWeight: 'bold' }}>{user.name}</h1>
                            <p style={{ marginBottom: '5px' }}>올린 프로젝트 <b>{user.projects.length}</b></p>
                            <p style={{ marginBottom: '5px' }}>{createAt}일 전 가입</p>
                        </div>
                    </div>
                    <Tabs defaultActiveKey="1" tabBarStyle={{ fontWeight: 'bold' }} >
                        <TabPane tab="소개" key="1">
                            {user.bio ?
                                <p className={styles.userBio}>
                                    {user.bio}
                                </p> :
                                <p className={styles.userBio}>등록된 소개가 없습니다.</p>}
                        </TabPane>
                        {user.isHost ?
                            <TabPane tab="올린 프로젝트" key="2">
                                <div style={{ marginBottom: '25px' }}>
                                    <span style={{ fontSize: '15px', fontWeight: 500, color: 'red' }}>{user.projects.length}</span>
                                    <span style={{ fontSize: '15px', fontWeight: 500 }}>개의 프로젝트가 있습니다.</span>
                                </div>
                                <div className={styles.projectContainer}>
                                    {user.projects.map((project, index) =>
                                        <ProjectCard projectId={project.id} key={index} />
                                    )}
                                </div>
                            </TabPane>
                            :
                            ''
                        }
                    </Tabs>
                    <Footer />
                </div>
            </>
        );
    }
}

export default index;