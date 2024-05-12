<template>
  <div class="register-form">
    <h2>Ticket</h2>
    <h4>Register</h4>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="name">Name:</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="name"
          required
        />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="email"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="password"
          required
        />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          class="form-control"
          id="confirmPassword"
          v-model="confirmPassword"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage: "",
      errors: "",
    };
  },
  methods: {
    register() {
      // Basic validation
      this.checkErrors();
      if (this.errors > 0) return;
      axios
        .post("http://127.0.0.1:8000/api/register", {
          email: this.email,
          name: this.name,
          password: this.password,
          password_confirmation: this.confirmPassword,
        })
        .then((response) => {
          // Handle successful response
          if (response) {
            let message = "You've Successfully Registered!";
            let information = "You'll be Redirected To Login Page Shortly";
            Swal.fire(message, information, "success");

            setTimeout(function () {
              window.location.href = "/login"; // Redirect to the login page
            }, 3000);
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

      if (!this.name) {
        this.errors++;
        this.errorMessage = "Name Field is Empty!";
        Swal.fire(this.errorMessage, "Please Enter Your Name", "warning");
      }

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

      if (this.password != this.confirmPassword) {
        this.errors++;
        this.errorMessage = "Password Does not Match!";
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
.register-form {
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

input[type="text"],
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
