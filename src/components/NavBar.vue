<!-- components/Navbar.vue -->

<template>
  <nav v-if="isAuthenticated">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/ticket">Ticket</router-link>|
    <router-link to="/register">Register</router-link>|
    <a class="logout-button" @click.prevent="logout">Logout</a>
  </nav>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem("token");
    },
  },
  methods: {
    logout() {
      let token = localStorage.getItem("token");
      axios
        .post(
          "http://127.0.0.1:8000/api/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          // Handle successful response
          if (response) {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            window.location.href = "/login";
          }
        })
        .catch(() => {
          // Handle error
          let message = "An Error Occured While Logging Out";
          Swal.fire("Error!", message, "error");
        });
    },
  },
};
</script>

<style>
.logout-button {
  width: 5%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
