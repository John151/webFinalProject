import axios from 'axios'

const base_url = '/api/records'

export default {

    getAllRecords: function() {
        return axios.get(base_url).then(response => {
            return response.data
        })
    },

    addRecord: function (record) {
        return axios.post(base_url, record).then(response => {
            return response.data
        })
    },
    deleteRecord: function (id) {
        return axios.delete(`${base_url}/${id}`).then(response => {
            return response.data
        })
    }
}