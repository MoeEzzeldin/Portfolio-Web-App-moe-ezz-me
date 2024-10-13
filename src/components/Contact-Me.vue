<template>
  <div class="contact-form" @click.prevent.stop="$emit('toggleContact')">
    <div class="wrapper" @click.stop>
      <h3>Contact Me!</h3>
      <p>Let's connect! Whether you're a recruiter, hiring manager, or just someone looking to chat, feel free to drop me a message. I'd love to hear from you and explore how we can collaborate or help each other out. Looking forward to your message!</p>
      <span class="hide"><a @click.prevent.stop="$emit('toggleContact')">X</a></span>

      <form class="form" @submit.prevent.stop="submitForm">
        <div class="form-group">
          <label for="name">Name</label>
          <input id="name" type="text" v-model="contact.name" placeholder="Enter your name" />
        </div>
        <div class="form-group" :class="{ 'error': emailError }">
          <label for="email">Email</label>
          <input id="email" type="text" v-model="contact.email" placeholder="Enter your email address" @blur="validateEmail" />
          <span v-if="emailError" class="error-message">Please enter a valid email address</span>
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" v-model="contact.message" placeholder="Enter a message"></textarea>
        </div>
        <button class="btn" :disabled="emailError" @click.prevent.stop="passToParent">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact-Me',
  data() {
    return {
      contact: {
        name: '',
        email: '',
        message: '',
      },
      emailError: false,
    };
  },
  methods: {
    passToParent() {
      this.$emit('handleData', this.contact);
      this.clearContact();
    },
    clearContact() {
      this.contact = {
        name: '',
        email: '',
        message: '',
      };
    },
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = !emailPattern.test(this.contact.email);
    },
    submitForm() {
      if (!this.emailError) {
        this.passToParent();
      }
    },
  },
};
</script>

<style scoped>
.contact-form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 10;
  backdrop-filter: blur(10px);
  padding: 20px;
}

.wrapper {
  background-color:var(--background-color);
  padding: 2rem;
  max-width: 500px; 
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 100;
}

.hide {
  position: absolute;
  right: 1rem;
  top: 1rem;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
}

h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

p {
  font-size: 0.95rem;
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.4;
}

.form {
  display: grid;
  grid-gap: 1.5rem;
  width: 100%;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
}

label {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

input,
textarea {
  width: 100%;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 1rem;
  background-color: var(--background-color);
  transition: border 0.3s ease;
  box-sizing: border-box; 
  box-shadow: var(--shadow), var(--inner-shadow);
}

input:focus,
textarea:focus {
  border-color: #007bff;
  background-color: #fff;
  outline: none;
}

textarea {
  min-height: 120px;
  resize: vertical;
}

.form-group.error input {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.btn {
  background-color: #007bff;
  color: white;
  height: 50px;
  width: 100%;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 123, 255, 0.3);
}

.btn:hover {
  background-color: #0056b3;
}

.btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  box-shadow: none;
}
@media (max-width: 768px) {
  .contact-form {
    padding: 0;
  }
  .wrapper {
    max-width: 250px;
    padding: 2rem 3rem;
    margin: 0;
    padding: 2rem 2rem 2rem 2rem; 
  }

  textarea {
    height: 150px;
  }

  .btn {
    max-width: 150px;
    align-self: center;
  }
}
</style>
