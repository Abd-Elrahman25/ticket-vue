<template>
  <div>{{ backendData }}</div>

  <a href="#" @click="testFun">Get Data</a>
  <DataTable
    class="table clawback-refund-table table-bordered w-100 nowrap display"
    id="table-orders"
    ref="table"
    :data="data"
  >
    <thead>
      <tr>
        <th>A</th>
        <th>B</th>
      </tr>
    </thead>
  </DataTable>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import DataTable from "datatables.net-vue3";
import Select from "datatables.net-select";

DataTable.use(Select);
export default {
  components: { DataTable },
  name: "TicketView",
  data() {
    return {
      tickets: [],
      data: [
        [1, 2],
        [3, 4],
      ],
      backendData: "",
    };
  },
  mounted() {},
  methods: {
    testFun() {
      axios
        .get("http://127.0.0.1:8000/api/test")
        .then((response) => {
          // Handle successful response
          if (response) {
            console.log(response.data); // Do something with the received data
            this.backendData = JSON.stringify(response.data.message);
          }
        })
        .catch((error) => {
          // Handle error
          console.error("Error fetching data:", error);
        });
    },
  },
};
</script>

<style>
@import "datatables.net-dt";
</style>
