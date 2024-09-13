<template>
  <main id="experience">
    <header>
      <h2 class="Head">Hi Im Experience**</h2>
    </header>
    <section class="card">
      <div class="date"><h4>Feb '23 - Oct '23</h4></div>
      <div class="wrapper">
        <h3 class="title">Shift Supervisor | Starbucks</h3>
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
      <div class="date"><h4>Feb '23 - Oct '23</h4></div>
      <div class="wrapper">
        <h3 class="title">Shift Supervisor | Starbucks</h3>
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
      <div class="date"><h4>Feb '23 - Oct '23</h4></div>
      <div class="wrapper">
        <h3 class="title">Shift Supervisor | Starbucks</h3>
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
  data() {
    return {}
  },

  methods: {}
}
</script>

<style scoped>
#experience {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
#experience .card {
  height: 300px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  padding: 10px;
  transition: background-color 0.6s ease, border-radius 0.6s ease, border 0.6s ease; /* Smooth transition for background color and border-radius */
  overflow: hidden;
  border: 2px solid transparent; /* Initial border */

}
.card:hover {
  background-color: var(--card-background);
  border-radius: 25px;
  border: 2px solid rgba(0, 0, 255, 0.6); /* Blue border on hover */

}

.card .date {
  text-align: center;
  border-right: 3.5px solid var(--border-color);
  padding-top: 20px;
}
.card .date h4{
  opacity: .5;
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
  gap:5px;
  justify-content: center;
  align-items: center;
}

.skills .list .tag {
  background-color: var(--hover-color);
  opacity: .5;
  border-radius: 25px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
}

.card:hover .skill{
  background-color: var(--hover-color) ;
  opacity: 1;
}

</style>
