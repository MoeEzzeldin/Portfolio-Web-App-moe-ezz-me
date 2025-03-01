<template>
  <div class="modal-backdrop" @click.prevent.stop="$emit('toggleContact')">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h3>Let's Connect!</h3>
        <button class="close-button" @click.prevent.stop="$emit('toggleContact')">
          <i class="fi fi-br-cross-small"></i>
        </button>
      </div>
      
      <p class="modal-description">
        Thank you for visiting my portfolio! If you'd like to chat or view my private repositories, please share your contact details below.
      </p>
      
      <form class="contact-form" @submit.prevent.stop="submitForm">
        <div class="form-group" :class="{ 'error': nameError }">
          <label for="name">Name</label>
          <input id="name" type="text" v-model="contact.name" 
            placeholder="Enter your name" 
            @blur="validateName" 
            autocomplete="given-name" 
            :maxlength="20" />
          <span v-if="nameError" class="error-message">Please enter a valid name</span>
        </div>
        
        <div class="form-group" :class="{ 'error': emailError }">
          <label for="email">Email</label>
          <input id="email" type="email" v-model="contact.email" 
            placeholder="Enter your email address" 
            @blur="validateEmail" 
            autocomplete="email" 
            :maxlength="40" />
          <span v-if="emailError" class="error-message">Please enter a valid email address</span>
        </div>
        
        <div class="form-group" :class="{ 'error': messageError }">
          <label for="message">Message</label>
          <textarea id="message" v-model="contact.message" 
            placeholder="Enter a message" 
            @blur="validateMessage" 
            :maxlength="400"></textarea>
          <span v-if="messageError" class="error-message">Please enter a message (at least 6 characters)</span>
        </div>
        
        <div class="form-actions">
          <button type="submit" class="submit-button" 
            :disabled="nameError || emailError || messageError" 
            @click.prevent.stop="passDataToParent">
            Send
          </button>
        </div>
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
      return this.nameError;
    },
    validateEmail() {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      this.emailError = !emailPattern.test(this.contact.email);
      return this.emailError;
    },
    validateMessage() {
      this.messageError = this.contact.message.trim().length <= 5;
      return this.messageError;
    },
    passDataToParent() {
      // Run validation on all fields before submission
      this.validateName();
      this.validateEmail();
      this.validateMessage();
      
      if (!this.nameError && !this.emailError && !this.messageError) {
        this.$emit('handleData', this.contact);
        this.clearContact();
      }
    },
    clearContact() {
      this.contact = {
        name: '',
        email: '',
        message: '',
      };
    },
    submitForm() {
      this.passDataToParent();
    }
  },
};
</script>

<style scoped>
/* 
  The backdrop was tricky to get right - I wanted it to blur the background
  for that modern feel but still keep the content visible. The z-index ensures
  it appears above everything else.
*/
.modal-backdrop {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  z-index: 1000;
  padding: clamp(16px, 2vw, 40px);
  box-sizing: border-box;
}

/* 
  I used clamp() everywhere in this modal to make sure it looks good
  on everything from my phone to my 1440p monitor. This was a game changer
  compared to media queries alone!
*/
.modal-container {
  background-color: var(--background-color);
  border-radius: clamp(12px, 1vw, 24px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2), var(--inner-shadow);
  width: 100%;
  max-width: clamp(320px, 45vw, 900px);
  max-height: calc(100vh - clamp(32px, 4vw, 80px));
  overflow-y: auto;
  padding: clamp(24px, 3vw, 48px);
  position: relative;
  box-sizing: border-box;
}

/* Simple clean header with space between title and close button */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: clamp(16px, 2vw, 32px);
}

.modal-header h3 {
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 600;
  margin: 0;
}

/* 
  I wanted a close button that felt interactive but wasn't too loud.
  The color transition on hover gives nice feedback without being distracting.
*/
.close-button {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--btn-color);
  font-size: clamp(1.2rem, 2vw, 1.8rem);
  transition: color 0.3s ease;
  padding: clamp(8px, 1vw, 16px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  color: var(--btn-hover);
}

.modal-description {
  font-size: clamp(0.95rem, 1.2vw, 1.3rem);
  line-height: 1.5;
  margin-bottom: clamp(24px, 3vw, 40px);
  color: var(--text-color);
}

