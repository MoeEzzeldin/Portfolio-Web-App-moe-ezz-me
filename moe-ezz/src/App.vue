<template>
  <img class="theme-btn" @click="toggleTheme" :src="icons.png" alt="dark-light" />
  <main class="main">
    <div class="container">
      <!-- my info / Pic -->
      <div class="fixed">
        <FixedAbout :theme :icons />
      </div>
      <!-- Elevator pitch / pro-exp / tech-exp / projects / connect -->
      <div class="scroll">
        <div class="about">
          <About />
        </div>
        <div class="experience">
          <Experience />
        </div>
        <div class="projects">
          <Projects />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import FixedAbout from './components/Fixed-About.vue'
import About from './components/About-me.vue'
import Experience from './components/Experience.vue'
import Projects from './components/Projects.vue'

import switchLight from '@/assets/darkpng.png'
import switchDark from '@/assets/lightpng.png'

import gitLight from '@/assets/github-l.png'
import gitDark from '@/assets/github-d.png'

import inLight from '@/assets/in-l.png'
import inDark from '@/assets/in-l.png'

import mailLight from '@/assets/gmail-l.png'
import mailDark from '@/assets/gmail-d.png'

import phoneLight from '@/assets/phone-l.png'
import phoneDark from '@/assets/phone-d.png'
export default {
  components: {
    FixedAbout,
    About,
    Experience,
    Projects
  },
  data() {
    return {
      theme: localStorage.getItem('theme') || 'light',
      icons: {
        png: localStorage.getItem('png') || switchLight,
        gitHub: localStorage.getItem('gitHub') || gitLight,
        linkedIn: localStorage.getItem('linkedIn') || inLight,
        gmail: localStorage.getItem('gmail') || mailLight,
        phone: localStorage.getItem('phone') || phoneLight
      }
    }
  },
  mounted() {
    // Apply the saved theme or the default when the component is mounted
    document.documentElement.setAttribute('data-theme', this.theme)
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      this.icons.png = this.getThemePng() === switchLight ? switchDark : switchLight
      this.icons.gitHub = this.getGitPng()
      this.icons.linkedIn = this.getInPng()
      this.icons.gmail = this.getGmailPng()
      this.icons.phone = this.getPhonePng()
      this.setDocToCurrent()
      this.setLocalStorage()
    },
    setDocToCurrent() {
      document.documentElement.setAttribute('data-theme', this.theme)
    },
    setLocalStorage() {
      localStorage.setItem('theme', this.theme)
      localStorage.setItem('png', this.icons.png)
      localStorage.setItem('gitHub', this.icons.gitHub)
      localStorage.setItem('linkedIn', this.icons.linkedIn)
      localStorage.setItem('gmail', this.icons.gmail)
      localStorage.setItem('phone', this.icons.phone)
    },
    getThemePng() {
      return this.theme === 'light' ? switchDark : switchLight
    },
    getGitPng() {
      return this.theme === 'light' ? gitLight : gitDark
    },
    getInPng() {
      return this.theme === 'light' ? inLight : inDark
    },
    getGmailPng() {
      return this.theme === 'light' ? mailLight : mailDark
    },
    getPhonePng() {
      return this.theme === 'light' ? phoneLight : phoneDark
    }
  }
}
</script>

<style scoped>
/* main Wrapper */
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  color: var(--text-color);
}
/* content container carries my fixed and scroll */
.container {
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.fixed,
.scroll {
  width: 48%;
}

.fixed {
  position: sticky;
  top: 50px;
}

.scroll {
  display: grid;
  gap: 20px;
}
.theme-btn {
  height: 40px;
  position: fixed;
  right: 25px;
  top: 25px;
  cursor: pointer;
  transition:
    opacity 0.3s ease,
    height 0.3s ease;
  box-shadow:
    0 0 5px var(--hover-color),
    /* Outer glow */ 0 0 15px rgba(255, 255, 255, 0.6); /* Softer, spread-out glow */
  box-shadow: 0 0 5px var(--hover-color);
  transition: box-shadow 0.3s ease;
  border-radius: 100%;
}
.theme-btn:hover {
  transition: scale(1.1);
  box-shadow:
    0 0 20px 10px var(--accent-color),
    0 0 60px rgba(255, 255, 255, 0.8);
}
/* Mobile */
@media (max-width: 767px) {
  /* Styles for mobile devices */
  .container {
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    align-items: flex-start;
    padding: 0;
  }
  .fixed,
  .scroll {
    padding: 0;
    text-align: left;
    width: 100%;
  }
  .fixed {
    position: static;
  }
  .scroll {
    margin: 0;
  }
}
</style>
