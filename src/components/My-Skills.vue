<template>
  <section id="skills">
    <!-- <ul v-for="(skill, index) in myData.skills" :key="index">
      <li> {{skill}}</li>
    </ul> -->
  </section>
</template>

<script>
export default {
  name: 'My-Skills',
  props: ['myData'],
  data() {
    return {

    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
#about {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  top: 5rem;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.6;
}

ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

li {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  background-color: var(--background-color);
  box-shadow: var(--inner-shadow);
  transition: all 0.5s ease;
}
</style>
