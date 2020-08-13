import React, { Component } from 'react';
import axios from 'axios'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import styles from './index.module.css'
import { Link } from 'react-router-dom';

class index extends Component {
    state = {
        popular: [],
        result: []
    }

    componentDidMount = async () => {
        await axios.get(`${process.env.REACT_APP_API}/search`).then(res => this.setState({
            popular: res.data.popular
        }))
    }

    render() {
        return (
            <div className='container'>
                <Input placeholder="검색어를 입력해주세요."
                    className='searchText'
                    bordered={false}
                    prefix={<SearchOutlined />}
                    style={{ marginTop: '20px', height: '40px', fontSize: '25px', fontWeight: 'bold' }}
                    onPressEnter={(e) => this.handleSearch(e.target.value)} />

                <div style={{ marginTop: '40px', marginLeft: '13px' }}>
                    <Result result={this.state.result} popular={this.state.popular} />
                </div>
            </div>
        );
    }

    handleSearch = (value) => {
        this.props.history.push(`/discover?title=${value}`)
    }
}

const Result = ({ result, popular }) => {
    if (result.length > 0) {
        return result.map((word, index) =>
            <p className={styles.resultWord} key={index}><SearchOutlined /> {word}</p>
        )
    } else {
        return (
            <div>
                <label style={{ color: '#b2bec3', fontWeight: 'bold', fontSize: '15px' }}>인기 검색어</label>
                {popular.map((word, index) =>
                    <Link to={`/discover?title=${word}`} key={index}>
                        <p className={styles.resultWord}><SearchOutlined /> {word}</p>
                    </Link>
                )}
            </div>
        )
    }
}

export default index;