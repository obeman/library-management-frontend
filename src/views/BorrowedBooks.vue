<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">Borrowed Books Management</h1>
      </v-col>
    </v-row>

    <!-- Create Borrowed Book Form -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="mb-4">
          <v-card-title>Create New Borrow Record</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="createBorrowedBook">
              <v-text-field
                v-model.number="newBorrowedBook.bookId"
                label="Book ID"
                type="number"
                required
              ></v-text-field>
              <v-text-field
                v-model.number="newBorrowedBook.memberId"
                label="Member ID"
                type="number"
                required
              ></v-text-field>
              <v-text-field
                v-model="newBorrowedBook.borrowDate"
                label="Borrow Date"
                type="date"
                required
              ></v-text-field>
              <v-text-field
                v-model="newBorrowedBook.returnDate"
                label="Return Date"
                type="date"
                required
              ></v-text-field>
              <v-btn color="primary" type="submit">Create Borrow Record</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Borrowed Books List -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Borrowed Books List</v-card-title>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th>Book ID</th>
                  <th>Member ID</th>
                  <th>Borrow Date</th>
                  <th>Return Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="borrowedBook in borrowedBooks" :key="borrowedBook.id">
                  <td>{{ borrowedBook.bookId }}</td>
                  <td>{{ borrowedBook.memberId }}</td>
                  <td>{{ borrowedBook.borrowDate }}</td>
                  <td>{{ borrowedBook.returnDate }}</td>
                  <td>
                    <v-btn
                      icon="mdi-pencil"
                      variant="text"
                      size="small"
                      color="primary"
                      @click="editBorrowedBook(borrowedBook)"
                    ></v-btn>
                    <v-btn
                      icon="mdi-delete"
                      variant="text"
                      size="small"
                      color="error"
                      @click="deleteBorrowedBook(borrowedBook.id)"
                    ></v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Edit Borrowed Book Dialog -->
    <v-dialog v-model="editDialog" max-width="500px">
      <v-card>
        <v-card-title>Edit Borrow Record</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="updateBorrowedBook">
            <v-text-field
              v-model.number="editingBorrowedBook.bookId"
              label="Book ID"
              type="number"
              required
            ></v-text-field>
            <v-text-field
              v-model.number="editingBorrowedBook.memberId"
              label="Member ID"
              type="number"
              required
            ></v-text-field>
            <v-text-field
              v-model="editingBorrowedBook.borrowDate"
              label="Borrow Date"
              type="date"
              required
            ></v-text-field>
            <v-text-field
              v-model="editingBorrowedBook.returnDate"
              label="Return Date"
              type="date"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="editDialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="updateBorrowedBook">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const borrowedBooks = ref([])
const newBorrowedBook = ref({
  bookId: null,
  memberId: null,
  borrowDate: '',
  returnDate: ''
})
const editDialog = ref(false)
const editingBorrowedBook = ref({
  id: null,
  bookId: null,
  memberId: null,
  borrowDate: '',
  returnDate: ''
})

const API_URL = '/api/borrowed-books'

// Fetch all borrowed books
const fetchBorrowedBooks = async () => {
  try {
    const response = await axios.get(API_URL)
    borrowedBooks.value = response.data
  } catch (error) {
    console.error('Error fetching borrowed books:', error)
  }
}

// Create a new borrowed book record
const createBorrowedBook = async () => {
  try {
    await axios.post(API_URL, newBorrowedBook.value)
    newBorrowedBook.value = {
      bookId: null,
      memberId: null,
      borrowDate: '',
      returnDate: ''
    }
    await fetchBorrowedBooks()
  } catch (error) {
    console.error('Error creating borrowed book record:', error)
  }
}

// Edit borrowed book
const editBorrowedBook = (borrowedBook) => {
  editingBorrowedBook.value = { ...borrowedBook }
  editDialog.value = true
}

// Update borrowed book
const updateBorrowedBook = async () => {
  try {
    await axios.put(`${API_URL}/${editingBorrowedBook.value.id}`, editingBorrowedBook.value)
    editDialog.value = false
    await fetchBorrowedBooks()
  } catch (error) {
    console.error('Error updating borrowed book record:', error)
  }
}

// Delete borrowed book
const deleteBorrowedBook = async (id) => {
  if (confirm('Are you sure you want to delete this borrow record?')) {
    try {
      await axios.delete(`${API_URL}/${id}`)
      await fetchBorrowedBooks()
    } catch (error) {
      console.error('Error deleting borrowed book record:', error)
    }
  }
}

onMounted(() => {
  fetchBorrowedBooks()
})
</script> 