import { defineStore } from 'pinia'
import axios from '../config/axios'

export const useBooksStore = defineStore('books', {
  state: () => ({
    books: [],
    loading: false,
    error: null
  }),

  getters: {
    getBooks: (state) => state.books,
    getBookById: (state) => (id) => state.books.find(book => book.id === id)
  },

  actions: {
    async fetchBooks() {
      this.loading = true
      try {
        const response = await axios.get('/api/books')
        this.books = response.data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async addBook(book) {
      this.loading = true
      try {
        const response = await axios.post('/api/books', {
          title: book.title,
          authorId: book.authorId,
          category: book.category,
          publishingYear: book.publishingYear
        })
        this.books.push(response.data)
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateBook(id, book) {
      this.loading = true
      try {
        const response = await axios.put(`/api/books/${id}`, {
          title: book.title,
          authorId: book.authorId,
          category: book.category,
          publishingYear: book.publishingYear
        })
        const index = this.books.findIndex(b => b.id === id)
        if (index !== -1) {
          this.books[index] = response.data
        }
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteBook(id) {
      this.loading = true
      try {
        await axios.delete(`/api/books/${id}`)
        const index = this.books.findIndex(b => b.id === id)
        if (index !== -1) {
          this.books.splice(index, 1)
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