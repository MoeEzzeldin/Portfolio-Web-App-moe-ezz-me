<template>
<div class="contact-form">
  <div class="wrapper">
    <form @submit.prevent="submit" action="">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text">
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="text">
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <input type="text">
      </div>
    </form>
  </div>
</div>
</template>

<script>
export default {
  name: 'Contact-Me',
  props: [],
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>
.contact-form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  z-index: 1;
  backdrop-filter: blur(15px); /* Blur the content behind it */
}

.wrapper {
  background-color: var(--background-color);
  height: 400px;
  width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}
</style>
