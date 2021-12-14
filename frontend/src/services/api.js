'use-strict'

import axios from 'axios'

class ApiClient {
    constructor ({ url, accessToken, refreshToken }) {
        this.url = url
        this.accessToken = accessToken
        this.refreshToken = refreshToken
    }

    async login ({ email, password }) {
        const { data } = await this.makeRequest({
            method: 'post',
            path: '/login',
            payload: {
                email,
                password
            }
        })

        this.accessToken = data.accessToken
        this.refreshToken = data.refreshToken

        return {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken
        }
    }

    async register ({ name, email, password }) {
        const { data } = await this.makeRequest({
            method: 'post',
            path: '/register',
            payload: {
                name,
                email,
                password
            }
        })

        this.accessToken = data.accessToken
        this.refreshToken = data.refreshToken

        return {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken
        }
    }

    async refresh () {
        const { data } = await axios({
            method: 'post',
            url: `${this.url}/refresh-token`,
            data: {
                refreshToken: this.refreshToken
            },
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            }
        })

        return {
            accessToken: this.accessToken,
            refreshToken: data.refreshToken
        }
    }

    async getProfile () {
        const { auth, data } = await this.makeRequest({
            method: 'get',
            path: '/profile'
        })

        return {
            data,
            auth
        }
    }

    async getTask (id) {
        const { auth, data } = await this.makeRequest({
            method: 'get',
            path: `/tasks/${id}`
        })

        return {
            data,
            auth
        }
    }

    async getTasks () {
        const { auth, data } = await this.makeRequest({
            method: 'get',
            path: '/tasks'
        })

        return {
            data,
            auth
        }
    }

    async deleteTask (id) {
        const { auth, data } = await this.makeRequest({
            method: 'delete',
            path: `/tasks/${id}`
        })

        return {
            data,
            auth
        }
    }

    async updateTask (task) {
        const { data, auth } = await this.makeRequest({
            method: 'patch',
            path: `/tasks/${task.id}`,
            payload: {
                title: task.title,
                content: task.content,
                finished: task.finished
            }
        })

        return {
            data,
            auth
        }
    }

    async createTask (task) {
        const { data, auth } = await this.makeRequest({
            method: 'post',
            path: '/tasks',
            payload: task
        })

        return {
            data,
            auth
        }
    }

    async makeRequest ({ method, path, payload }) {
        try {
            const response = await axios({
                method,
                url: `${this.url}${path}`,
                data: payload,
                headers: {
                    Authorization: `Bearer ${this.accessToken}`
                }
            })

            return {
                data: response.data,
                auth: null
            }
        } catch (error) {
            if (error.response.status !== 401) {
                console.error(error)

                throw new Error(error)
            }

            const auth = await this.refresh()

            this.accessToken = auth.accessToken
            this.refreshToken = auth.refreshToken

            const { data } = await axios({
                method,
                url: `${this.url}${path}`,
                data: payload,
                headers: {
                    Authorization: `Bearer ${this.accessToken}`
                }
            })

            return {
                data,
                auth
            }
        }
    }
}

export default ApiClient
