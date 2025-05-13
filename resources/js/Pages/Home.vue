<template>
  <div class="p-6 max-w-md mx-auto">
    <h2 class="text-6xl text-red-500 mb-4">HOME</h2>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
    };
  },
 
  mounted() {
    this.testBackend();
  },
  methods: {
    async testBackend() {
      this.apiError = null;
      this.apiResponse = null;

      try {
        const response = await axios.get("/api/test-me");
        this.apiResponse = response.data;
        console.log("Backend response:", response.data);

        // toast.success("Login successful!");

        if (response.data.count) {
          this.counter.setCount(response.data.count);
        }
      } catch (error) {
        console.error("API error:", error);
        this.apiError = error.response?.data?.message || "Failed to connect to backend";
      }
    }
  }
};
</script>


<style scoped>

</style>