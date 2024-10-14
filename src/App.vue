<template>
  
  <transition name="fade" class="contact">
    <Contact v-if="showContact" @toggleContact="toggleContact" @handleData="handleData"/>
  </transition>
  <!-- I want this png to also expand the background color@click -->
  <div :class="['switch', { 'switch-on': isSwitchOn }]">
    <div class="switch__1">
      <input id="switch-1" type="checkbox" v-model="isSwitchOn" @click="toggleTheme" />
      <label for="switch-1"></label>
    </div>
  </div>
  <!-- im adding wrapper to make main fit 80vw in mobile views -->
  <div class="container"  v-if="myData">
    <main id="main" class="wrapper">
      <!-- my info / Pic -->
      <div id="sticky">
        <Sticky-About :myData="this.myData" :theme :icons @toggleContact="toggleContact" />
      </div>
      <!-- Elevator pitch / pro-exp / tech-exp / projects / connect -->
      <div id="scroll">
        <div id="about" class="hidden">
          <About/>
        </div>
        <!-- skills -->
        <div id="skills" class="hidden">
          <Skills :mydata="this.myData" />
        </div>
        <!-- work -->
        <div id="experience" class="hidden">
          <Experience
            v-for="(item, index) in myData.work"
            :key="index"
            :item="item"
            :expo
            :promoted
          />
        </div>
        <!-- wrojects -->
        <div id="projects" class="hidden">
          <MyProjects v-for="(item, index) in myData.projects" :key="index" :item="item" :expo />
        </div>
      </div>
    </main>
  </div>
  <div class="load" v-else>
    <hr />
    <hr />
    <hr />
    <hr />
  </div>
</template>

<script>
import StickyAbout from './components/Sticky-About.vue'
import About from './components/About-Me.vue'
import Experience from './components/My-Experience.vue'
import MyProjects from './components/My-Projects.vue'
import Contact from './components/Contact-Me.vue'
import Skills from './components/My-Skills.vue'

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
    About,
    Skills,
    Experience,
    MyProjects,
    Contact
  },
  data() {
    return {
      theme: localStorage.getItem('theme') || 'light',
      isSwitchOn: localStorage.getItem('isSwitchOn') === 'true',
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
      observer: null,
      showContact: false,
      status: "",
      body:{}
    }
  },

  methods: {
    getProfile() {
      ResumeService.resume()
        .then((response) => {
          this.myData = response.data
          console.log(this.myData)
        })
        .catch((error) => {
          console.error('Error retrieving profile:', error)
        })
    },
    handleData(contactData){
      this.body = contactData
      this.sendEmail(this.body)
    },
    sendEmail(data){
      if(!data || !data.email){
        console.log("error occor recieving data")
      }
      ResumeService.Email(data)
      .then((response) => {
        this.status = response.status
        if(this.status === 200){
          alert('email sent')
          this.toggleContact()
        }
        else{
          alert('email not sent')
          this.toggleContact()
        }
        console.log(`these are the data: ${JSON.stringify(response.data, null, 2)}`);
      })
      .catch((error) => {
          console.error('Error Sending Email:', error)
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
    },
    toggleContact() {
      this.showContact = !this.showContact;
      console.log('i changed showContact to: '+ this.showContact)
    }
  },
  created() {

    this.setDocToCurrent()
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
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-in;
}
.fade-enter, .fade-leave-to {
  /* Starting/ending state for fade */
  transition: opacity 0.5s ease-out;

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

  #scroll {
    top: 3rem;
  }

  #sticky {
    top: 3rem;
    position: sticky;
  }

  #scroll {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10rem;
    position: relative;
  }


  .load {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /*change these sizes to fit into your project*/
    width: 100px;
    height: 100px;
  }
  .load hr {
    border: 0;
    margin: 0;
    width: 40%;
    height: 40%;
    position: absolute;
    border-radius: 50%;
    animation: spin 2s ease infinite;
  }

  .load :first-child {
    background: #19a68c;
    animation-delay: -1.5s;
  }
  .load :nth-child(2) {
    background: #f63d3a;
    animation-delay: -1s;
  }
  .load :nth-child(3) {
    background: #fda543;
    animation-delay: -0.5s;
  }
  .load :last-child {
    background: #193b48;
  }

  @keyframes spin {
    0%,
    100% {
      transform: translate(0);
    }
    25% {
      transform: translate(160%);
    }
    50% {
      transform: translate(160%, 160%);
    }
    75% {
      transform: translate(0, 160%);
    }
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
