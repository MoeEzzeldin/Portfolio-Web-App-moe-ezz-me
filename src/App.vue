<template>
  <!-- I want this png to also expand the background color@click -->
  <div :class="['switch', { 'switch-on': isSwitchOn }]">
    <div class="switch__1">
      <input id="switch-1" type="checkbox" v-model="isSwitchOn" @click="toggleTheme" />
      <label for="switch-1"></label>
    </div>
  </div>
  <!-- im adding wrapper to make main fit 80vw in mobile views -->
  <div class="container">
    <main id="main" class="wrapper">
      <!-- my info / Pic -->
      <div id="sticky">
        <Sticky-About :myData="this.myData" :theme :icons />
      </div>
      <!-- Elevator pitch / pro-exp / tech-exp / projects / connect -->
      <div id="scroll">
        <div id="about" class="hidden">
          <ElPitch :myData="this.myData" />
        </div>
        <div id="experience" class="hidden">
          <h1>Experience</h1>
          <Experience
            v-for="(item, index) in myData.work"
            :key="index"
            :item="item"
            :expo
            :promoted
          />
        </div>
        <div id="projects" class="hidden">
          <h1>Projects</h1>
          <MyProjects v-for="(item, index) in myData.projects" :key="index" :item="item" :expo />
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import StickyAbout from './components/Sticky-About.vue'
import ElPitch from './components/El-Pitch.vue'
import Experience from './components/My-Experience.vue'
import MyProjects from './components/My-Projects.vue'

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
    MyProjects
  },
  data() {
    return {
      theme: localStorage.getItem('theme') || 'light',
      isSwitchOn: localStorage.getItem('isSwitchOn') === true,
      icons: {
        gitHub: localStorage.getItem('gitHub') || gitLight,
        linkedIn: localStorage.getItem('linkedIn') || inLight,
        gmail: localStorage.getItem('gmail') || mailLight,
        phone: localStorage.getItem('phone') || phoneLight
      },
      expo: expo,
      promoted: promoted,
      myData: ref({}),
      myExperience: [],
      hiddenElements: document.querySelectorAll('.hidden'),
      observer: null
    }
  },

  methods: {
    getProfile() {
      ResumeService.resume()
        .then((response) => {
          const data = response.data
          this.myData = data
          console.log(this.myData)
        })
        .catch((error) => {
          console.error('Error retrieving profile:', error)
        })
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      this.icons.gitHub = this.getGitPng()
      this.icons.linkedIn = this.getInPng()
      this.icons.gmail = this.getGmailPng()
      this.icons.phone = this.getPhonePng()
      this.isSwitchOn = !this.isSwitchOn
      this.setDocToCurrent()
      this.setLocalStorage()
    },
    setDocToCurrent() {
      document.documentElement.setAttribute('data-theme', this.theme)
    },
    setLocalStorage() {
      localStorage.setItem('theme', this.theme)
      localStorage.setItem('isSwitchOn', this.isSwitchOn)
      localStorage.setItem('gitHub', this.icons.gitHub)
      localStorage.setItem('linkedIn', this.icons.linkedIn)
      localStorage.setItem('gmail', this.icons.gmail)
      localStorage.setItem('phone', this.icons.phone)
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
    },
    getSwitch() {
      return this.isSwitchOn === true ? true : false
    }
  },
  created() {
    document.documentElement.setAttribute('data-theme', this.theme)
    this.getProfile()
  },
  mounted() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show')
        } else {
          entry.target.classList.remove('show')
        }
      })
    })

    document.querySelectorAll('.hidden').forEach((section) => {
      this.observer.observe(section)
    })
  }
}
</script>

<style scoped>
/* Mobile settings */

.hidden {
  opacity: 0;
  transition: 1s ease-in;
}
.show {
  opacity: 1;
  transition: 1s ease-in;
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
#main {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  width: 90%;
}

#scroll {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4rem;
  margin: 0 15px;
}

#loading {
  height: 100vh;
  font: red 26px;
}

.switch {
  grid-column: 1 / 2;
  display: grid;
  grid-gap: 3rem;
  justify-self: center;
  position: absolute;
  right: 1rem;
  top: 1rem;
  cursor: pointer;
}

.switch input {
  display: none;
}

.switch__1 {
  width: 5rem;
}

.switch__1 label {
  display: flex;
  align-items: center;
  width: 100%;
  height: 2.5rem;
  box-shadow:
    0.3rem 0.3rem 0.6rem var(--greyLight-2),
    -0.2rem -0.2rem 0.5rem var(--white),
    var(--inner-shadow);
  background: rgba(255, 255, 255, 0);
  position: relative;
  cursor: pointer;
  border-radius: 1.6rem;
  /* box-shadow: var(--inner-shadow); */
}

.switch__1 label::after {
  content: '';
  position: absolute;
  left: 0.4rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: var(--greyDark);
  transition: all 0.4s ease;
}

.switch__1 label::before {
  content: '';
  width: 100%;
  height: 100%;
  border-radius: inherit;

  opacity: 0;
  transition: all 0.4s ease;
}

.switch input:checked ~ label::before {
  opacity: 1;
}

.switch input:checked ~ label::after {
  left: 55%;
  background: var(--greyLight-1);
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
  
}
</style>
