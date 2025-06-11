<template>
  <div>
    <v-card>
      <v-card-title class="d-flex align-center">
        Books
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search by Title"
          single-line
          hide-details
          class="mr-4"
          style="max-width: 300px"
        ></v-text-field>
        <v-btn color="primary" @click="openDialog()">
          Add Book
        </v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="filteredBooks"
        :search="''"
        :loading="booksStore.loading"
        class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
            size="small"
            class="me-2"
            @click="editItem(item.raw)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            size="small"
            @click="deleteItem(item.raw)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

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
                  :error-messages="errors.title"
                  @input="errors.title = ''"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.publishingYear"
                  label="Publishing Year"
                  type="number"
                  :error-messages="errors.publishingYear"
                  @input="errors.publishingYear = ''"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.category"
                  label="Category"
                  :error-messages="errors.category"
                  @input="errors.category = ''"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="editedItem.authorId"
                  :items="authorsStore.authors"
                  item-title="name"
                  item-value="id"
                  label="Author"
                  :error-messages="errors.authorId"
                  @update:model-value="errors.authorId = ''"
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
          <v-btn color="primary" variant="text" @click="save" :loading="booksStore.loading">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Are you sure you want to delete this book?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" variant="text" @click="closeDelete">Cancel</v-btn>
          <v-btn color="primary" variant="text" @click="deleteItemConfirm" :loading="booksStore.loading">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useBooksStore } from '../stores/books'
import { useAuthorsStore } from '../stores/authors'

const booksStore = useBooksStore()
const authorsStore = useAuthorsStore()

const search = ref('')
const dialog = ref(false)
const deleteDialog = ref(false)

const headers = [
  { title: 'Title', key: 'title' },
  { title: 'Publishing Year', key: 'publishingYear' },
  { title: 'Category', key: 'category' },
  { title: 'Author', key: 'author.name' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const editedIndex = ref(-1)
const editedItem = ref({
  title: '',
  publishingYear: '',
  category: '',
  authorId: null
})

const errors = ref({
  title: '',
  publishingYear: '',
  category: '',
  authorId: ''
})

const defaultItem = {
  title: '',
  publishingYear: '',
  category: '',
  authorId: null
}

const formTitle = computed(() => {
  return editedIndex.value === -1 ? 'New Book' : 'Edit Book'
})

const filteredBooks = computed(() => {
  if (!search.value) return booksStore.books;
  return booksStore.books.filter(book =>
    book.title && book.title.toLowerCase().includes(search.value.toLowerCase())
  );
});

async function editItem(item) {
  editedIndex.value = booksStore.books.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialog.value = true
}

function deleteItem(item) {
  editedIndex.value = booksStore.books.indexOf(item)
  editedItem.value = Object.assign({}, item)
  deleteDialog.value = true
}

async function deleteItemConfirm() {
  try {
    await booksStore.deleteBook(editedItem.value.id)
    closeDelete()
  } catch (error) {
    // Handle error
  }
}

function closeDialog() {
  dialog.value = false
  editedItem.value = Object.assign({}, defaultItem)
  editedIndex.value = -1
  errors.value = {
    title: '',
    publishingYear: '',
    category: '',
    authorId: ''
  }
}

function closeDelete() {
  deleteDialog.value = false
  editedItem.value = Object.assign({}, defaultItem)
  editedIndex.value = -1
}

async function save() {
  try {
    if (editedIndex.value > -1) {
      await booksStore.updateBook(editedItem.value.id, editedItem.value)
    } else {
      await booksStore.addBook(editedItem.value)
    }
    closeDialog()
  } catch (error) {
    if (error.response?.data?.errors) {
      errors.value = error.response.data.errors
    }
  }
}

function openDialog() {
  editedItem.value = Object.assign({}, defaultItem)
  editedIndex.value = -1
  dialog.value = true
}

onMounted(async () => {
  await Promise.all([
    booksStore.fetchBooks(),
    authorsStore.fetchAuthors()
  ])
})
</script> 