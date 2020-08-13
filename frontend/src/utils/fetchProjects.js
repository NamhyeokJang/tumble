import axios from 'axios'

export default async (params) => {
    if (params.category === 'default') delete params.category
    const projects = await axios.get(`${process.env.REACT_APP_API}/projects`, {
        params: { ...params }
    }).then(res => {
        return {
            count: res.data.count,
            projects: res.data.projects
        }
    })

    return projects
}