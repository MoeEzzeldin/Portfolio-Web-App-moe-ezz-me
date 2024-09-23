<template>
  <main id="experience">
    <header>
      <h2 class="Head">Hi I'am Experience</h2>
    </header>
    <section class="card">
      <img class="expo" :src="expo" alt="png"/>
      <div class="date"><h4>Feb '23 - Oct '23</h4></div>
      
      <div class="wrapper">
        <div class="title">
          <h4>Shift Supervisor | Starbucks</h4>
        </div>
        
        <div class="content">
          <ul class="list">
            <li class="tag">
              Promoted to assist the manager in submitting over 500 daily orders in an efficient and
              timely manner
            </li>
            <li class="tag">
              Arranged daily operation of the team and created reports that was communicated with
              upper management
            </li>
          </ul>
        </div>
        <div class="skills">
          <ul class="list">
            <li class="tag skill">Custommer Service</li>
            <li class="tag skill">Team Building</li>
            <li class="tag skill">Fast phased Env</li>
            
          </ul>
        </div>
      </div>
    </section>
    <section class="card">
      <img class="expo" :src="expo" alt="png"/>
      <div class="date"><h4>Feb '23 - Oct '23</h4></div>
      
      <div class="wrapper">
        <div class="title">
          <h4>Shift Supervisor | Starbucks</h4>
        </div>
        
        <div class="content">
          <ul class="list">
            <li class="tag">
              Promoted to assist the manager in submitting over 500 daily orders in an efficient and
              timely manner
            </li>
            <li class="tag">
              Arranged daily operation of the team and created reports that was communicated with
              upper management
            </li>
          </ul>
        </div>
        <div class="skills">
          <ul class="list">
            <li class="tag skill">Custommer Service</li>
            <li class="tag skill">Team Building</li>
            <li class="tag skill">Fast phased Env</li>
            
          </ul>
        </div>
      </div>
    </section>
    <section class="card">
      <img class="expo" :src="expo" alt="png"/>
      <div class="date"><h4>Feb '23 - Oct '23</h4></div>
      
      <div class="wrapper">
        <div class="title">
          <h4>Shift Supervisor | Starbucks</h4>
        </div>
        
        <div class="content">
          <ul class="list">
            <li class="tag">
              Promoted to assist the manager in submitting over 500 daily orders in an efficient and
              timely manner
            </li>
            <li class="tag">
              Arranged daily operation of the team and created reports that was communicated with
              upper management
            </li>
          </ul>
        </div>
        <div class="skills">
          <ul class="list">
            <li class="tag skill">Custommer Service</li>
            <li class="tag skill">Team Building</li>
            <li class="tag skill">Fast phased Env</li>
            
          </ul>
        </div>
      </div>
    </section>

  </main>
</template>

<script>
export default {
  name: 'My-Experience',
  props: {
    expo: {
      type: String,
      required: true
    },
    arrow: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },

  methods: {}
}
</script>

<style scoped>
#experience {
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
}

#experience .card {
  position: relative;
  display: grid;
  grid-template-columns: 0.7fr 2fr;
  gap: 20px;
  padding: 10px;
  transition: all 0.5s ease; /* Smooth transition for background color and border-radius */
  overflow: hidden;
  border-radius: 8px;
  width: minmax(450px, 750px);
}
.card:hover {
  background-color: var(--card-background);
  backdrop-filter: blur(25px); /* Applies the blur */
  box-shadow: 0 0 10px var(--shadow-color);
  cursor:default;
}

.card:hover .title {
  transform: translateY(-5px); /* Example of a transformation */
  color: var(--card-title);
}

.card:hover .date h4 {
  transform: translateY(-5px); /* Example of a transformation */
  opacity: 1;
}
.card .expo {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 5px;
  right: 5px;
  cursor: pointer;
  filter: hue-rotate(90deg) sepia(1) saturate(5) brightness(0.8);
  opacity: 1;
  transition: all 0.3s ease;
}
.card:hover .expo {
  /* opacity: 1; */
  transition: all 0.3s ease;
}


.card .date {
  transition: all 0.5s ease-out;
  text-align: center;
  padding-top: 22px;
}

.card .wrapper .title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.5s ease;
}

.card .date h4 {
  transition: 0.5s ease;
  opacity: 0.5;
  padding-right: 5px;
  font-size: var(--font-small);
}
.card .wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-top: 20px;
}
.card .list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  align-items: flex-start;
}

.skills .list .tag {
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

.card:hover .tag {
  transition: all 0.5s ease-in;
}

@media (min-width: 1200px){

}
</style>