/* 
  Form structure uses flex with gap - so much cleaner than margins!
  The gap property scales with viewport so spacing looks proportional
  on all screen sizes.
*/
.contact-form {
  display: flex;
  flex-direction: column;
  gap: clamp(20px, 2.5vw, 36px);
  width: 100%;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.form-group label {
  font-size: clamp(1rem, 1.3vw, 1.4rem);
  margin-bottom: clamp(8px, 1vw, 16px);
  color: var(--text-color);
  font-weight: 500;
}

/* 
  Input styling was a pain to get consistent across browsers.
  The inner shadow gives that slight inset look I was going for,
  while the focus state uses my brand orange color.
*/
.form-group input,
.form-group textarea {
  width: 100%;
  padding: clamp(12px, 1.5vw, 20px);
  border-radius: clamp(8px, 1vw, 16px);
  border: 1px solid var(--border-color, #ddd);
  font-size: clamp(1rem, 1.2vw, 1.3rem);
  background-color: var(--background-color);
  color: var(--text-color);
  box-shadow: var(--shadow), var(--inner-shadow);
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: var(--btn-color);
  outline: none;
  box-shadow: 0 0 0 2px rgba(255, 106, 0, 0.2), var(--inner-shadow);
}

.form-group textarea {
  min-height: clamp(100px, 15vh, 200px);
  resize: vertical;
}

/* 
  For validation errors, I wanted something noticeable but not too jarring.
  The red border is clear but the error message is subtle.
*/
.form-group.error input,
.form-group.error textarea {
  border-color: #f44336;
}

.error-message {
  color: #f44336;
  font-size: clamp(0.8rem, 1vw, 1rem);
  margin-top: clamp(4px, 0.5vw, 8px);
}

/* 
  The submit button is my favorite part - I used my brand gradient
  and added a subtle lift effect on hover. The disabled state
  makes it obvious when the form isn't ready to submit.
*/
.form-actions {
  display: flex;
  justify-content: center;
  margin-top: clamp(8px, 1vw, 20px);
}

.submit-button {
  background: linear-gradient(to right, rgb(255, 106, 0), rgb(255, 204, 0));
  color: white;
  border: none;
  border-radius: clamp(8px, 1vw, 16px);
  padding: clamp(12px, 1.5vw, 20px) clamp(32px, 4vw, 60px);
  font-size: clamp(1rem, 1.3vw, 1.5rem);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: clamp(48px, 6vh, 64px);
  min-width: clamp(150px, 20vw, 250px);
}

.submit-button:hover {
  background: linear-gradient(to right, rgb(255, 120, 20), rgb(255, 210, 20));
  transform: translateY(-2px);
}

.submit-button:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
}

/* 
  The hardest part was making this work well on all devices.
  I spent forever testing on different screens to get these breakpoints right.
*/

/* Mobile needs more compact spacing */
@media (max-width: 767px) {
  .modal-container {
    padding: 20px;
  }
  
  .modal-header h3 {
    font-size: 1.5rem;
  }
  
  .form-group input,
  .form-group textarea {
    padding: 10px;
  }
  
  .submit-button {
    min-width: 100%;
  }
}

/* Tablets get a wider container */
@media (min-width: 768px) and (max-width: 991px) {
  .modal-container {
    max-width: 80%;
    padding: 25px;
  }
  
  .modal-header h3 {
    font-size: 1.8rem;
  }
}

/* Desktop looks more compact */
@media (min-width: 992px) and (max-width: 1439px) {
  .modal-container {
    max-width: 60%;
    padding: 30px;
  }
  
  .submit-button {
    min-width: 200px;
  }
}

/* 
  My 1440p monitor needed larger text and more breathing room.
  The form felt too tiny without these adjustments!
*/
@media (min-width: 1440px) {
  .modal-container {
    max-width: 800px;
    padding: 40px;
  }
  
  .modal-header h3 {
    font-size: 2.2rem;
  }
  
  .modal-description {
    font-size: 1.2rem;
  }
  
  .form-group label {
    font-size: 1.3rem;
  }
  
  .form-group input,
  .form-group textarea {
    font-size: 1.2rem;
    padding: 16px;
  }
  
  .submit-button {
    font-size: 1.3rem;
    padding: 18px 50px;
    min-width: 220px;
  }
}

/* 
  Landscape mode on phones was a nightmare to figure out!
  Had to completely rethink the layout to make everything fit
  without scrolling too much.
*/
@media (orientation: landscape) and (max-height: 600px) {
  .modal-container {
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    padding: 16px;
  }
  
  .modal-header {
    margin-bottom: 8px;
  }
  
  .modal-description {
    margin-bottom: 12px;
    font-size: 0.9rem;
  }
  
  .contact-form {
    gap: 12px;
    overflow-y: auto;
    flex: 1;
  }
  
  .form-group {
    margin-bottom: 8px;
  }
  
  .form-group textarea {
    min-height: 60px;
  }
  
  .submit-button {
    padding: 8px 24px;
    min-height: 40px;
  }
}

/* 
  Got a friend with an ultrawide monitor to test this out.
  Had to make everything bigger so it doesn't look lost in all that space!
*/
@media (min-width: 2000px) or (min-width: 1800px) and (min-height: 900px) {
  .modal-container {
    max-width: 900px;
    padding: 48px;
  }
  
  .modal-header h3 {
    font-size: 2.5rem;
  }
  
  .modal-description {
    font-size: 1.3rem;
  }
  
  .form-group label {
    font-size: 1.4rem;
  }
  
  .form-group input,
  .form-group textarea {
    font-size: 1.3rem;
    padding: 18px;
  }
  
  .submit-button {
    font-size: 1.5rem;
    padding: 20px 60px;
    min-width: 250px;
  }
}
</style>