<template>
  <div class="contact-form" @click.prevent.stop="$emit('toggleContact')">
    <div class="wrapper" @click.stop>
      <h3>Let's Connect!</h3>
      <p>Thanks for visiting my portfolio website! Feel free to leave your information, a message, and let's connect.</p>
      <span class="hide"><a @click.prevent.stop="$emit('toggleContact')"><i class="fi fi-br-cross-small"></i></a></span>
      <form class="form" @submit.prevent.stop="submitForm">
        <div class="form-group">
          <label for="name">Name</label>
          <input id="name" type="text" v-model="contact.name" placeholder="Enter your name" @blur="validateName"/>
          <span v-if="nameError" class="error-message">Please enter a valid name</span>
        </div>
        <div class="form-group" :class="{ 'error': emailError }">
          <label for="email">Email</label>
          <input id="email" type="text" v-model="contact.email" placeholder="Enter your email address" @blur="validateEmail"/>
          <span v-if="emailError" class="error-message">Please enter a valid email address</span>
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" v-model="contact.message" placeholder="Enter a message" @blur="validateMessage"></textarea>
          <span v-if="messageError" class="error-message">Please enter message</span>
        </div>
        <button class="btn" :disabled="emailError" @click.prevent.stop="passDataToParent">Send</button>
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
      nameError: false,
      messageError: false,
    };
  },
  methods: {
    validateName() {
      this.nameError = this.contact.name.trim().length <= 1;
      console.log(this.nameError);
      return this.nameError;
    },
    validateEmail() {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      this.emailError = !emailPattern.test(this.contact.email);
    },
    validateMessage() {
      return this.messageError = this.contact.message.trim().length <= 5;
    },
    submitForm() {
      if (!this.emailError) {
        this.passDataToParent();
      }
    },
    passDataToParent() {
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
  box-shadow: var(--shadow), var(--inner-shadow);
}

.hide {
  position: absolute;
  right: 1rem;
  top: 1rem;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
}

.hide i {
  color: var(--btn-color);
  transition: color 0.3s ease;

}
.hide i:hover {
  opacity: 0.7;
  color: var(--btn-hover);
  transition: color 0.3s ease;
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
  color: var(--text-color);
}

input:focus,
textarea:focus {
  border-color: var(--btn-color);
  background-color: #fff;
  outline: none;
  color: #121212;
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
  background-color: var(--btn-color);
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
  transition: background-color 0.5s ease;
  box-shadow: var(--inner-shadow);
}

.btn:hover {
  background-color: var(--btn-hover);
  transition: background-color 0.5s ease;
  border: 2px solid var(--btn-hover);
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
@media (orientation: landscape) {

  .contact-form {
    padding: 0;

  }
  .wrapper {
    position: absolute;
    width: auto;
    height: auto;
    padding: 2rem 3rem;
    margin: 0;
    padding: 2rem 2rem 2rem 2rem; 
  }

  textarea {
    height: auto;

  }

  .btn {
    max-width: 150px;
    align-self: center;

  }

}
</style>
