<template>
  <main id="experience">
    <section class="card hover">
      <a :href="item.url" target="_blank" class="expo">
        <img class="expo" :src="expo" alt="png" />
      </a>
      <div class="wrapper">
        <div class="head">
        <div class="title">
            <h4>
              {{ item.name }} &nbsp; | &nbsp;{{ item.position }}
              <img class="promoted" :src="this.promoted" v-show="item.promotion" alt="promoted" />
              {{ item.promotion ? item.promotion : '' }}
            </h4>
          </div>
          <div class="date">
            <h4>{{ item.startDate }} - {{ item.endDate }}</h4>
          </div>
          </div>

        <div class="content">
          <ul class="list-text">
            <li class="tag" v-for="(point, index) in item.summary" :key="index">
              {{ point }}
            </li>
          </ul>
        </div>
        <div class="skills">
          <ul class="list-skills">
            <li class="tag-skills" v-for="(skill, index) in item.skills" :key="index">
              {{ skill }}
            </li>
          </ul>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'My-Experience',
  props: ['expo', 'item', 'promoted'],
  data() {
    return {
      hiddenElements: document.querySelectorAll('.hover'),
      observer: null
    }
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

    document.querySelectorAll('.hover').forEach((section) => {
      this.observer.observe(section)
    })
  }
}
</script>

<style scoped>
#experience .card {
  position: relative;
  padding: 1rem;
  transition: all 0.5s ease;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 5rem;
  box-shadow: var(--inner-shadow);
  height: minmax(300px, auto);
}

#experience .card:hover {
  transition: all 0.5s ease;
  box-shadow: var(--shadow);
}

.card .wrapper {
  display: grid;
  grid-template-columns: 1fr;
  height: 100%;
  gap: .8rem;
}
.title{
  font-size: 0.9rem;
}
.date, .title {
  display: flex;
  align-items: center;
}
.card:hover .title {
  transition: all 0.5s ease;
  color: var(--card-title);
  margin-left: 0.2rem;
}
.head {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  gap: 0.3rem;
  margin-top: 1rem;
}
.card .promoted {
  height: 30px;
}

.card .date {
  transition: all 0.5s ease;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* order: -1; */
}

.card .date h4 {
  transition: all 0.5s ease;
  opacity: 0.5;
  font-size: var(--font-small);
}

.card:hover .date h4 {
  opacity: 1;
  transition: all 0.5s ease;
  margin-right: 0.5rem;
}
.content{
  margin-left: 0.5rem;
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
}
.card:hover .expo {
  opacity: 1;
  transition: all 0.5s ease;
}

.card .wrapper .title {
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
  transition: all 0.5s ease;
}

.card .list-text {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-items: center;
  list-style: none;
  padding: 0;
  gap: 10px;
}
.card .list-skills {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 0;
  gap: 10px;
}

.skills .list-skills .tag-skills {
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

.card:hover .tag-skills {
  transition: all 0.5s ease;
}

@media (min-width: 1200px) {
.wrapper{
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.title {
  font-size: var(--font-medium);
}
  .card .wrapper:not(:last-child) {
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;
    justify-content: left;
    gap: 1rem;

  }
  .card .wrapper:last-child {
    justify-content: center;
  }
}
</style>
