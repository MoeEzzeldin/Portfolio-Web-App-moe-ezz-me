<template>
  <main>
    <section id="about">
      <h3>Elevator pitch:</h3>
      <p>
        {{ this.pitch }}
      </p>
      <p>
        {{ this.pitch }}
      </p>
    </section>


  </main>
</template>

<script>
export default {
  name:'El-Pitch',
    data(){
      return{
        pitch: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. At ut, voluptate pariatur nesciunt impedit sed fugit vero perspiciatis doloremque cum praesentium molestias odit, perferendis quaerat eius maxime maiores necessitatibus rerum.Lorem, ipsum dolor sit amet consectetur adipisicing elit. At ut, voluptate pariatur nesciunt impedit sed fugit vero perspiciatis doloremque cum praesentium molestias odit, perferendis quaerat eius maxime maiores necessitatibus rerum.`
      }
    }
}
</script>

<style scoped>
main {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-style: normal;
}

p{
  color: var(--text-color);
  line-height: 2;
  padding: 10px 0 0 30px;
}
h3{
  padding-top: 2rem;
}

</style>
