<template>
  <!-- Loading State - Shows while data is being fetched from AWS -->
  <div class="loader-container" v-if="loading">
    <div class="loader"></div>
  </div>

  <!-- Contact Form Model with Fade Transition -->
  <transition name="fade">
    <Contact v-if="showContact" @toggleContact="toggleContact" @handleData="handleData" />
  </transition>
  
  <!-- Theme Switch - Toggles between light and dark mode -->
  <div :class="['theme-toggle', { 'theme-toggle--active': isSwitchOn }]">
    <div class="theme-toggle__slider">
      <input id="switch-1" type="checkbox" v-model="isSwitchOn" @click="toggleTheme" />
      <label for="switch-1"></label>
    </div>
  </div>
  
  <!-- Notification System - Shows success/error messages with SES service-->
  <div v-if="notification" class="notification" :class="notificationType">
    {{ notificationMessage }}
  </div>
  
  <!-- Main Content Container -->
  <div class="container">
    <main id="portfolio-layout" class="wrapper">
      <!-- Left Column: Fixed Information (Sticky on Desktop) -->
      <div id="sidebar" class="hidden">
        <MainInfo
          :myData="myData"
          :theme="theme"
          :activeNav="activeNav"
          @toggleContact="toggleContact"
          ref="mainInfo"
        />
      </div>
      
      <!-- Right Column: Scrollable Content -->
      <div id="content-area">
        <!-- About Section -->
        <div id="about" class="hidden">
          <About />
        </div>
        
        <!-- Work Experience Section -->
        <div id="experience" class="hidden">
          <CardComponent
          type="experience"
            v-for="(item, index) in myData.work"
            :key="index"
            :item="item"
            :expo="expo"
            :promoted="promoted"
          />
        </div>
        
        <!-- Resume Download Link -->
        <div class="resume-link">
          <a :href="resumeURL" target="_blank" rel="noopener noreferrer">
            View Resume <i class="fi fi-br-download"></i>
          </a>
        </div>
        
        <!-- Projects Section -->
        <div id="projects" class="hidden">
          <CardComponent
          type="project"
            v-for="(item, index) in myData.projects"
            :key="index"
            :item="item"
            :expo="expo"
            :emptyUrlImage="s3ProgressImage"
            @handlePrivateRepo="toggleContact"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// // comment for myself
// Component names: PascalCase (e.g., MainInfo)
// Props: camelCase (e.g., myData)
// Events: kebab-case (e.g., toggle-contact)
// Methods: camelCase (e.g., toggleTheme)
// Data properties: camelCase (e.g., isSwitchOn)

// Script section unchanged
import { ref } from 'vue'

// Component Imports
import MainInfo from './components/Main-Info.vue'
import About from './components/About-Me.vue'
import Contact from './components/Contact-Me.vue'
import CardComponent from './components/CardComponent.vue'

// Asset Imports
import expo from '@/assets/export.png'
import promoted from '@/assets/promoted.png'

