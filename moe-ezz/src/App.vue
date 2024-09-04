<template>
  <Main class="main">
    <!-- my info / Pic -->
    <div class="fixed">
      <FixedAbout />
    </div>
    <!-- about / exp / projects -->
    <div class="scroll">
      <ScrollInfo />
    </div>
  </Main>
</template>

<script setup>
import FixedAbout from './components/Fixed-About.vue'
import ScrollInfo from './components/Scroll-Info.vue'

//Data
const menuItems = [
  { text: 'Profile', path: '/profile', icon: 'bi bi-house-fill' },
  { text: 'Skills', path: '/skills', icon: 'bi bi-house-fill' },
  { text: 'Projects', path: '/projects', icon: 'bi bi-house-fill' },
  { text: 'About', path: '#footer', icon: 'bi bi-info-circle-fill' },
  { text: 'Contact', path: '/contact', icon: 'bi bi-person-lines-fill' }
]
const logoUrl = '../src/assets/1.png'
</script>

<style>
/* Dark Mode Palette:
Background: #1E1E1E (Very dark gray)
Primary Text: #E0E0E0 (Light gray)
Secondary Text: #B0B0B0 (Medium gray)
Accent: #4CAF50 (Green)
Light Mode Palette:
Background: #F5F5F5 (Light gray)
Primary Text: #333333 (Very dark gray)
Secondary Text: #666666 (Medium gray)
Accent: #4CAF50 (Green) */

.main {
  width: 80vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  color: wheat;
}
.fixed,
.scroll {
  padding: 60px 0 0 0;
}
.fixed {
  position: fixed;
}

.scroll {
  margin-left: 50vw;
}
p {
  width: 500px;
}
/* Mobile */
@media (max-width: 767px) {
  /* Styles for mobile devices */
  .main {
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
  .fixed,
  .scroll {
    padding: 0;
    text-align: center;
  }
  .fixed {
    position: static;
  }
  .scroll {
    margin: 0;
  }
}
</style>
