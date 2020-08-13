import React, { useState, useEffect } from 'react';
import cx from 'classnames'
import axios from 'axios'

import styles from './index.module.css'

export default ({ id, delivery }) => {
    const [info, setInfo] = useState({ items: [] })
    const [sponsorCount, setSponsor] = useState(0)

    useEffect(() => {
        const getProductInfo = async () => {
            const product = await axios.get(`${process.env.REACT_APP_API}/products/${id}`)
                .then(res => setInfo(res.data.product))
            const sponsors = await axios.get(`${process.env.REACT_APP_API}/products/sponsor/${id}`)
                .then(res => setSponsor(res.data.count))

        }
        getProductInfo()
    }, [])
    const day = new Date(delivery)
    const dayString = `${day.getFullYear()}년 ${day.getMonth()}월 ${day.getDate()}일`
    return (
        <div className={styles.container}>
            <span style={{ fontSize: '#D8D8D8' }}>
                <i className={cx('fas', 'fa-check', styles.sponsorFont)}></i>
            </span>
            <span className={styles.sponsorFont} style={{ marginLeft: '10px' }}>
                {sponsorCount}명이 선택
            </span>
            <p className={styles.price}>{parseInt(info.price).toLocaleString()}원 +</p>
            <p style={{ fontWeight: '500', marginBottom: '5px' }}>{info.name}</p>
            <ul className={styles.items}>
                {info.items.map((item, index) =>
                    <li className={styles.item} key={index}>{item.name} ( x{item.compose.quantiy} )</li>
                )}
            </ul>
            <span className={styles.delivery}>예상 전달일 <b>{dayString}</b></span>
        </div>
    )
}