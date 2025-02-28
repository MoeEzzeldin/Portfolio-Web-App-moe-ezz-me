<template>
  <main id="projects">
    <section class="card">
      
      <template v-if="item.status === 'public'">
        <a :href="item.url" target="_blank" class="expo">
          <img class="expo" :src="expo" alt="png" />
        </a>
      </template>
      <!-- If the project is private, use a click handler to trigger the contact tip -->
      <template v-else-if="item.status === 'private'">
        <a @click.prevent="handlePrivateRepo" class="expo">
          <img class="expo" :src="expo" alt="png" />
        </a>
      </template>
      <div class="background-img" :style="{ backgroundImage: 'url(' + item.img + ')' }"></div>
      <div class="head">
        <div class="title">
          <h4>{{ item.name }}</h4>
        </div>
        <div class="date">
          <h4>{{ item.startDate }} - {{ item.endDate }}</h4>
        </div>
      </div>

        <div class="content">
          <ul class="list">
            <li class="tag">
              {{ item.description }}
            </li>
          </ul>
        </div>
        <div class="skills">
          <ul class="list">
            <li class="tag-skill" v-for="(skill, index) in item.skills" :key="index">
              {{ skill }}
            </li>
          </ul>
        </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'My-Projects',
  props: ['expo', 'item'],
  methods: {
    handlePrivateRepo() {
      this.$emit('handlePrivateRepo');
    },
  },
}
</script>

<style scoped>
.card {
  display: grid;
  grid-template-columns: 1fr;
  justify-content: space-evenly;
  position: relative;
  padding: 1rem;
  transition: all 0.5s ease;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 3rem;
  box-shadow: var(--inner-shadow);
  transition: opacity 0.6s ease;  
  min-height: 200px;
  max-height: 100%;
  gap: 1rem;
}
.head {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  gap: 0.3rem;
  margin-top: 0.6rem;
}
.card:hover {
  background-color: var(--card-background);
  backdrop-filter: blur(25px);
  box-shadow: var(--shadow);
  /* i need to decide if i want to add the borders for better visibility or not */
  /* border-top: 1px solid var(--card-title);
  border-left: 1px solid var(--card-title); */
}

.background-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  object-fit: contain;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 2;
  transition: all 0.5s ease-out;
  border-radius: 8px;
  filter: grayscale(0.5);
  box-shadow: var(--inner-shadow), var(--shadow);

}
.card:hover .background-img {
  opacity: 0.2;
  filter: blur(10px);
  transition: all 0.5s ease;
  z-index: -1;
}

.title {
  font-size: 0.9rem;
}
.card:hover  .title {
  transition: all 0.5s ease;
  color: var(--card-title);
  margin-left: 0.2rem;
}

.content {
  margin-left: 0.5rem;
}
.card .promoted {
  height: 40px;
}
.card .date {
  transition: all 0.5s ease-out;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.card .date h4 {
  transition: 0.5s ease;
  opacity: 0.5;
  font-size: var(--font-small);
}

.card:hover .date h4 {
  opacity: 1;
  margin-right: 0.5rem;
}

.card .expo {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 5px;
  right: 5px;
  cursor: pointer;
  filter: hue-rotate(90deg) sepia(1) saturate(5) brightness(0.8);
  opacity: 0;
  transition: all 0.5s ease;
  z-index: 100;
}
.card:hover .expo {
  opacity: 1;
  transition: all 0.5s ease;
}

.card .title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.5s ease;
}

.card .list {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.skills .list .tag-skill {
  color: var(--card-title);
  background-color: var(--tag-color);
  border-radius: 25px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  font-size: var(--font-small);
}

.card:hover .tag-skill {
  transition: all 0.5s ease;
  color: var(--card-title);
}
@media (min-width: 1200px) {
  .card .date {
    color: var(--text-color);
  }
  .title {
  font-size: var(--font-medium);
}
}

@media (min-width: 1440px) {
  body {
    transform: scale(1.05);
    transform-origin: top left;
  }
}
</style>
