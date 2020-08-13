import axios from 'axios'

export default async (id) => {
    const collection = await axios.get(`${process.env.REACT_APP_API}/collections/${id}`)
        .then(res => {
            return {
                collection: res.data.collection
            }
        })
    return collection
}