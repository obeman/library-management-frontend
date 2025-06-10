import { defineStore } from 'pinia'
import axios from '../config/axios'

export const useAuthorsStore = defineStore('authors', {
  state: () => ({
    authors: [],
    loading: false,
    error: null
  }),

  getters: {
    getAuthors: (state) => state.authors,
    getAuthorById: (state) => (id) => state.authors.find(author => author.id === id)
  },

  actions: {
    async fetchAuthors() {
      this.loading = true
      try {
        const response = await axios.get('/api/authors')
        this.authors = response.data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async addAuthor(author) {
      this.loading = true
      try {
        const response = await axios.post('/api/authors', {
          name: author.name
        })
        this.authors.push(response.data)
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateAuthor(id, author) {
      this.loading = true
      try {
        const response = await axios.put(`/api/authors/${id}`, {
          name: author.name
        })
        const index = this.authors.findIndex(a => a.id === id)
        if (index !== -1) {
          this.authors[index] = response.data
        }
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteAuthor(id) {
      this.loading = true
      try {
        await axios.delete(`/api/authors/${id}`)
        const index = this.authors.findIndex(a => a.id === id)
        if (index !== -1) {
          this.authors.splice(index, 1)
        }
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    }
  }
}) 