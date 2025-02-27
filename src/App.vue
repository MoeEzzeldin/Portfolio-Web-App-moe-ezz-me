<template>
  <transition name="fade">
    <Contact v-if="showContact" @toggleContact="toggleContact" @handleData="handleData"/>
  </transition>
  <!-- we applying switch here as a default and it switches to switch-on when isSwitchOn.value changes-->
  <div :class="['switch', { 'switch-on': isSwitchOn }]">
    <div class="switch__1">
      <input id="switch-1" type="checkbox" v-model="isSwitchOn" @click="toggleTheme" />
      <label for="switch-1"></label>
    </div>
  </div>
  <div class="container">
    <main id="main" class="wrapper">
      <div id="sticky" class="hidden">
        <mainInfo :myData="this.myData" :theme :icons :activeNav @toggleContact="toggleContact" />
      </div>
      <div id="scroll">
        <div id="about" class="hidden">
          <About/>
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
        <div class="resume">
          <a :href="resumeURL" target="_blank">View Resume <i class="fi fi-br-download"></i></a>
        </div>
        <!-- wrojects -->
        <div id="projects" class="hidden">
          <MyProjects v-for="(item, index) in myData.projects" :key="index" :item="item" :expo />
        </div>
      </div>
    </main>
  </div>

</template>

<script>

import { ref } from 'vue'
//components
import mainInfo from './components/Main-Info.vue'
import About from './components/About-Me.vue'
import Experience from './components/My-Experience.vue'
import MyProjects from './components/My-Projects.vue'
import Contact from './components/Contact-Me.vue'
// import MySkills from './components/My-Skills.vue'    // to be continued

//Icons based on theme.    i need to check if im still using these because i have a color switcher now.
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
//services to get data from DDB
import ResumeService from './Services/ResumeService'

export default {
  components: {
    mainInfo,
    About,
    // MySkills,   // to be continued
    Experience,
    MyProjects,
    Contact,
  },
  data() {
    return {
      // get theme data for users whom have visited before or default Light theme
      theme: localStorage.getItem('theme') || 'light',
      isSwitchOn: localStorage.getItem('isSwitchOn') === 'true',
      icons: {
        gitHub: localStorage.getItem('gitHub') || gitLight,
        linkedIn: localStorage.getItem('linkedIn') || inLight,
        gmail: localStorage.getItem('gmail') || mailLight,
        phone: localStorage.getItem('phone') || phoneLight
      },
      myData: ref({}),
      expo: expo, // imported
      promoted: promoted, // imported
      hiddenElements: document.querySelectorAll('.hidden'), // selects main sections in my portfolio to applay fade in effect using interceptor
      observer: null, // observer to watch for elements to fade in
      showContact: false, // toggles Contact form for users to send me an email SES service
      loader: ref(false), // loader to show while fetching data from DDB
      status: "", // status of email sent to display alert sent or complete form
      body:{}, // body of email to send
      activeNav: "", // active nav to highlight the current section in the nav based on user scrolls 
      resumeURL: import.meta.env.VITE_DOWNLOAD_URL,
    }
  },

  methods: {
    // axios calls are declaired in my service class to get resume object from DDB
    getProfile() {
      ResumeService.resume()
        .then((response) => {
          this.myData = response.data
        })
        .catch((error) => {
          console.error('Error retrieving profile:', error)
        })
    },
    
    //handle data from contact form, then pass to service method
    handleData(contactData){
      this.body = contactData
      this.sendEmail(this.body)
    },
    // send contact form data to SES service for lambda to operate on it
    sendEmail(data){
      if(!data || !data.email){
        console.log("error occor recieving data")
        return;
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
        // console.log(`these are the data: ${JSON.stringify(response.data, null, 2)}`);
      })
      .catch((error) => {
          console.error('Error Sending Email:', error)
        })
    },
    //asign local variables to the current theme and icons from viewer browser
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
    //set the page doc theme to the current theme
    setDocToCurrent() {
      document.documentElement.setAttribute('data-theme', this.theme)
    },
    //set local storage to the current theme and icons for the viewer
    setLocalStorage() {
      localStorage.setItem('theme', this.theme)
      localStorage.setItem('isSwitchOn', this.isSwitchOn)
      localStorage.setItem('gitHub', this.icons.gitHub)
      localStorage.setItem('linkedIn', this.icons.linkedIn)
      localStorage.setItem('gmail', this.icons.gmail)
      localStorage.setItem('phone', this.icons.phone)
    },
    // set png to light or dark based on theme
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
    // toggle contact form
    toggleContact() {
      this.showContact = !this.showContact;
    },
  },
  created() {
    // we getting profile data from DDB once the component is created as well as setting theme for viewer first thing when they call the page
    this.getProfile()
    this.setDocToCurrent()
  },
  
  mounted() {
  // Observer callback with adjusted rootMargin
  this.observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          this.activeNav = entry.target.id;
        } else {
          entry.target.classList.remove('show');
        }
      });
    },
    { rootMargin: '0px 0px -20% 0px' }
  );

  // Observe all hidden sections
  const hiddenSections = document.querySelectorAll('.hidden');
  hiddenSections.forEach((section) => this.observer.observe(section));

  // const firstSection = hiddenSections[0];
  // if (firstSection && window.scrollY === 0) {
  //   firstSection.classList.add('show');
  //   this.activeNav = firstSection.id;
  // }
}


}
</script>

<style scoped>
/* Mobile styling */

.hidden {
  opacity: 0;
  transition: 0.8s ease-in;
}
.show {
  opacity: 1;
  transition: 0.8s ease-in;

}
.fade-in-enter-active, .fade-in-leave-active {
  transition: opacity 0.5s ease-in;
}
.fade-in-enter, .fade-in-leave-to {
  opacity: 0;
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
}
#sticky {
  top: 3rem;
  position: relative;
}

#projects {
  margin-top: 2.5rem;
}

/* nav ul li a.active {
  transform: scale(1.3);
  background: linear-gradient(to right, rgb(255, 89, 0), rgb(255, 204, 0));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
} */

.resume {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--card-title);
  transition: opacity 0.6s ease;  
}

#loading {
  height: 100vh;
  font: red 26px;
}
#about {
height: auto;
margin-bottom: 2rem;
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

}
@media (orientation: landscape) {
  .main {
    gap: 2rem;
    height: auto;
  }
  #scroll {
    gap: 10rem;
  }
}
</style>