// API Service
import ResumeService from './Services/ResumeService'
import SES from './Services/SES'
export default {
  components: {
    MainInfo,
    About,
    Contact,
    CardComponent
  },
  
  data() {
    return {
      // UI States
      loading: true,      // Controls loader visibility
      showContact: false, // Controls contact form visibility
      notification: false, // Controls notification visibility
      notificationMessage: '',
      notificationType: 'success',
      
      // Theme Management
      theme: localStorage.getItem('theme') || 'light',
      isSwitchOn: localStorage.getItem('isSwitchOn') === 'true',
      
      // Content & Assets
      myData: ref({}),    // Portfolio content from API
      expo,               // Export icon for cards
      promoted,           // Promotion icon for cards
      resumeURL: import.meta.env.VITE_DOWNLOAD_URL,
      s3ProgressImage: import.meta.env.VITE_LOADING_URL,

      
      // Navigation & Animation
      activeNav: '',      // Currently visible section for highlighting nav
      observer: null,     // IntersectionObserver for scroll animations
    }
  },

  methods: {
    /**
     * Data & API gateway Methods
     * ==================
     */
    
    /**
     * Fetches portfolio data from DynamoDB using API Gateway
     * Shows loader during fetch and handles error states
     */
    getPortfolio() {
      this.loading = true
      ResumeService.resume()
        .then((response) => {
          this.myData = response.data
          this.loading = false
        })
        .catch((error) => {
          console.error('Error retrieving profile:', error)
          this.loading = false
          this.showNotification('Failed to load profile data', 'error')
        })
    },
    
    /**
     * Processes data from contact form and sends email
     * @param {Object} contactData - Form data from contact component
     */
    handleData(contactData) {
      this.sendEmail(contactData)
    },
    
    /**
     * Sends email through AWS SES via Lambda function
     * Shows appropriate notification based on result
     * @param {Object} data - Email form data
     */
    sendEmail(data) {
      if (!data || !data.email) {
        this.showNotification('Please complete the form', 'error')
        return
      }
      
      SES.Email(data)
        .then((response) => {
          if (response.status === 200) {
            this.showNotification('Email sent successfully!', 'success')
            this.toggleContact()
          } else {
            this.showNotification('Failed to send email. Please try again.', 'error')
          }
        })
        .catch((error) => {
          console.error('Error Sending Email:', error)
          this.showNotification('Error sending email. Please try again.', 'error')
        })
    },
    
    /**
     * UI & Theme Methods
     * =================
     */
    
    /**
     * Displays notification with auto-dismiss after 3s
     * @param {string} message - Message to display
     * @param {string} type - 'success' or 'error'
     */
    showNotification(message, type = 'success') {
      this.notificationMessage = message
      this.notificationType = type
      this.notification = true

      // Auto-hide after 3 seconds
      setTimeout(() => {
        this.notification = false
      }, 3000)
    },
    
    /**
     * Toggles contact form visibility
     */
    toggleContact() {
      this.showContact = !this.showContact
    },
    
    /**
     * Theme Management Methods
     * =======================
     */
    
    /**
     * Toggles between light and dark themes
     * Updates document attributes and localStorage
     */
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      this.isSwitchOn = !this.isSwitchOn
      this.setDocToCurrent()
      this.setLocalStorage()
    },
    
    /**
     * Updates document theme attribute
     */
    setDocToCurrent() {
      document.documentElement.setAttribute('data-theme', this.theme)
    },
    
    /**
     * Saves theme preferences to localStorage
     */
    setLocalStorage() {
      localStorage.setItem('theme', this.theme)
      localStorage.setItem('isSwitchOn', this.isSwitchOn)
    }
  },
  
  /**
   * Lifecycle Hooks
   * ==============
   */
  
  created() {
    // Initialize data and theme
    this.getPortfolio()
    this.setDocToCurrent()
  },

  mounted() {
    /**
     * Sets up IntersectionObserver for scroll animations
     * - Adds 'show' class to elements when scrolled into view
     * - Updates activeNav state for navigation highlighting
     * - rootMargin ensures elements are visible before triggering
     */
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show')
            this.activeNav = entry.target.id
          } else {
            entry.target.classList.remove('show')
          }
        })
      },
      { rootMargin: '0px 0px -20% 0px' }
    )

    // Apply observer to all sections with 'hidden' class
    const hiddenElements = document.querySelectorAll('.hidden')
    hiddenElements.forEach((section) => this.observer.observe(section))
  },
  
  beforeUnmount() {
    // Clean up observer to prevent memory leaks
    if (this.observer) {
      this.observer.disconnect()
    }
  }
}
</script>

<style scoped>
/***************************************
 * LAYOUT & STRUCTURE
 ***************************************/

/**
 * Main Container & Grid Layout
 * - Uses CSS Grid for two-column layout on desktop
 * - Switches to single column on mobile/tablet
 */

.container {
  display: flex;
  align-items: flex-start; /* Allows sticky positioning to work properly */
  justify-content: center;
  width: 90%;
  max-width: 1600px; /* Prevent excessive width on ultra-wide screens */
  margin: 0 auto;
  height: 100vh; /* Set exact viewport height */
}

