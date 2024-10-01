<template>
  <!-- I want this png to also expand the background color@click -->
  <img class="theme-btn" @click="toggleTheme" :src="icons.png" alt="dark-light" />
  <!-- im adding wrapper to make main fit 80vw in mobile views -->
  <div class="container">
    <main id="main" class="wrapper">
      <!-- my info / Pic -->
      <div v-if="myData" id="sticky">
        <Sticky-About :myData="this.myData" :theme :icons />
      </div>
      <div class="sticky" v-else>
        <div class="loader loader--style7" title="6">
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="24px"
            height="30px"
            viewBox="0 0 24 30"
            style="enable-background: new 0 0 50 50"
            xml:space="preserve"
          >
            <rect x="0" y="0" widt="4" height="20" fill="#333">
              <animate
                attributeName="opacity"
                attributeType="XML"
                values="1; .2; 1"
                begin="0s"
                dur="0.6s"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="7" y="0" width="4" height="20" fill="#333">
              <animate
                attributeName="opacity"
                attributeType="XML"
                values="1; .2; 1"
                begin="0.2s"
                dur="0.6s"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="14" y="0" width="4" height="20" fill="#333">
              <animate
                attributeName="opacity"
                attributeType="XML"
                values="1; .2; 1"
                begin="0.4s"
                dur="0.6s"
                repeatCount="indefinite"
              />
            </rect>
          </svg>
        </div>
      </div> 

      <!-- Elevator pitch / pro-exp / tech-exp / projects / connect -->
      <div id="scroll">
        <div id="about">
          <ElPitch :myData="this.myData" />
        </div>
        <div id="experience">
          <h1>Experience</h1>
          <Experience v-for="(item, index) in myData.work"
                      :key="index"
                      :item="item"
                      :expo
                      :promoted />
        </div>
        <div id="projects">
          <Projects :expo />
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import StickyAbout from './components/Sticky-About.vue'
import ElPitch from './components/El-Pitch.vue'
import Experience from './components/My-Experience.vue'
import Projects from './components/My-Projects.vue'

import switchLight from '@/assets/darkpng.png'
import switchDark from '@/assets/lightpng.png'

import gitLight from '@/assets/github.png'
import gitDark from '@/assets/github-d.png'

import inLight from '@/assets/linkedin.png'
import inDark from '@/assets/linkedin-d.png'

import mailLight from '@/assets/gmail.png'
import mailDark from '@/assets/gmail-d.png'

import phoneLight from '@/assets/phone.png'
import phoneDark from '@/assets/phone-d.png'

import expo from '@/assets/export.png'
import promoted from '@/assets/promoted.png'
import ResumeService from './Services/ResumeService'
import { ref } from 'vue' 

export default {
  components: {
    StickyAbout,
    ElPitch,
    Experience,
    Projects
  },
  data() {
    return {
      expo: expo,
      promoted: promoted,
      theme: localStorage.getItem('theme') || 'light',
      icons: {
        png: localStorage.getItem('png') || switchLight,
        gitHub: localStorage.getItem('gitHub') || gitLight,
        linkedIn: localStorage.getItem('linkedIn') || inLight,
        gmail: localStorage.getItem('gmail') || mailLight,
        phone: localStorage.getItem('phone') || phoneLight,
      },
      myData: ref({}),
    }
  },

  methods: {
    getProfile() {
      ResumeService.resume()
        .then((response) => {
          const data = response.data;
          this.myData = data;
          console.log(this.myData);
        })
        .catch((error) => {
          console.error('Error retrieving profile:', error)
        })
    },
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
  },
  mounted() {},
  created() {
    document.documentElement.setAttribute('data-theme', this.theme)
    this.getProfile()
  }
}
</script>

<style scoped>
/* Mobile settings */
.container {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
}
#main {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
}

#scroll {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4rem;
  margin: 0 15px;
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
#loading {
  height: 100vh;
  font: red 26px;
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
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: start;
    gap: 3rem;
    width: 90%;
  }

  #sticky,
  #scroll {
    top: 45px;
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
