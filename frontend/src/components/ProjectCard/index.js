import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'


import styles from './index.module.css'


export default ({ project }) => {
    return (
        <div className={styles.container}>
            <img src={project.cover} alt='cover' />
        </div>
    )
}