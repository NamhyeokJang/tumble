import axios from 'axios'

export default async (id) => {
    const project = await axios.get(`${process.env.REACT_APP_API}/projects/${id}`)
        .then(res => {
            return {
                project: res.data.project
            }
        })

    return project
}