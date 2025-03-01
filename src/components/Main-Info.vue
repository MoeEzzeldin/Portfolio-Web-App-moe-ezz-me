<template>
  <main class="main">
    <!-- Hero section with name and intro -->
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
    
    <!-- Navigation section -->
    <nav class="nav" role="navigation" aria-label="Main navigation">
      <ul class="list">
        <li class="holder" v-for="item in navItems" :key="item.id">
          <span :class="{ active: item.id === activeNav }"></span>
          <a 
            @click="scrollToSection(item.id)" 
            :href="`#${item.id}`"
            :class="{ active: item.id === activeNav }"
            :aria-current="item.id === activeNav ? 'page' : null">
            {{ item.label }}
          </a>
        </li>
      </ul>
    </nav>
    
    <!-- Social links footer -->
    <div class="footer">
      <div class="icons">
        <a :href="socialLinks.github" target="_blank" aria-label="GitHub Profile" rel="noopener">
          <i class="fi fi-brands-github"></i>
        </a>
        <a :href="socialLinks.linkedin" target="_blank" aria-label="LinkedIn Profile" rel="noopener">
          <i class="fi fi-brands-linkedin"></i>
        </a>
        <a @click.prevent="contactMe()" tabindex="0" aria-label="Contact Me">
          <i class="fi fi-sc-envelope"></i>
        </a>
        <a :href="socialLinks.phone" aria-label="Call me">
          <i class="fi fi-ss-phone-flip"></i>
        </a>
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
      // Navigation items - each represents a scrollable section of the portfolio
      navItems: [
        { id: 'about', label: 'About' },
        { id: 'experience', label: 'Experience' },
        { id: 'projects', label: 'Projects' }
      ],
      // Social media links stored centrally for easy updates
      socialLinks: {
        github: 'https://github.com/MoeEzzeldin',
        linkedin: 'https://www.linkedin.com/in/moe-ezz-columbus-ohio/',
        phone: 'tel:+16148169143'
      }
    }
  },

  methods: {
    // Emits event to parent component to show contact form modal
    contactMe() {
      this.$emit('toggleContact')
    },
    // Smooth scrolling implementation using native browser API
    scrollToSection(id) {
      const section = document.getElementById(id)
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
}
</script>


<style scoped>
/* 
  This is where I setup my main grid layout. I had to use auto sizing 
  instead of fixed fractions because my icons were disappearing on some
  screen sizes. By using grid-template-rows: auto auto 1fr, I make sure
  each section takes just the space it needs, with the footer getting
  the remaining space.
*/
.main {
  display: grid;
  grid-template-rows: auto auto 1fr;
  min-height: 90vh;
  gap: clamp(1.5rem, 3vh, 2.5rem);
  padding-bottom: 1rem;
  padding-left: 1rem;
}

/* 
  For the header section, I'm using flexbox to stack elements vertically.
  The gap property is super useful because it creates consistent spacing 
  that works across different screen sizes.
*/
main .header {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: clamp(0.8rem, 2vh, 1.2rem);
}

.greeting {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: clamp(0.8rem, 2vh, 1.2rem);
}

/* 
  This gradient text effect is one of my favorite tricks!
  By using background-clip: text, I can apply a gradient to just 
  the text itself rather than the whole background.
  Had to include the webkit prefix for Safari support.
*/
main .greet {
  font-weight: 500;
  background: linear-gradient(to right, rgb(255, 106, 0), blue);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

main .name {
  font-weight: 700;
  font-size: clamp(1.8rem, 5vw, 3rem);
  line-height: 1;
  margin: 0;
  color: var(--heading-color);
}

main .whomi {
  font-weight: 600;
  background: linear-gradient(to right, rgb(255, 106, 0), blue);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

main .intro {
  font-weight: 500;
  font-size: clamp(1rem, 2vw, 1.2rem);
  max-width: 510px;
}

/* 
  For the navigation section, I wanted something interactive and engaging.
  Each nav item has a line indicator that expands when you hover or when
  it's active, giving clear visual feedback to users.
*/
main .nav {
  display: flex;
  justify-content: left;
  align-items: center;
}

main .list {
  display: flex;
  flex-direction: column;
  gap: clamp(15px, 2vh, 25px);
  list-style: none;
  padding: 0;
  margin: 0;
}

main .list > * {
  display: flex;
}

main .holder {
  display: flex;
  align-items: center;
  gap: 25px;
}

/* When hovering, the line expands and gets thicker */
main .holder:hover span {
  height: 3px;
  width: 75px;
  transform: scale(1.1);
}

/* Same effect when the section is active */
main .holder span.active {
  height: 3px;
  width: 75px;
  transform: scale(1.1);
}

main .list span {
  background: linear-gradient(to right, rgb(255, 106, 0), rgb(90, 60, 240));
  height: 1px;
  width: 50px;
  transition: transform 0.3s ease, width 0.3s ease;
}

main .list a {
  text-decoration: none;
  color: var(--text-color);
  padding: 10px 0;
  transform: scale(1);
  transition: transform 0.3s ease, background 0.3s ease;
}

/* 
  When hovering over a nav item, the text scales up and gets a gradient.
  I'm really proud of this effect - it makes the navigation feel alive!
*/
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

/* 
  This footer was a pain to get right! The key is to use align-self: flex-end
  to push it to the bottom, but also ensure it stays visible.
  I had to fix how it behaves in landscape mode because the icons kept
  disappearing on my phone.
*/
.footer {
  position: relative;
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  width: 100%;
  margin-top: auto;
  padding-top: clamp(0.5rem, 2vh, 1rem);
  z-index: 5;
}

.footer .icons {
  display: flex;
  justify-content: flex-start;
  gap: clamp(15px, 3vw, 30px);
  flex-wrap: nowrap;
}

.footer .icons a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: clamp(2rem, 4vh, 2.5rem);
  width: clamp(2rem, 4vh, 2.5rem);
}

/* 
  For my social icons, I wanted them to scale nicely across devices.
  The hover effect with the transform makes them feel interactive.
*/
.footer i {
  color: var(--text-color);
  font-size: clamp(1.8rem, 4vh, 2.5rem);
  transition: transform 0.3s ease, color 0.3s ease;
  cursor: pointer;
}

.footer i:hover {
  text-shadow: var(--shadow);
  color: var(--btn-color);
  transform: translateY(-2px);
}

/* 
  Accessibility is important! These focus styles make sure keyboard
  users can navigate my site while keeping it looking good.
*/
.list a:focus-visible,
.icons a:focus-visible {
  outline: 3px solid var(--primary);
  outline-offset: 2px;
  border-radius: 4px;
}

/* 
  For responsive design, I use a mobile-first approach with targeted breakpoints.
  I prefer using clamp() and viewport units over fixed pixel sizes when possible
  so things scale smoothly between breakpoints.
*/

/* Mobile styles (base styles) */
@media (max-width: 767.98px) {
  main .name {
    font-size: clamp(1.8rem, 8vw, 2.5rem);
  }
  
  .footer .icons {
    gap: clamp(10px, 3vw, 15px);
  }
  
  .footer i {
    font-size: clamp(1.8rem, 5vh, 2rem);
  }
}

/* Tablet styles */
@media (min-width: 768px) and (max-width: 991.98px) {
  .main {
    gap: 1.5rem;
    min-height: 95vh;
    padding-left: 0;
  }
  
  .footer {
    padding-top: 0.75rem;
  }
}

/* Desktop styles */
@media (min-width: 992px) {
  .main { 
    gap: clamp(2rem, 4vh, 4rem);
    min-height: calc(95vh - 3rem);
    padding-left: 0;
  }
  
  main .name {
    font-size: clamp(2.2rem, 5vw, 3.2rem);
  }
  
  .whomi {
    font-size: clamp(1.5rem, 3vw, 2rem);
  }

  .footer .icons {
    gap: clamp(25px, 3vw, 50px);
  }
}

/* Big screens (like my 1440p monitor) */
@media (min-width: 1440px) {
  .main {
    gap: clamp(3rem, 5vh, 5rem);
    padding-left: 0;
  }
  
  main .name {
    font-size: clamp(2.8rem, 5vw, 3.5rem);
  }
  
  .whomi {
    font-size: clamp(1.8rem, 3vw, 2.2rem);
  }
  
  .footer i {
    font-size: clamp(2.2rem, 3vw, 2.8rem);
  }
}

/* 
  Handling landscape mode was super tricky! The problem was my footer icons
  were disappearing on my phone in landscape. By switching to auto rows and
  adjusting the padding/spacing, I made sure everything stays visible even
  on short screens.
*/
@media (orientation: landscape) and (max-height: 800px) {
  .main {
    grid-template-rows: auto auto auto;
    gap: clamp(0.5rem, 2vh, 1.5rem);
    min-height: auto;
    padding: clamp(1rem, 3vh, 2rem) 0;
  }
  
  main .intro {
    max-height: clamp(3rem, 15vh, 6rem);
    overflow-y: auto;
  }
  
  .footer {
    position: relative;
    margin-top: 0;
    padding-top: clamp(0.5rem, 2vh, 1rem);
  }
  
  .footer i {
    font-size: clamp(1.5rem, 5vh, 2.2rem);
  }
  
  main .list {
    gap: clamp(8px, 2vh, 15px);
  }
  
  main .name {
    font-size: clamp(1.8rem, 6vh, 2.5rem);
  }
}

/* Super small heights like on my phone in landscape */
@media (orientation: landscape) and (max-height: 500px) {
  .main {
    gap: 0.5rem;
    padding-left: 0;

  }
  
  main .intro {
    max-height: 2.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  
  .footer .icons {
    gap: 15px;
  }
  
  .footer i {
    font-size: 1.8rem;
  }
}
</style>