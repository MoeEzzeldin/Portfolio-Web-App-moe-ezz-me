<template>
  <!-- I want this png to also expand the background color@click -->
  <img class="theme-btn" @click="toggleTheme" :src="icons.png" alt="dark-light" />
  <!-- im adding wrapper to make main fit 80vw in mobile views -->
  <main id="main" class="wrapper">
    <!-- my info / Pic -->
    <div id="sticky">
      <Sticky-About :theme :icons />
    </div>
    <!-- Elevator pitch / pro-exp / tech-exp / projects / connect -->
    <div id="scroll">
      <div id="about">
        <ElPitch />
      </div>
      <div id="experience">
        <Experience :expo :arrow />
      </div>
      <div id="projects">
        <Projects :expo />
      </div>
    </div>
  </main>
</template>
<script>
import StickyAbout from './components/Sticky-About.vue'
import ElPitch from './components/El-Pitch.vue'
import Experience from './components/My-Experience.vue'
import Projects from './components/My-Projects.vue'

import switchLight from '@/assets/darkpng.png'
import switchDark from '@/assets/lightpng.png'

import gitLight from '@/assets/github-l.png'
import gitDark from '@/assets/github-l.png'

import inLight from '@/assets/linkedin.png'
import inDark from '@/assets/linkedin.png'

import mailLight from '@/assets/gmail-d.png'
import mailDark from '@/assets/gmail-d.png'

import phoneLight from '@/assets/phone.png'
import phoneDark from '@/assets/phone.png'

import expo from '@/assets/export.png'
import arrow from '@/assets/right-arrow.png'

export default {
  components: {
    StickyAbout,
    ElPitch,
    Experience,
    Projects
  },
  data() {
    return {
      arrow: arrow,
      expo: expo,
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
/* Mobile settings */
#main {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
/* devided the width on my sticky and scroll wraps*/
#main main > *:not(:last-child) {
  padding-left: 25px;
}

#scroll {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
}

.theme-btn {
  height: 40px;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  /* fix effect */
  transition:
    opacity 0.3s ease,
    height 0.3s ease;
  box-shadow:
    0 0 5px var(--hover-color),
    0 0 5px rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 5px var(--hover-color);
  transition: box-shadow 0.3s ease;
  border-radius: 100%;
  z-index: 100;
}

.theme-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 0 10px 5px var(--shadow-color);
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
  /* CSS rules for tablets */
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) {
  /* CSS rules for tablets */
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  /* CSS rules for desktops */
  #main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: start;
    gap: 2rem;
    width: 95%;
  }
  /* devided the width on my sticky and scroll wraps*/
  #main main > *:not(:last-child) {
    padding-left: 40px;
  }
  #sticky,
  #scroll {
    top: 20px;
  }
  #sticky {
    position: sticky;
  }

  #scroll {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
    position: relative;
  }

  #about {
    height: 95vh;
  }

  .theme-btn {
    height: 40px;
    position: fixed;
    right: 15px;
    top: 15px;
    cursor: pointer;
    /* fix effect */
    transition:
      opacity 0.3s ease,
      height 0.3s ease;
    box-shadow:
      0 0 5px var(--hover-color),
      0 0 5px rgba(255, 255, 255, 0.6);
    box-shadow: 0 0 5px var(--hover-color);
    transition: box-shadow 0.3s ease;
    border-radius: 100%;
    z-index: 100;
  }

  .theme-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 0 10px 5px var(--shadow-color);
  }
}
</style>
