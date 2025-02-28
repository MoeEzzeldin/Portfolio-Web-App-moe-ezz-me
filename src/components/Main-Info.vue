<template>
  <main class="main">
    <section class="greeting">
      <div class="header">
        <h3 v-if="myData.basics" class="greet">Hi, my name is...</h3>
        <h1 class="name" v-if="myData.basics">{{ myData.basics.name }}</h1>
        <h2 class="whomi" v-if="myData.basics">{{ myData.basics.label }}</h2>
        <p class="intro" v-if="myData.basics">
          {{ myData.basics.summary }}
        </p>
      </div>
    </section>
    <!-- Nav -->
    <nav class="nav">
      <ul class="list">
        <li class="holder" v-for="item in navItems" :key="item.id">
          <span :class="{ active: item.id === activeNav }"></span>
          <a @click="scrollToSection(item.id)" :class="{ active: item.id === activeNav }">{{
            item.label
          }}</a>
        </li>
      </ul>
    </nav>
    <div class="footer">
      <!-- Links and Icons for CONTACT -->
      <div class="icons">
        <a href="https://github.com/MoeEzzeldin" target="_blank">
          <i class="fi fi-brands-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/moe-ezz-columbus-ohio/" target="_blank">
          <i class="fi fi-brands-linkedin"></i>
        </a>
        <a @click.prevent="contactMe()">
          <i class="fi fi-sc-envelope"></i>
        </a>

        <a href="'tel:'+16148169143">
          <i class="fi fi-ss-phone-flip"></i>
        </a>
      </div>

      <div class="copy">
        <p>© 2024 Ahmed Ezzeldin. All rights reserved.</p>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Main-Info',
  props: ['theme', 'icons', 'myData', 'showContact', 'activeNav'],

  data() {
    return {
      navItems: [
        { id: 'about', label: 'About' },
        // { id: 'skills', label: 'Skills' }, // Commented out to remove Skills section
        { id: 'experience', label: 'Experience' },
        { id: 'projects', label: 'Projects' }
      ],
      animateContactBtn: false
    }
  },
  mounted() {},

  methods: {
    contactMe() {
      this.$emit('toggleContact')
    },
    scrollToSection(id) {
      const section = document.getElementById(id)
      if (section) {
        // Scroll to the section smoothly
        section.scrollIntoView({ behavior: 'smooth' })
      }
    },
    showPrivateRepoTip() {
      this.animateContactBtn = true
      // Optionally scroll to the contact button
      if (window.innerWidth <= 768) {
        // Adjust the value as needed for your tablet breakpoint
        this.$refs.contactButton.scrollIntoView({ behavior: 'smooth' })
      } // Hide the tooltip after 5 seconds
      setTimeout(() => {
        this.animateContactBtn = false
      }, 1500)
    }
  }
}
</script>

<style scoped>
.main {
  display: grid;
  grid-template-rows: 0.8fr 0.5fr 0.5fr;
  height: 100vh;
  gap: 2rem;
}

/* .main >*:not(:last-child) {
  margin-left: 25px;
} */

main .header {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 1rem;
}
.greeting {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  top: 0;
}

main .greet {
  /* font-family: 'Pixelify Sans', sans-serif; */
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  background: linear-gradient(to right, rgb(255, 106, 0), blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

main .name {
  font-weight: 700;
  font-style: normal;
  font-size: 2.5rem;
  line-height: 1;
  margin: 0;
  color: var(--heading-color);
}

main .whomi {
  font-weight: 600;
  font-style: normal;
  background: linear-gradient(to right, rgb(255, 106, 0), blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

main .intro {
  font-weight: 500;
  font-style: normal;
  font-size: 1.2rem;
  max-width: 510px;
}

main .nav {
  display: flex;
  justify-content: left;
  align-items: center;
}

main .list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  list-style: none;
  padding: 0;
}

main .list > * {
  display: flex;
}

main .holder {
  display: flex;
  align-items: center;
  gap: 25px;
}

main .holder:hover span {
  height: 3px;
  width: 75px;
  transform: scale(1.1);
}
main .holder span.active {
  height: 3px;
  width: 75px;
  transform: scale(1.1);
}

main .list span {
  background-color: black;
  height: 1px;
  width: 50px;
  font-weight: 700;
  font-style: normal;
  background: linear-gradient(to right, rgb(255, 106, 0), rgb(90, 60, 240));
  transition:
    transform 0.3s ease,
    width 0.3s ease;
}

main .list a {
  text-decoration: none;
  color: var(--text-color);
  padding: 10px 0;
  transform: scale(1.1);
}
main .holder:hover a {
  transform: scale(1.3);
  background: linear-gradient(to right, rgb(255, 89, 0), rgb(255, 204, 0));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.active {
  transform: scale(1.3);
  background: linear-gradient(to right, rgb(255, 89, 0), rgb(255, 204, 0));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer {
  position: relative;
  align-self: center;
}

.footer .icons {
  display: flex;
  justify-content: space-evenly;
  gap: 30px;
}

.footer .copy {
  display: none;
}

.footer i {
  color: var(--text-color);
  font-size: 2.5rem;
  transition:
    transform 0.3s ease,
    filter 0.3s ease;
  cursor: pointer;
  display: inline-block; /* add this */
}

.footer i:hover {
  text-shadow: var(--shadow);
}

.animate-click {
  animation: clickPulse 0.5s ease-in-out 2;
}

@keyframes clickPulse {
  0% {
    transform: scale(1);
    color: yellow;
  }
  50% {
    transform: scale(0.9);
    color: green;
  }
  100% {
    transform: scale(1);
    color: yellow;
  }
  0% {
    transform: scale(1);
    color: yellow;
  }
  50% {
    transform: scale(0.9);
    color: green;
  }
  100% {
    transform: scale(1);
    color: yellow;
  }
}

@media (min-width: 992px) and (max-width: 1199.98px) {
  /* CSS rules for tablets */
  .main {
    gap: 2rem;
    height: 95vh;
  }
}

@media (min-width: 1200px) {
  main .main {
    display: grid;
    grid-template-rows: 1fr 0.5fr 0.5fr;
    gap: 4rem;
    height: calc(93vh - 3rem) !important;
  }
  .greeting {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  .main .name {
    font-size: var(--heading-font);
  }
  .whomi {
    font-size: 2rem;
  }

  .nav {
    font-size: var(--font-large);
  }
  .footer {
    height: 150px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0;
  }

  .footer .icons {
    width: 100%;
    gap: 50px;
  }
  .footer .copy {
    display: block;
  }
}

@media (orientation: landscape) {
  .main {
    gap: 2rem;
    height: auto;
  }
  #scroll {
    gap: 2rem;
  }
}
</style>
