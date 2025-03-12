<template>
  <article class="card" :class="[type, { show: isVisible }]">
    <!-- Project-specific background image -->
    <!-- Project-specific background image with fallback -->
    <div v-if="type === 'project'" class="background-img"
      :style="{ backgroundImage: 'url(' + (item.img || emptyUrlImage) + ')' }">
    </div>

    <header class="card-header">
      <!-- Title section with conditional elements -->
      <div class="title-section">
        <h3 class="company-name">{{ item.name }}</h3>

        <!-- Experience-specific position and promotion -->
        <template v-if="type === 'experience'">
          <p class="position-title" :class="{ 'has-promotion': item.promotion }">
            {{ item.position }}
          </p>
          <div v-if="item.promotion" class="promotion-badge">
            <img :src="promoted" :alt="'Promoted to ' + item.promotion" class="promotion-icon" />
            <span>{{ item.promotion }}</span>
          </div>
        </template>
      </div>

      <!-- Common date section -->
      <div class="date-section">
        <time>{{ item.startDate }}</time>
        <span class="date-separator">—</span>
        <time>{{ item.endDate }}</time>
      </div>

      <!-- Project-specific link handling -->
      <template v-if="type === 'project'">
        <a v-if="item.status && item.status.toLowerCase() === 'public'" :href="item.url" target="_blank" rel="noopener noreferrer"
          class="company-link" :aria-label="`Visit ${item.name} project`">
          <img :src="expo" :alt="`${item.name} logo`" class="company-logo" />
        </a>
        <a v-else-if="item.status && item.status.toLowerCase() === 'private'" @click.prevent="handlePrivateRepo" class="company-link"
          :aria-label="'Request access to private repository'">
          <img :src="expo" :alt="'Private repository' + item.name" class="company-logo" />
        </a>
      </template>

      <!-- Experience-specific company link -->
      <a v-else-if="type === 'experience' && item.url" :href="item.url" target="_blank" rel="noopener noreferrer"
        :aria-label="`Visit ${item.name} website`" class="company-link">
        <img :src="expo" :alt="`${item.name} logo`" class="company-logo" />
      </a>
    </header>

    <!-- Conditional content section -->
    <div class="card-content">
      <!-- Experience specific content (bullet points) -->
      <ul v-if="type === 'experience'" class="achievement-list" aria-label="Achievements and responsibilities">
        <li v-for="(point, index) in item.summary" :key="index" class="achievement-item">
          {{ point }}
        </li>
      </ul>

      <!-- Project specific content (description paragraph) -->
      <p v-else-if="type === 'project'" class="project-description">
        {{ item.description }}
      </p>
    </div>

    <!-- Common skills footer -->
    <footer class="skills-section">
      <h4 class="visually-hidden">Skills utilized</h4>
      <ul class="skills-list">
        <li v-for="(skill, index) in item.skills" :key="index" class="skill-tag">
          {{ skill }}
        </li>
      </ul>
    </footer>
  </article>
</template>

<script>
export default {
  name: 'CardComponent',
  props: {
    type: {
      type: String,
      required: true,
      validator: (value) => ['experience', 'project'].includes(value)
    },
    expo: {
      type: String,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
    promoted: {
      type: String,
      default: ''
    },
    emptyUrlImage: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      isVisible: false,
      observer: null
    }
  },

  mounted() {
    this.setupObserver()
  },

  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect()
    }
  },

  methods: {
    handlePrivateRepo() {
      this.$emit('handlePrivateRepo')
    },

    setupObserver() {
      this.observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          if (entry.isIntersecting) {
            this.isVisible = true
          }
        },
        {
          threshold: 0.2,
          rootMargin: '0px 0px -10% 0px'
        }
      )

      this.observer.observe(this.$el)
    }
  }
}
</script>

<style scoped>
/* 
  I'm using a single card component for both experiences and projects
  to maintain consistency. The cards start invisible and fade in
  when scrolled into view using Intersection Observer.
*/
.card {
  position: relative;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 3rem;
  box-shadow: var(--inner-shadow);
  transition:
    box-shadow 0.3s ease,
    opacity 0.5s ease;
  opacity: 0;
  transform: translateY(20px);
  min-height: 200px;
  overflow: hidden;
}

.card.show {
  opacity: 1;
  transform: translateY(0);
}

/* 
  I went with a subtle hover effect. Initially had a transform
  but it was causing layout shifts, so settled on just the shadow.
*/
.card:hover,
.card:focus-within {
  box-shadow: var(--shadow);
}

/* 
  For project cards, I added a background image that fades and blurs on hover.
  This gives a nice visual cue without making the text hard to read.
*/
.background-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
  transition: all 0.5s ease;
  border-radius: 8px;
  filter: grayscale(0.5);
  opacity: 0.15;
}

.project:hover .background-img {
  opacity: 0.08;
  filter: blur(4px) grayscale(0.7);
  transform: scale(1.05);
}

