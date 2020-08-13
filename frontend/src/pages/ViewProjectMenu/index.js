import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Input, Button, Divider } from 'antd'
import { fetchCollections, color } from '../../utils'

import styles from './index.module.css'

class index extends Component {
    state = {
        searchText: '',
        collections: []
    }

    componentDidMount = async () => {
        await fetchCollections().then(res => this.setState({
            collections: res.collections
        }))
    }

    render() {
        return (
            <div className={styles.container}>
                <label style={{ color: '#b2bec3', fontWeight: 'bold', fontSize: '18px' }}>검색</label>
                <div style={{ display: 'flex', marginTop: '10px' }}>
                    <Input type='text' size='large' placeholder='프로젝트를 검색해주세요'
                        style={{ marginRight: '20px' }}
                        onPressEnter={this.handleSearch}
                        onChange={(e) => this.setState({ searchText: e.target.value })} />
                    <Button size='large'
                        style={{ width: '120px' }}
                        onClick={this.handleSearch} >검색</Button>
                </div>
                <Divider />
                <div>
                    <Link to={'/discover'}>
                        <h1 style={{ fontWeight: 'bold', fontSize: '28px', marginBottom: '2px' }}>모든 프로젝트</h1>
                    </Link>
                    <Link to={'/discover?status=ing&editor=true'}>
                        <h1 style={{ fontWeight: 'bold', fontSize: '28px', marginBottom: '2px' }}>인기 추천 프로젝트</h1>
                    </Link>
                    <Link to={'/discover?status=ing&editor=true&order=new'}>
                        <h1 style={{ fontWeight: 'bold', fontSize: '28px', marginBottom: '2px' }}>신규 추천 프로젝트</h1>
                    </Link>
                </div>
                <div style={{ marginTop: '40px' }}>
                    <label style={{ color: '#b2bec3', fontWeight: 'bold', fontSize: '18px' }}>기획전</label>
                    <Link to={`/collection/1`}>
                        <h1 style={{ fontWeight: 'bold', fontSize: '28px', marginBottom: '2px' }}>주목할 만한 프로젝트</h1>
                    </Link>
                </div>
                <div style={{ marginTop: '40px' }}>
                    <label style={{ color: '#b2bec3', fontWeight: 'bold', fontSize: '18px' }}>태그</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {
                            this.state.collections.map((collection, index) =>
                                <Link to={`/collection/${collection.id}`} >
                                    <div className={styles.tag} key={index} style={{ backgroundColor: color[parseInt(Math.random() * 15)] }}>
                                        {`# ${collection.type}`}
                                    </div>
                                </Link>
                            )
                        }
                    </div>
                </div>
                <div style={{ marginTop: '40px', marginBottom: '80px' }}>
                    {/* ['game', 'art', 'picture', 'movie', 'tech', 'video', 'fashion'] */}
                    <label style={{ color: '#b2bec3', fontWeight: 'bold', fontSize: '18px' }}>카테고리</label>
                    <Link to={`/discover?category=game`}>
                        <p className={styles.category}>게임</p>
                    </Link>
                    <Link to={`/discover?category=art`}>
                        <p className={styles.category}>미술</p>
                    </Link>
                    <Link to={`/discover?category=picture`}>
                        <p className={styles.category}>사진, 그림</p>
                    </Link>
                    <Link to={`/discover?category=movie`}>
                        <p className={styles.category}>영화</p>
                    </Link>
                    <Link to={`/discover?category=tech`}>
                        <p className={styles.category}>기술</p>
                    </Link>
                    <Link to={`/discover?category=video`}>
                        <p className={styles.category}>비디오</p>
                    </Link>
                    <Link to={`/discover?category=fashion`}>
                        <p className={styles.category}>패션</p>
                    </Link>
                </div>
            </div>
        );
    }

    handleSearch = () => {
        this.props.history.push(`/discover?title=${this.state.searchText}`)
    }
}

export default index;