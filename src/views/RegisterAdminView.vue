<template>
  <div>
    <RegisterAdmin />
  </div>
</template>

<script>
// @ is an alias to /src
import RegisterAdmin from "@/components/RegisterAdmin.vue";

export default {
  name: "LoginView",
  components: {
    RegisterAdmin,
  },
};
</script>
