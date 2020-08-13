import axios from 'axios'

export default async () => {
    const collections = await axios.get(`${process.env.REACT_APP_API}/collections`)
        .then(res => {
            return {
                collections: res.data.collections
            }
        })

    return collections
}