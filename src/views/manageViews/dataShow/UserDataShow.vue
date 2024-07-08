<template>
  <div class="data-show">
    <iframe
        src="http://localhost:3000/shareDashboard/600db5af72e747559699dc178f87239f?type=NONE"
        frameborder="0"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: "UserDataShow",
  useForm: {},
};
</script>

<style scoped>
.data-show {
  height: 100%;
}

.data-show iframe {
  margin-top: -50px;
  width: 100%;
  height: 100vh;
}
</style>