#portfolio-layout {
  display: grid;
  grid-template-columns: 1fr;
  align-items: flex-start;
  justify-content: center;
  gap: clamp(2rem, 4vw, 4rem); /* Responsive gap that scales with viewport */
  width: 90%;
}

/**
 * Sticky Sidebar Implementation
 * - Uses position:sticky to keep element in viewport while scrolling
 * - For mobile/tablet: falls back to position:relative
 */
#sidebar {
  position: relative;
  top: max(3rem, 5vh); /* More responsive positioning */
  height: max-content; /* Prevent stretching */
  align-self: flex-start; /* Align to top of container */
}

/**
 * Scrollable Content Area
 * - Flex layout for vertical content sections
 * - Gap provides consistent spacing between sections
 */
#content-area {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  /* gap: clamp(4rem, 8vw, 10rem); */
}

/***************************************
 * SECTION-SPECIFIC STYLES
 ***************************************/

#projects {
  margin-top: 2.5rem;
}

#about {
  height: auto;
  margin-bottom: 2rem;
}

/**
 * Resume Button Styling
 * - Centered design with download icon
 * - Uses theme colors for consistency
 */
.resume-link {
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

.resume-link a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--card-title);
  text-decoration: none;
  transition: color 0.4s ease;
  min-height: 44px; /* Better touch target for mobile */
}

/***************************************
 * THEME SWITCH
 ***************************************/

/**
 * Theme Switch Styling
 * - Fixed position in top-right corner
 * - Custom slider design with animation
 * - Different colors for light/dark states
 */
.theme-toggle {
  position: absolute;
  right: 2rem;
  top: 2rem;
  z-index: 10;
  cursor: pointer;
}

.theme-toggle input {
  display: none;
}

.theme-toggle__slider {
  width: 5rem;
}

.theme-toggle__slider label {
  display: flex;
  align-items: center;
  width: 100%;
  height: 2.5rem;
  box-shadow:
    0.3rem 0.3rem 0.6rem var(--greyLight-2),
    -0.2rem -0.2rem 0.5rem var(--white);
  background: transparent;
  position: relative;
  cursor: pointer;
  border-radius: 1.6rem;
  min-height: 44px; /* Better touch target for mobile */
}

/* Switch toggle indicator */
.theme-toggle__slider label::after {
  content: '';
  position: absolute;
  left: 0.4rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: var(--greyDark);
  transition: all 0.4s ease;
}

.theme-toggle__slider label::before {
  content: '';
  width: 100%;
  height: 100%;
  border-radius: inherit;
  opacity: 0;
  transition: all 0.4s ease;
}

/* Toggle states */
.theme-toggle input:checked ~ label::before {
  opacity: 1;
}

.theme-toggle input:checked ~ label::after {
  left: 55%;
  background: var(--greyLight-1);
}

/***************************************
 * NOTIFICATION SYSTEM
 ***************************************/

/**
 * Notification Component 
 * - Fixed position at bottom of screen
 * - Different styling for success/error states
 * - Animated entrance/exit
 */
.notification {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 20px;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  z-index: 1000;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s forwards;
}

.notification.success {
  background-color: var(--btn-hover);
}

.notification.error {
  background-color: #f44336;
}

@keyframes slideUp {
  from {
    transform: translate(-50%, 20px);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}

/***************************************
 * ANIMATIONS & TRANSITIONS
 ***************************************/

/**
 * Fade-in animation for sections
 * - Elements start invisible with .hidden class
 * - IntersectionObserver adds .show class when scrolled into view
 * - Creates smooth reveal effect when scrolling
 */
.hidden {
  opacity: 0;
  transition: 0.8s ease-in;
}

.show {
  opacity: 1;
  transition: 0.8s ease-in;
}

/**
 * Modal transition for contact form
 * - Controls fade in/out of the modal
 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/***************************************
 * LOADER ANIMATION
 ***************************************/

/**
 * Loading Indicator
 * - Shows during data fetching
 * - Uses complex animation with multiple elements
 * - Colors match theme palette
 */
.loader-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--background-color);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loader {
  position: relative;
  width: 2.5em;
  height: 2.5em;
  transform: rotate(165deg);
}

