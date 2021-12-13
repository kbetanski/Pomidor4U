'use-strict'

import axios from 'axios'

class ApiClient {
    constructor (url, accessToken = '', refreshToken = '') {
        this.url = url
        this.accessToken = accessToken
        this.refreshToken = refreshToken
    }

    async login (email, password) {
        const { data } = await axios({
            method: 'post',
            url: `${this.url}/login`,
            data: {
                email,
                password
            }
        })

        this.accessToken = data.accessToken
        this.refreshToken = data.refreshToken

        return data
    }

    async register (name, email, password) {
        const { data } = await axios({
            method: 'post',
            url: `${this.url}/login`,
            data: {
                name,
                email,
                password
            }
        })

        this.accessToken = data.accessToken
        this.refreshToken = data.refreshToken

        return data
    }

    async refreshToken () {
        const { data } = await axios({
            method: 'post',
            url: `${this.url}/login`,
            data: {
                refreshToken: this.refreshToken
            }
        })

        this.accessToken = data.accessToken
        this.refreshToken = data.refreshToken

        return data
    }

    async getProfile () {
        const { data } = await axios({
            method: 'get',
            url: `${this.url}/login`
        })

        return data
    }

    async getTask (id) {
        const { data } = await axios({
            method: 'get',
            url: `${this.url}/tasks/${id}`
        })

        return data
    }

    async getTasks (id) {
        const { data } = await axios({
            method: 'get',
            url: `${this.url}/tasks`
        })

        return data
    }

    async deleteTask (id) {
        const { data } = await axios({
            method: 'delete',
            url: `${this.url}/tasks/${id}`
        })

        return data
    }

    async updateTask (task) {
        const { data } = await axios({
            method: 'patch',
            url: `${this.url}/tasks/${task.id}`,
            data: {
                title: task.title,
                content: task.content,
                finished: task.finished
            }
        })

        return data
    }

    async createTask (task) {
        const { data } = await axios({
            method: 'post',
            url: `${this.url}/tasks`,
            data: task
        })

        return data
    }
}

export default ApiClient
