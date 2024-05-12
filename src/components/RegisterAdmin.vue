<template>
  <div class="register-form">
    <h2>Ticket</h2>
    <h4>Register an Admin</h4>
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
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage: "",
    };
  },
  methods: {
    register() {
      // Basic validation
      if (
        !this.name ||
        !this.email ||
        !this.password ||
        !this.confirmPassword
      ) {
        this.errorMessage = "Please fill in all fields.";
        return;
      }

      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Passwords do not match.";
        return;
      }

      // Assuming you have a register function that sends registration data to your backend
      // Replace this with your actual registration logic
      // Example:
      // register({ name: this.name, email: this.email, password: this.password })
      //   .then(response => {
      //     // Handle successful registration
      //   })
      //   .catch(error => {
      //     // Handle registration failure
      //   });

      // For demonstration purposes, just log the registration data to the console
      console.log("Name:", this.name);
      console.log("Email:", this.email);
      console.log("Password:", this.password);

      // Reset error message
      this.errorMessage = "";
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