.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 0.5em;
  height: 0.5em;
  border-radius: 0.25em;
  transform: translate(-50%, -50%);
}

.loader:before {
  animation: before 2s infinite;
}

.loader:after {
  animation: after 2s infinite;
}

@keyframes before {
  0% {
    width: 0.5em;
    box-shadow:
      1em -0.5em hsla(337, 84%, 48%, 0.75),
      -1em 0.5em hsla(190, 61%, 65%, 0.75);
  }
  35% {
    width: 2.5em;
    box-shadow:
      0 -0.5em hsla(337, 84%, 48%, 0.75),
      0 0.5em hsla(190, 61%, 65%, 0.75);
  }
  70% {
    width: 0.5em;
    box-shadow:
      -1em -0.5em hsla(337, 84%, 48%, 0.75),
      1em 0.5em hsla(190, 61%, 65%, 0.75);
  }
  100% {
    box-shadow:
      1em -0.5em hsla(337, 84%, 48%, 0.75),
      -1em 0.5em hsla(190, 61%, 65%, 0.75);
  }
}

@keyframes after {
  0% {
    height: 0.5em;
    box-shadow:
      0.5em 1em hsla(160, 50%, 48%, 0.75),
      -0.5em -1em hsla(41, 82%, 52%, 0.75);
  }
  35% {
    height: 2.5em;
    box-shadow:
      0.5em 0 hsla(160, 50%, 48%, 0.75),
      -0.5em 0 hsla(41, 82%, 52%, 0.75);
  }
  70% {
    height: 0.5em;
    box-shadow:
      0.5em -1em hsla(160, 50%, 48%, 0.75),
      -0.5em 1em hsla(41, 82%, 52%, 0.75);
  }
  100% {
    box-shadow:
      0.5em 1em hsla(160, 50%, 48%, 0.75),
      -0.5em -1em hsla(41, 82%, 52%, 0.75);
  }
}

/***************************************
 * ACCESSIBILITY
 ***************************************/

/**
 * Focus Styles & Accessibility
 * - Clear focus indicators for keyboard navigation
 * - Proper touch targets for mobile interactions
 * - Respect reduced motion preferences
 */
a:focus,
button:focus,
input:focus {
  outline: 3px solid var(--primary);
  outline-offset: 2px;
}

/* Respect reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .hidden,
  .show {
    transition-duration: 0.1s !important;
  }
  
  .theme-toggle__slider label::after {
    transition: none !important;
  }
  
  .loader:before,
  .loader:after {
    animation-duration: 0.01ms !important;
  }
}

/***************************************
 * RESPONSIVE DESIGN
 ***************************************/

/**
 * Mobile-First Responsive Design
 * - Base styles are for mobile
 * - Enhanced layouts for larger screens
 * - Adjusts grid, sticky behavior, and spacing
 */

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
  #portfolio-layout {
    grid-template-columns: 1fr;
    max-width: 720px; /* Constrain width on tablets */
  }

  #sidebar {
    position: relative; /* No sticky on tablets */
    margin-bottom: 2rem;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  #portfolio-layout {
    grid-template-columns: 1fr 1fr; /* Two-column layout */
    align-items: start;
    gap: 3rem;
  }

  #sidebar {
    position: sticky; /* Enable sticky on desktop */
    top: 3rem;
  }

  #content-area {
    gap: 8rem; /* More spacing between sections */
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  #portfolio-layout {
    gap: 4rem;
  }

  #content-area {
    gap: 10rem; /* Even more spacing on large screens */
  }
}

/* Landscape orientation adjustments */
@media (orientation: landscape) and (max-height: 600px) {
  #portfolio-layout {
    height: auto;
  }
  
  #content-area {
    gap: 5rem; /* Less vertical spacing in landscape */
  }
  
  #sidebar {
    /* Fix for mobile landscape mode */
    height: auto;
    max-height: 80vh;
  }
}

@media (orientation: landscape) {
  .theme-toggle {
    position: fixed;
  }
}
</style>