<script setup>
import { ref } from 'vue'
</script>

<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
    >
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
        :title="rail ? '' : 'Library System'"
      >
        <template v-slot:append>
          <v-btn
            variant="text"
            icon="mdi-chevron-left"
            @click.stop="rail = !rail"
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item to="/" prepend-icon="mdi-home" title="Home" value="home"></v-list-item>
        <v-list-item to="/books" prepend-icon="mdi-book" title="Books" value="books"></v-list-item>
        <v-list-item to="/authors" prepend-icon="mdi-account" title="Authors" value="authors"></v-list-item>
        <v-list-item to="/members" prepend-icon="mdi-account-group" title="Members" value="members"></v-list-item>
        <v-list-item to="/borrowed-books" prepend-icon="mdi-book-open-page-variant" title="Borrowed Books" value="borrowed"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Library Management System</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
.v-main {
  background-color: #f5f5f5;
}
</style>
