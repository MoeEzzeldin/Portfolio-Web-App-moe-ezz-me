<template>
  <main id="projects">
    <section class="card">
      <a :href="item.url" target="_blank" class="expo">
        <img class="expo" :src="expo" alt="png" />
      </a>
      <div class="background-img" :style="{ backgroundImage: 'url(' + item.img + ')' }"></div>

      <div class="title">
        <h4>{{ item.name }}</h4>
      </div>
      <div class="date">
        <h4>{{ item.startDate }} - {{ item.endDate }}</h4>
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
  data() {
    return {}
  }
}
</script>

<style scoped>
.card {
  position: relative;
  padding: 1rem;
  transition: all 0.5s ease;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 3rem;
  box-shadow: var(--inner-shadow);
  height: 300px;
}

.background-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover; 
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

.card:hover {
  background-color: var(--card-background);
  backdrop-filter: blur(25px);
  box-shadow: var(--shadow);
  /* border-top: 1px solid var(--card-title);
  border-left: 1px solid var(--card-title); */
}
.card {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-top: 20px;
}
.card:hover .title {
  color: var(--card-title);
}

.card .promoted {
  height: 40px;
}
.card .date {
  transition: all 0.5s ease-out;
  padding-right: 2rem;
  display: flex;
  align-items: center;
  order: -1;
}

.card .date h4 {
  transition: 0.5s ease;
  opacity: 0.5;
  font-size: var(--font-small);
}

.card:hover .date h4 {
  opacity: 1;
  color: var(--card-title);
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
  flex-grow: 1;
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
  font-weight: 600;
}

.card:hover .tag-skill {
  transition: all 0.5s ease;
  color: var(--card-title);
}
@media (min-width: 1200px) {
  .card .date {
    order: 0;
    color: var(--text-color);
  }
}

@media (min-width: 1440px) {
  body {
    transform: scale(1.05);
    transform-origin: top left;
  }
}
</style>
