<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">Welcome to Library Management System</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-card class="mx-auto" max-width="400">
          <v-card-title>Books</v-card-title>
          <v-card-text>
            Manage your library's book collection. Add, edit, and remove books from the catalog.
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" to="/books">Manage Books</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-card class="mx-auto" max-width="400">
          <v-card-title>Authors</v-card-title>
          <v-card-text>
            Manage author information. Add new authors and update existing author details.
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" to="/authors">Manage Authors</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-card class="mx-auto" max-width="400">
          <v-card-title>Members</v-card-title>
          <v-card-text>
            Manage library members. Add new members and update member information.
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" to="/members">Manage Members</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-card class="mx-auto" max-width="400">
          <v-card-title>Borrowed Books</v-card-title>
          <v-card-text>
            Track borrowed books and manage book returns. View current borrowings and history.
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" to="/borrowed-books">Manage Borrowings</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// No additional setup needed for the home page
</script> 