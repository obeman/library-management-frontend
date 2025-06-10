<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">Authors Management</h1>
      </v-col>
    </v-row>

    <!-- Create Author Form -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="mb-4">
          <v-card-title>Create New Author</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="createAuthor">
              <v-text-field
                v-model="newAuthor.name"
                label="Name"
                required
              ></v-text-field>
              <v-text-field
                v-model="newAuthor.biography"
                label="Biography"
                required
              ></v-text-field>
              <v-btn color="primary" type="submit">Create Author</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Author List -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Authors List</v-card-title>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Biography</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="author in authors" :key="author.id">
                  <td>{{ author.name }}</td>
                  <td>{{ author.biography }}</td>
                  <td>
                    <v-btn
                      icon="mdi-pencil"
                      variant="text"
                      size="small"
                      color="primary"
                      @click="editAuthor(author)"
                    ></v-btn>
                    <v-btn
                      icon="mdi-delete"
                      variant="text"
                      size="small"
                      color="error"
                      @click="deleteAuthor(author.id)"
                    ></v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Edit Author Dialog -->
    <v-dialog v-model="editDialog" max-width="500px">
      <v-card>
        <v-card-title>Edit Author</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="updateAuthor">
            <v-text-field
              v-model="editingAuthor.name"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="editingAuthor.biography"
              label="Biography"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="editDialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="updateAuthor">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const authors = ref([])
const newAuthor = ref({
  name: '',
  biography: ''
})
const editDialog = ref(false)
const editingAuthor = ref({
  id: null,
  name: '',
  biography: ''
})

const API_URL = '/api/authors'

// Fetch all authors
const fetchAuthors = async () => {
  try {
    const response = await axios.get(API_URL)
    authors.value = response.data
  } catch (error) {
    console.error('Error fetching authors:', error)
  }
}

// Create a new author
const createAuthor = async () => {
  try {
    await axios.post(API_URL, newAuthor.value)
    newAuthor.value = { name: '', biography: '' }
    await fetchAuthors()
  } catch (error) {
    console.error('Error creating author:', error)
  }
}

// Edit author
const editAuthor = (author) => {
  editingAuthor.value = { ...author }
  editDialog.value = true
}

// Update author
const updateAuthor = async () => {
  try {
    await axios.put(`${API_URL}/${editingAuthor.value.id}`, editingAuthor.value)
    editDialog.value = false
    await fetchAuthors()
  } catch (error) {
    console.error('Error updating author:', error)
  }
}

// Delete author
const deleteAuthor = async (id) => {
  if (confirm('Are you sure you want to delete this author?')) {
    try {
      await axios.delete(`${API_URL}/${id}`)
      await fetchAuthors()
    } catch (error) {
      console.error('Error deleting author:', error)
    }
  }
}

onMounted(() => {
  fetchAuthors()
})
</script> 