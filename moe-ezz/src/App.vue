<template>
  <Main class="main">
    <!-- my info / Pic -->
    <div class="fixed">
      <FixedAbout />
    </div>
    <!-- Scroll -->
    <div class="scroll">
      <div class="about">
        <ScrollInfo />
      </div>
      <div class="experience">
        <Experience />
      </div>
    </div>
  </Main>
</template>

<script>
import FixedAbout from './components/Fixed-About.vue'
import ScrollInfo from './components/Scroll-Info.vue'
import Experience from './components/Experience.vue'
export default {
  components: {
    FixedAbout,
    ScrollInfo,
    Experience
  }
}
</script>

<style>
.main {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 80vw;
  height: fit-content;
  color: var(--text-color);
}

.fixed,
.scroll {
}

.fixed {
  position: fixed;
}

.scroll {
  display: grid;
  grid-template-rows: repeat(auto-fit, minmax(500px, 1fr));
  justify-content: space-evenly;
  margin-left: 40vw;
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
