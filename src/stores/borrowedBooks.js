import { defineStore } from 'pinia'
import axios from '../config/axios'

export const useBorrowedBooksStore = defineStore('borrowedBooks', {
  state: () => ({
    borrowedBooks: [],
    loading: false,
    error: null
  }),

  getters: {
    getBorrowedBooks: (state) => state.borrowedBooks,
    getBorrowedBookById: (state) => (id) => state.borrowedBooks.find(book => book.id === id)
  },

  actions: {
    async fetchBorrowedBooks() {
      this.loading = true
      try {
        const response = await axios.get('/api/borrowed-books')
        this.borrowedBooks = response.data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async addBorrowedBook(borrowedBook) {
      this.loading = true
      try {
        const response = await axios.post('/api/borrowed-books', {
          bookId: borrowedBook.bookId,
          memberId: borrowedBook.memberId,
          borrowedDate: borrowedBook.borrowedDate,
          dueDate: borrowedBook.dueDate
        })
        this.borrowedBooks.push(response.data)
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateBorrowedBook(id, borrowedBook) {
      this.loading = true
      try {
        const response = await axios.put(`/api/borrowed-books/${id}`, {
          bookId: borrowedBook.bookId,
          memberId: borrowedBook.memberId,
          borrowedDate: borrowedBook.borrowedDate,
          dueDate: borrowedBook.dueDate,
          returnedDate: borrowedBook.returnedDate
        })
        const index = this.borrowedBooks.findIndex(b => b.id === id)
        if (index !== -1) {
          this.borrowedBooks[index] = response.data
        }
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteBorrowedBook(id) {
      this.loading = true
      try {
        await axios.delete(`/api/borrowed-books/${id}`)
        const index = this.borrowedBooks.findIndex(b => b.id === id)
        if (index !== -1) {
          this.borrowedBooks.splice(index, 1)
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