<template>
  <main id="experience">
    <section class="card hover">
      <a :href="item.url" target="_blank" class="expo">
        <img class="expo" :src="expo" alt="png" />
      </a>
      <div class="wrapper">
        <div class="title">
          <h4>{{ item.name }} &nbsp; | &nbsp;{{ item.position }} <img class="promoted" :src="this.promoted" v-show="item.promotion" alt="promoted"> {{ item.promotion ? item.promotion : ""  }}</h4>
        </div>
        <div class="date">
          <h4>{{ item.startDate }} - {{ item.endDate }}</h4>
        </div>

        <div class="content">
          <ul class="list">
            <li class="tag" v-for="(point, index) in item.summary" :key="index">
              {{ point }}
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
      observer: null,
    }
  },
  mounted() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    });

    document.querySelectorAll('.hover').forEach((section) => {
      this.observer.observe(section);
    });
  },


}
</script>

<style scoped>
/* #experience {
  position: sticky;
  top: 0;
  padding: 20px;
  border-radius: 8px;
  z-index: 1;
} */
#experience .card {
  position: relative;
  padding: 1rem;
  transition: all 1s ease; /* Smooth transition for background color and border-radius */
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 3rem;
  box-shadow: var(--inner-shadow);
}
#experience .card:hover {
  opacity: 1;
  transition: all 1s ease-in;
  background-color: var(--card-background);
  backdrop-filter: blur(25px);
  box-shadow: var(--shadow);
}
.card .wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-top: 20px;
  justify-content: center;
}
 .card:hover .title {
  transform: translateY(-5px);
  transition: all 1s ease; /* Smooth transition for background color and border-radius */
  color: var(--card-title);
}

.card .promoted {
  height: 30px;
}
.card .date {
  transition: all 0.5s ease-out;
  padding-right: 1rem;
  display: flex;
  align-items: end;
}


.card .date h4 {
  transition: 0.5s ease;
  opacity: 0.5;
  font-size: var(--font-small);
}

 .card:hover .date h4 {
  transform: translateY(-5px);
  opacity: 1;
  color: var(--card-title);
  transition: all 1s ease; /* Smooth transition for background color and border-radius */
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
  transition: all 0.3s ease;
}
.card:hover .expo {
  opacity: 1;
  transition: all 0.3s ease;
}



.card .wrapper .title {
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
  transition: all 0.5s ease;
}



.card .list {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-items: center;
  list-style: none;
  padding: 0;
  gap: 10px;
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
  transition: all 1s ease-in;
}

@media (min-width: 1200px){
  .hover {
  }
}
@media (min-width: 1440px) {
  body {
    transform: scale(1.05); /* Scale up by 5% */
    transform-origin: top left; /* Set the scaling origin */
  }
}
</style>