/* 
  The header layout was tricky - I needed to fit company name, position,
  dates, and a link all in a compact space. Grid gave me the most flexibility.
*/
.card-header {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas:
    'title company-link'
    'date company-link';
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  position: relative;
}

.title-section {
  grid-area: title;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 0;
}

.company-name {
  font-size: 1.1rem;
  margin: 0;
  color: var(--card-title);
  font-weight: 600;
  white-space: nowrap;
}

/* 
  I'm using separators (| pipes) to visually group related info.
  This is cleaner than using commas or other punctuation.
*/
.experience .company-name::after {
  content: ' | ';
  margin: 0 0.5rem;
  color: var(--text-color);
  opacity: 0.5;
}

.position-title {
  font-size: 1rem;
  margin: 0;
  font-weight: 500;
  white-space: nowrap;
}

.position-title.has-promotion::after {
  content: ' | ';
  margin: 0 0.5rem;
  color: var(--text-color);
  opacity: 0.5;
}

.date-section {
  grid-area: date;
  font-size: var(--font-small);
  opacity: 0.8;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

/* 
  The company link icon has a slight scale effect on hover.
  I'm using a hue-rotate filter to make all icons match my color scheme.
*/
.company-link {
  grid-area: company-link;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
  z-index: 2;
}

.company-logo {
  width: 24px;
  height: 24px;
  filter: hue-rotate(90deg) sepia(1) saturate(5) brightness(0.8);
}

/* Add animation properties to the company-link */
.card:hover .company-link .company-logo {
  animation: jump 0.6s ease 2;
  filter: hue-rotate(90deg) sepia(1) saturate(5) brightness(1);
  /* Brighten on hover */
}

@keyframes jump {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5px);
  }
}

.company-link:hover,
.company-link:focus {
  opacity: 1;
  transform: scale(1.1);
  background-color: var(--tag-color);
  /* Add subtle background */
  border-radius: 50%;
  /* Make it circular */
  padding: 3px;
  /* Add some padding */
}


.company-link:focus {
  outline: 3px solid var(--primary);
  outline-offset: 2px;
}

/* 
  I wanted promotions to stand out, so I made this nice badge
  with an icon. Had to use flexbox to align icon and text.
*/
.promotion-badge {
  display: inline-flex;
  align-items: center;
  background-color: var(--tag-color);
  border-radius: 16px;
  padding: 0.25rem 0.75rem;
  margin: 0;
  gap: 0.5rem;
  font-size: var(--font-small);
  white-space: nowrap;
}

.promotion-icon {
  height: 18px;
  width: auto;
}

/* 
  Content styling differs between experience (list) and project (paragraph)
  types, but both need good line spacing for readability
*/
.card-content {
  margin-bottom: 1.5rem;
}

.achievement-list {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin: 0;
}

.achievement-item {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.achievement-item:last-child {
  margin-bottom: 0;
}

.project-description {
  line-height: 1.6;
  margin: 0;
  padding: 0;
}

/* 
  The skills section uses a thin border to separate it from the content.
  I went with pill-shaped tags that stand out but don't overwhelm.
*/
.skills-section {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--tag-color);
}

/* Hide heading visually but keep it for screen readers */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 0;
  margin: 0;
  list-style: none;
}

.skill-tag {
  color: var(--card-title);
  background-color: var(--tag-color);
  border-radius: 25px;
  padding: 0.3rem 0.8rem;
  font-size: var(--font-small);
  font-weight: 500;
}

@keyframes jump {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5px);
  }
}

/* 
  Mobile was challenging - had to stack elements and adjust spacing.
  I removed separators because they looked weird with stacked content.
*/
@media (max-width: 767.98px) {
  .card {
    padding: 1.25rem;
    margin-bottom: 2rem;
  }

  .title-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .card-header {
    grid-template-areas:
      'title company-link'
      'date company-link';
    margin-bottom: 1rem;
  }

  .company-name {
    font-size: 1rem;
  }

  .experience .company-name::after {
    display: none;
    /* Hide separator in mobile */
  }

  .position-title.has-promotion::after {
    display: none;
    /* Hide separator in mobile */
  }

  .promotion-badge {
    margin-top: 0.5rem;
  }

  .position-title {
    font-size: 0.9rem;
  }

  .skills-list {
    justify-content: flex-start;
    gap: 0.5rem;
  }

  .skill-tag {
    padding: 0.25rem 0.6rem;
    font-size: calc(var(--font-small) - 1px);
  }
}

/* 
  I care about accessibility! Users who prefer reduced motion
  should get a simpler experience without animations.
*/
@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none !important;
  }

  .card.show {
    opacity: 1;
  }

  .background-img {
    transition: none !important;
  }

  .company-link:hover,
  .company-link:focus {
    transform: none;
  }

  .card:hover .company-link .company-logo {
    animation: none !important;
    transform: none;
  }
}
</style>