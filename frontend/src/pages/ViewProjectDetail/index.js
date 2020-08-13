import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import cx from 'classnames'
import { Tabs } from 'antd';
import { UserCard, ProductCard, ProductNotice, ProductInfo } from '../../components'

import styles from './index.module.css'
const { TabPane } = Tabs;
class index extends Component {
    state = {
        project: {
            products: [],
            user: {},
        },

    }

    componentDidMount = async () => {
        const project = await axios.get(`${process.env.REACT_APP_API}/projects/${this.props.match.params.projectId}`)
            .then(res => {
                return {
                    ...res.data.project,
                    products: res.data.products
                }
            })
        await this.setState({
            project,
        })
    }

    render() {
        const { project } = this.state
        const deadLine = new Date(project.deadLine)
        const endDate = parseInt((deadLine - new Date()) / (1000 * 60 * 60 * 24))
        return (
            <>
                <div className={styles.container}>
                    <div className={styles.category}>{project.category}</div>
                    <h1 className={styles.title}>{project.title}</h1>
                    <div className={styles.userInfo}>
                        <img src={project.user.profileImage} alt='user' />
                        <Link to={`/user/${project.user.id}`}>
                            <p style={{ color: 'black' }}>{project.user.name}</p>
                        </Link>
                    </div>
                    <div className={styles.infoContainer}>
                        <img src={project.cover} alt='project' />
                        <div className={styles.info}>
                            <label>모인금액</label>
                            <div style={{ marginBottom: '20px' }}>
                                <span className={styles.total}>{parseInt(project.donation).toLocaleString()}</span>
                                &nbsp;원
                                <span className={styles.percent}>{parseInt((project.donation / project.goal) * 100)}%</span>
                            </div>
                            <label>남은시간</label>
                            <div style={{ marginBottom: '20px' }}>
                                <span className={styles.date}>{endDate ? endDate : ''}</span>
                                &nbsp;일
                            </div>
                            <label>후원자</label>
                            <div style={{ marginBottom: '20px' }}>
                                <span className={styles.sponsor}>{project.sponsor}</span>
                                &nbsp;명
                            </div>
                            <div className={styles.infoBox}>
                                <p style={{ fontWeight: 'bold', marginBottom: '6px' }}>펀딩 진행중</p>
                                <p>목표 금액인 {parseInt(project.goal).toLocaleString()}원이 모여야만 결제됩니다.</p>
                                <p>결제는 {`${deadLine.getFullYear()}년 ${deadLine.getMonth()}월 ${deadLine.getDate()}일`}에 다함께 진행됩니다.</p>
                            </div>
                            <div className={styles.btnContainer}>
                                <button className={styles.sponBtn}>프로젝트 밀어주기</button>
                                <button className={styles.iconBtn}>
                                    <i className="far fa-heart"></i>
                                </button>
                                <button className={styles.iconBtn}>
                                    <i className="fas fa-share-alt"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.tabContainer}>
                    <Tabs defaultActiveKey="1" tabBarStyle={{ width: '1080px', margin: '0 auto', color: 'black', fontWeight: 'bold' }}>
                        <TabPane tab="스토리" key="1">
                            <div className={styles.tabPaneOut}>
                                <div className={styles.tabPaneIn} >
                                    <div className={styles.story}>
                                        <p style={{ fontSize: '15px' }}>{project.story}</p>
                                    </div>
                                    <div>
                                        <UserCard user={project.user} />
                                        <p style={{ marginTop: '25px', fontWeight: 'bold' }}>선물 선택</p>
                                        {project.products.map((product, index) =>
                                            <ProductCard key={index} id={product.id} delivery={project.delivery} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="커뮤니티" key="2">
                            <div className={styles.tabPaneOut}>
                                <div className={styles.tabPaneIn}>

                                    <div>
                                        <UserCard user={project.user} />
                                        <p style={{ marginTop: '25px', fontWeight: 'bold' }}>선물 선택</p>
                                        {project.products.map((product, index) =>
                                            <ProductCard key={index} id={product.id} delivery={project.delivery} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="펀딩 안내" key="3">
                            <div className={styles.tabPaneOut}>
                                <div className={styles.tabPaneIn}>
                                    <div>
                                        <ProductNotice deadLine={project.deadLine} />
                                        <ProductInfo />
                                    </div>
                                    <div>
                                        <UserCard user={project.user} />
                                        <p style={{ marginTop: '25px', fontWeight: 'bold' }}>선물 선택</p>
                                        {project.products.map((product, index) =>
                                            <ProductCard key={index} id={product.id} delivery={project.delivery} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </>
        );
    }
}

export default index;