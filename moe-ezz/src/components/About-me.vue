<template>
  <main>
    <section id="About">
      <h3>Elevator pitch:</h3>
      <p>{{ this.pitch }}</p>
    </section>


  </main>
</template>

<script>
export default {
    data(){
      return{
        pitch:""
      }
    }
      
    
  
}
</script>

<style scoped>
main {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-style: normal;
}

p{
  color: var(--text-color);
}
</style>
