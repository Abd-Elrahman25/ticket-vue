<template>
  <div class="login-form">
    <h2>Ticket</h2>
    <h4>Login</h4>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      errors: 0,
      errorMessage: "",
    };
  },
  methods: {
    login() {
      // Basic validation
      this.checkErrors();
      if (this.errors > 0) return;
      axios
        .post("http://127.0.0.1:8000/api/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          // Handle successful response
          if (response) {
            let token = response.data.token;
            let role = response.data.user.type;
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            Swal.fire("Successfuly Logged in!", `role: ${role}`, "success");
          }
        })
        .catch((error) => {
          // Handle error
          let message = error.response.data.message;
          Swal.fire("Warning!", message, "warning");
        });
    },
    checkErrors() {
      this.errors = 0;
      this.errorMessage = "";

      if (!this.email) {
        this.errors++;
        this.errorMessage = "Email Field is Empty!";
        Swal.fire(this.errorMessage, "Please Enter a Valid E-mail", "warning");
      }

      if (!this.password) {
        this.errors++;
        this.errorMessage = "Password Field is Empty!";
        Swal.fire(
          this.errorMessage,
          "Please Enter a Valid Password",
          "warning"
        );
      }
    },
  },
};
</script>

<style scoped>
.login-form {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
