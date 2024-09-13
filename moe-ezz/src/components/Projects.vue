<template>
  <main id="projects">
    <div class="img">
      <img src="../assets/gmail-d.png" alt="project-img">
    </div>
    <section class="card">
      <header class="head">
        <h2>Hello I'm Projects</h2>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. At ut, voluptate pariatur nesciunt impedit sed fugit vero perspiciatis doloremque cum praesentium molestias odit, perferendis quaerat eius maxime maiores necessitatibus rerum.</p>
      </header>
      <div class="content">

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
#projects{
  display: grid;
  grid-template-columns: 1fr 3fr;
}
#projects img{
  /* aspect-ratio: 16/9;
  object-fit: cover; */
  width: 300px;
}
</style>
