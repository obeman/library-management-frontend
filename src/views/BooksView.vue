<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">Books</h1>
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              class="mb-2"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="openAddDialog">
              <v-icon left>mdi-plus</v-icon>
              Add Book
            </v-btn>
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="books"
            :search="search"
            :loading="loading"
            class="elevation-1"
          >
            <template v-slot:item.actions="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="editBook(item.raw)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="deleteBook(item.raw)"
              >
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Add/Edit Dialog -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.title"
                  label="Title"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.category"
                  label="Category"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.publishingYear"
                  label="Publishing Year"
                  type="number"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="editedItem.authorId"
                  :items="authors"
                  item-title="name"
                  item-value="id"
                  label="Author"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" variant="text" @click="closeDialog">
            Cancel
          </v-btn>
          <v-btn color="primary" variant="text" @click="saveBook">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'BooksView',
  setup() {
    const books = ref([])
    const authors = ref([])
    const loading = ref(false)
    const search = ref('')
    const dialog = ref(false)
    const editedIndex = ref(-1)
    const editedItem = ref({
      title: '',
      category: '',
      publishingYear: new Date().getFullYear(),
      authorId: null
    })
    const defaultItem = {
      title: '',
      category: '',
      publishingYear: new Date().getFullYear(),
      authorId: null
    }

    const headers = [
      { title: 'Title', key: 'title' },
      { title: 'Category', key: 'category' },
      { title: 'Publishing Year', key: 'publishingYear' },
      { title: 'Author', key: 'authorName' },
      { title: 'Actions', key: 'actions', sortable: false }
    ]

    const fetchBooks = async () => {
      loading.value = true
      try {
        console.log('Fetching books...')
        const response = await axios.get('http://localhost:8080/api/books')
        console.log('Books response:', response.data)
        books.value = response.data
      } catch (error) {
        console.error('Error fetching books:', error)
      } finally {
        loading.value = false
      }
    }

    const fetchAuthors = async () => {
      try {
        console.log('Fetching authors...')
        const response = await axios.get('http://localhost:8080/api/authors')
        console.log('Authors response:', response.data)
        authors.value = response.data
      } catch (error) {
        console.error('Error fetching authors:', error)
      }
    }

    const formTitle = computed(() => {
      return editedIndex.value === -1 ? 'New Book' : 'Edit Book'
    })

    const openAddDialog = () => {
      editedIndex.value = -1
      editedItem.value = Object.assign({}, defaultItem)
      dialog.value = true
    }

    const editBook = (item) => {
      editedIndex.value = books.value.indexOf(item)
      editedItem.value = Object.assign({}, item)
      dialog.value = true
    }

    const deleteBook = async (item) => {
      if (confirm('Are you sure you want to delete this book?')) {
        try {
          await axios.delete(`http://localhost:8080/api/books/${item.id}`)
          await fetchBooks()
        } catch (error) {
          console.error('Error deleting book:', error)
        }
      }
    }

    const closeDialog = () => {
      dialog.value = false
      editedItem.value = Object.assign({}, defaultItem)
      editedIndex.value = -1
    }

    const saveBook = async () => {
      try {
        if (editedIndex.value > -1) {
          await axios.put(`http://localhost:8080/api/books/${editedItem.value.id}`, editedItem.value)
        } else {
          await axios.post('http://localhost:8080/api/books', editedItem.value)
        }
        await fetchBooks()
        closeDialog()
      } catch (error) {
        console.error('Error saving book:', error)
      }
    }

    onMounted(() => {
      console.log('Component mounted')
      fetchBooks()
      fetchAuthors()
    })

    return {
      books,
      authors,
      loading,
      search,
      dialog,
      editedIndex,
      editedItem,
      headers,
      formTitle,
      openAddDialog,
      editBook,
      deleteBook,
      closeDialog,
      saveBook
    }
  }
}
</script> 