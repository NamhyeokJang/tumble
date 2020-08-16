import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { Carousel } from 'antd'
import {
    TopCarousel,
    SpotlightContainer,
    CollectionContainer,
    CardContainer,
    Footer
} from '../../components'

import styles from './index.module.css'

class index extends Component {
    state = {}
    render() {
        return (
            <>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>텀블벅 :: tumblebug</title>
                </Helmet>
                <TopCarousel />
                <SpotlightContainer />
                <CollectionContainer />
                <CardContainer title='인기 추천 프로젝트' link={`?status=ing&editor=true&limit=8`} />
                <CardContainer title='신규 추천 프로젝트' link={'?status=ing&editor=true&order=new&limit=8'} />
                <Footer />
            </>
        );
    }
}

export default index;