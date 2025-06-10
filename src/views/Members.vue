<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">Members Management</h1>
      </v-col>
    </v-row>

    <!-- Create Member Form -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="mb-4">
          <v-card-title>Create New Member</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="createMember">
              <v-text-field
                v-model="newMember.name"
                label="Name"
                required
              ></v-text-field>
              <v-text-field
                v-model="newMember.email"
                label="Email"
                type="email"
                required
              ></v-text-field>
              <v-text-field
                v-model="newMember.phone"
                label="Phone"
                required
              ></v-text-field>
              <v-btn color="primary" type="submit">Create Member</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Member List -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Members List</v-card-title>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="member in members" :key="member.id">
                  <td>{{ member.name }}</td>
                  <td>{{ member.email }}</td>
                  <td>{{ member.phone }}</td>
                  <td>
                    <v-btn
                      icon="mdi-pencil"
                      variant="text"
                      size="small"
                      color="primary"
                      @click="editMember(member)"
                    ></v-btn>
                    <v-btn
                      icon="mdi-delete"
                      variant="text"
                      size="small"
                      color="error"
                      @click="deleteMember(member.id)"
                    ></v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Edit Member Dialog -->
    <v-dialog v-model="editDialog" max-width="500px">
      <v-card>
        <v-card-title>Edit Member</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="updateMember">
            <v-text-field
              v-model="editingMember.name"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="editingMember.email"
              label="Email"
              type="email"
              required
            ></v-text-field>
            <v-text-field
              v-model="editingMember.phone"
              label="Phone"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="editDialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="updateMember">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const members = ref([])
const newMember = ref({
  name: '',
  email: '',
  phone: ''
})
const editDialog = ref(false)
const editingMember = ref({
  id: null,
  name: '',
  email: '',
  phone: ''
})

const API_URL = '/api/members'

// Fetch all members
const fetchMembers = async () => {
  try {
    const response = await axios.get(API_URL)
    members.value = response.data
  } catch (error) {
    console.error('Error fetching members:', error)
  }
}

// Create a new member
const createMember = async () => {
  try {
    await axios.post(API_URL, newMember.value)
    newMember.value = { name: '', email: '', phone: '' }
    await fetchMembers()
  } catch (error) {
    console.error('Error creating member:', error)
  }
}

// Edit member
const editMember = (member) => {
  editingMember.value = { ...member }
  editDialog.value = true
}

// Update member
const updateMember = async () => {
  try {
    await axios.put(`${API_URL}/${editingMember.value.id}`, editingMember.value)
    editDialog.value = false
    await fetchMembers()
  } catch (error) {
    console.error('Error updating member:', error)
  }
}

// Delete member
const deleteMember = async (id) => {
  if (confirm('Are you sure you want to delete this member?')) {
    try {
      await axios.delete(`${API_URL}/${id}`)
      await fetchMembers()
    } catch (error) {
      console.error('Error deleting member:', error)
    }
  }
}

onMounted(() => {
  fetchMembers()
})
</script> 