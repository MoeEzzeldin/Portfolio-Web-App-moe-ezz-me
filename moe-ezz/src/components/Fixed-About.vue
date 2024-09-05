<template>
  <main>
    <section>
      <img class="theme-btn" @click="toggleTheme" :src="png" alt="dark-light" />
      <h3>Hi, my name is...</h3>
      <h1>Moe Ezzeldin</h1>
      <h2>Junior Developer && Cloud Eng</h2>
      <p>
        I use my creativity and love for learning to build cool interactive web designs with
        .................... ............... <a href="">blach blah blah</a> and that you know blah
        blah blah
      </p>
    </section>
    <!-- Nav -->
    <nav class="nav">
      <ul>
        <li>
          <a href="#About"><span></span>About</a>
        </li>
        <li>
          <a href="#Pro-exp"><span></span>Experience</a>
        </li>
        <li>
          <a href="#Projects"><span></span>Projects</a>
        </li>
        <li>
          <a href="#CONNECT"><span></span>Connect</a>
        </li>
      </ul>
    </nav>
    <footer>
      <!-- Links and Icons for CONTACT -->
      <a href="https://github.com/MoeEzzeldin" target="_blank">
        <img :src="gitHub" alt="Description of Image 1" />
      </a>
      <a href="https://www.linkedin.com/in/moe-ezz-columbus-ohio/" target="_blank">
        <img :src="linkedIn" alt="" />
      </a>
      <a href="mailto:ezzeldin.mo3@gmail.com" target="_blank">
        <img :src="gmail" alt="" />
      </a>
      <a href="'tel:' + 6148169143">
        <img :src="phone" alt="phone icon" />
      </a>
    </footer>
  </main>
</template>

<script>
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
  data() {
    return {
      theme: localStorage.getItem('theme') || 'light',
      png: localStorage.getItem('png') || switchLight,
      gitHub: localStorage.getItem('gitHub') || gitLight,
      linkedIn: localStorage.getItem('linkedIn') || inLight,
      gmail: localStorage.getItem('gmail') || mailLight,
      phone: localStorage.getItem('phone') || phoneLight
    }
  },
  mounted() {
    // Apply the saved theme or the default when the component is mounted
    document.documentElement.setAttribute('data-theme', this.theme)
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      this.png = this.getThemePng() === switchLight ? switchDark : switchLight
      this.gitHub = this.getGitPng()
      this.linkedIn = this.getInPng()
      this.gmail = this.getGmailPng()
      this.phone = this.getPhonePng()
      document.documentElement.setAttribute('data-theme', this.theme)
      localStorage.setItem('theme', this.theme)
      localStorage.setItem('png', this.png)
      localStorage.setItem('gitHub', this.gitHub)
      localStorage.setItem('linkedIn', this.linkedIn)
      localStorage.setItem('gmail', this.gmail)
      localStorage.setItem('phone', this.phone)
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
main {
  font-family: 'Poppins', sans-serif;
  display: grid;
  grid-template-rows: 1fr 0.6fr 0.6fr;
  gap: 25px;
  box-sizing: border-box;
}

.theme-btn {
  height: 50px;
  position: absolute;
  left: -65px;
  top: 7px;
  cursor: pointer;
  transition: opacity 0.3s ease;
}
main h1 {
  font-weight: 700;
  font-style: normal;
  font-size: 3rem;
  line-height: 1;
}
main h3 {
  font-family: 'DotGothic16', sans-serif;
  font-weight: 400;
  font-style: normal;
  color: #4caf50;
}
main h2 {
  font-weight: 500;
  font-style: normal;
}
main p {
  font-weight: 300;
  font-style: normal;
  width:calc();
}
.nav {
  display: grid;
}
footer {
}

footer a img {
  font-weight: 400;
  font-style: normal;
  height: 50px;
  width: 50px;
}
</style>
