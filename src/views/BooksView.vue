<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">Books Management</h1>
      </v-col>
    </v-row>

    <!-- Create Book Form -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="mb-4">
          <v-card-title>Create New Book</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="createBook">
              <v-text-field
                v-model="newBook.title"
                label="Title"
                required
              ></v-text-field>
              <v-text-field
                v-model.number="newBook.authorId"
                label="Author ID"
                type="number"
                required
              ></v-text-field>
              <v-text-field
                v-model.number="newBook.publishedYear"
                label="Published Year"
                type="number"
                required
              ></v-text-field>
              <v-btn color="primary" type="submit">Create Book</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Book List -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Books List</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="book in books" :key="book.id">
                <v-list-item-title>{{ book.title }}</v-list-item-title>
                <v-list-item-subtitle>
                  Author ID: {{ book.authorId }} | Year: {{ book.publishedYear }}
                </v-list-item-subtitle>
                <template v-slot:append>
                  <v-btn
                    icon="mdi-pencil"
                    variant="text"
                    @click="editBook(book)"
                  ></v-btn>
                  <v-btn
                    icon="mdi-delete"
                    variant="text"
                    color="error"
                    @click="deleteBook(book.id)"
                  ></v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Edit Book Dialog -->
    <v-dialog v-model="editDialog" max-width="500px">
      <v-card>
        <v-card-title>Edit Book</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="updateBook">
            <v-text-field
              v-model="editingBook.title"
              label="Title"
              required
            ></v-text-field>
            <v-text-field
              v-model.number="editingBook.authorId"
              label="Author ID"
              type="number"
              required
            ></v-text-field>
            <v-text-field
              v-model.number="editingBook.publishedYear"
              label="Published Year"
              type="number"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="editDialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="updateBook">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const books = ref([])
const newBook = ref({
  title: '',
  authorId: null,
  publishedYear: null
})
const editDialog = ref(false)
const editingBook = ref({
  id: null,
  title: '',
  authorId: null,
  publishedYear: null
})

const API_URL = '/api/books'

// Fetch all books
const fetchBooks = async () => {
  try {
    const response = await axios.get(API_URL)
    books.value = response.data
  } catch (error) {
    console.error('Error fetching books:', error)
  }
}

// Create a new book
const createBook = async () => {
  try {
    await axios.post(API_URL, newBook.value)
    newBook.value = { title: '', authorId: null, publishedYear: null }
    await fetchBooks()
  } catch (error) {
    console.error('Error creating book:', error)
  }
}

// Edit book
const editBook = (book) => {
  editingBook.value = { ...book }
  editDialog.value = true
}

// Update book
const updateBook = async () => {
  try {
    await axios.put(`${API_URL}/${editingBook.value.id}`, editingBook.value)
    editDialog.value = false
    await fetchBooks()
  } catch (error) {
    console.error('Error updating book:', error)
  }
}

// Delete book
const deleteBook = async (id) => {
  if (confirm('Are you sure you want to delete this book?')) {
    try {
      await axios.delete(`${API_URL}/${id}`)
      await fetchBooks()
    } catch (error) {
      console.error('Error deleting book:', error)
    }
  }
}

onMounted(() => {
  fetchBooks()
})
</script> 