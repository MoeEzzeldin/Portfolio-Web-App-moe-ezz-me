<template>
  <div class="contact-form" @click.prevent.stop="$emit('toggleContact')">
    <div class="wrapper" @click.stop>
      <h3>lorem ipsom</h3>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum eius eum eos sapiente, quaerat ex. Modi ullam, ut qui delectus itaque quo sapiente nostrum adipisci libero eveniet fugiat quia voluptatum.</p>
    <span class="hide"><a @click.prevent.stop="$emit('toggleContact')">X</a></span> 
    <form class="form" @submit.prevent.stop="submit" action="">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" type="text" v-model="contact.name" placeholder="Enter your name">
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" type="text" v-model="contact.email" placeholder="Enter your email address">
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <input id="message" type="text" v-model="contact.message" placeholder="Enter a message">
      </div>
      <button class="btn" @click.prevent.stop="passToParent">Send!</button>
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
      contact: {
        name: '',
        email: '',
        message: '',
      },
    }
  },
  methods: {
passToParent(){
  this.$emit('handleData',this.contact)
  console.log(`data from form: ${this.contact}`)
}
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
  z-index: 10;
  backdrop-filter: blur(15px); /* Blur the content behind it */

}
.form {
  display: grid;
  grid-template-columns: auto;
  gap: 1.5rem;
}
.wrapper {
  background-color: var(--background-color);
  height: 500px;
  width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  position: relative;
  z-index: 100;
}
.hide{
  position: absolute;
  right: 2rem;
  top: 2rem;
  cursor: pointer;

}
.form-group {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
}
.btn {
  height: 50px;
  width: 150px;
  border-radius: 8px;
  box-shadow: var(--shadow);
}
</style>
