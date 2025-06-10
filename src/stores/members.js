import { defineStore } from 'pinia'
import axios from '../config/axios'

export const useMembersStore = defineStore('members', {
  state: () => ({
    members: [],
    loading: false,
    error: null
  }),

  getters: {
    getMembers: (state) => state.members,
    getMemberById: (state) => (id) => state.members.find(member => member.id === id)
  },

  actions: {
    async fetchMembers() {
      this.loading = true
      try {
        const response = await axios.get('/api/members')
        this.members = response.data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async addMember(member) {
      this.loading = true
      try {
        const response = await axios.post('/api/members', {
          name: member.name,
          email: member.email
        })
        this.members.push(response.data)
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateMember(id, member) {
      this.loading = true
      try {
        const response = await axios.put(`/api/members/${id}`, {
          name: member.name,
          email: member.email
        })
        const index = this.members.findIndex(m => m.id === id)
        if (index !== -1) {
          this.members[index] = response.data
        }
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteMember(id) {
      this.loading = true
      try {
        await axios.delete(`/api/members/${id}`)
        const index = this.members.findIndex(m => m.id === id)
        if (index !== -1) {
          this.members.splice(index, 1)
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