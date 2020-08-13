import React, { Component } from 'react';
import axios from 'axios'
import cx from 'classnames'
import qs from 'query-string'
import { Select, Button } from 'antd'
import { ProjectCard, Footer } from '../../components'
import { fetchProjects } from '../../utils'

import styles from './index.module.css'
const { Option } = Select;
class index extends Component {
    state = {
        count: '',
        projects: [],
        page: 0,
        query: { ...qs.parse(this.props.location.search) },
        editor: qs.parse(this.props.location.search).editor ? true : false,
    }

    componentDidMount = async () => {
        const params = { page: this.state.page, ...this.state.query }
        document.addEventListener('scroll', this.trackScroll)
        await fetchProjects(params).then(res => this.setState({
            projects: res.projects,
            count: res.count
        }))
    }

    componentWillUnmount = () => {
        document.removeEventListener('scroll', this.trackScroll)
    }

    render() {
        const { count, projects, editor } = this.state
        return (
            <>
                <div className='container'>
                    <div>
                        <Select
                            placeholder='카테고리'
                            defaultValue={this.state.query.category}
                            onChange={(e) => this.handleSelect(e, 'category')}
                            style={{ width: '120px', marginRight: '12px', marginTop: '10px' }} >
                            <Option value='default'>전체보기</Option>
                            <Option value='game'>game</Option>
                            <Option value='art'>art</Option>
                            <Option value='picture'>picture</Option>
                            <Option value='movie'>movie</Option>
                            <Option value='tech'>tech</Option>
                            <Option value='video'>video</Option>
                            <Option value='fashion'>fashion</Option>
                        </Select>
                        <Select
                            placeholder='상태'
                            defaultValue={this.state.query.status}
                            style={{ width: '150px', marginRight: '12px', marginTop: '10px' }}
                            onChange={(e) => this.handleSelect(e, 'status')} >
                            <Option value='default'>전체 프로젝트</Option>
                            <Option value='ing'>진행중인 프로젝트</Option>
                            <Option value='end'>성사된 프로젝트</Option>
                        </Select>
                        {!editor ?
                            <Button onClick={this.handleEditor}>
                                에디터 추천
                        </Button> :
                            <button
                                onClick={this.handleEditor}
                                style={{ height: '32px', border: '1px solid #E6E6E6' }}>
                                에디터 추천
                            <i className="fas fa-times"></i>
                            </button>}
                    </div>
                </div>

                <p className='container'
                    style={{ marginTop: '30px', marginBottom: '15px', fontWeight: 700 }}>
                    <b style={{ color: 'red', marginRight: '3px' }}>{count}</b>
                    개의 프로젝트가 있습니다.
                    </p>
                <div className={cx('container', styles.itemsContainer)}>
                    {projects.map((project, index) =>
                        <ProjectCard projectId={project.id} key={index} />
                    )}
                </div>
                <Footer />
            </>
        );
    }

    handleEditor = async () => {
        if (this.state.editor) {
            await this.setState({
                editor: false,
                query: { ...this.state.query, editor: false }
            })
            await fetchProjects(this.state.query).then(res => this.setState({
                count: res.count,
                projects: res.projects
            }))
        } else {
            await this.setState({
                editor: true,
                query: { ...this.state.query, editor: true }
            })
            await fetchProjects(this.state.query).then(res => this.setState({
                count: res.count,
                projects: res.projects
            }))
        }
    }

    handleSelect = async (value, key) => {
        if (key === 'category') {
            await this.setState({
                query: { ...this.state.query, category: value },
            })
        }
        if (key === 'status') {
            await this.setState({
                query: { ...this.state.query, status: value }
            })
        }
        await fetchProjects(this.state.query).then(res => this.setState({
            count: res.count,
            projects: res.projects
        }))
    }

    trackScroll = async (e) => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        const params = { page: this.state.page + 1, ...this.state.query }
        if (scrollHeight - 10 <= scrollTop + clientHeight) { //scrollheight 모바일에서 실행안될 수 있음
            await fetchProjects(params).then(res => this.setState({
                page: this.state.page + 1,
                projects: [...this.state.projects, ...res.projects]
            }))
        }
    }
}

export default index;