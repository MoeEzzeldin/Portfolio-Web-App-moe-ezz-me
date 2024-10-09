<template>
  <section id="about">
    <div class="img">
      <img src="../assets/moe.jpg" alt="" />
    </div>
    <p>
      Technology and computers have been my passion since I was little, but my journey with tech
      started back in 2010 when I got involved with the
      <b>Arab Digital Expression Foundation</b> (<a :href="deca" target="_blank">ADEF</a>) and
      attended workshops on Linux and Ubuntu. Through these two days workshop, I learned how to install and use ubuntu for the first time .<br />
      <br />
      After immigrating to the US, I started learning HTML, CSS, and JavaScript with
      <strong>Egypt Future Work Digital</strong> (<a href="https://egfwd.com/">FWD</a>), and enrolled for <a href="https://www.techelevator.com/" target="_blank">Tech Elevator</a> 
        in-person Spring 2024 cohort. I spend over 800+ hours coding and learning the languages and frameworks
      necessary for software development. Since graduating in April 2024, my main focus
      has been learning more about DevOps while using the tools I learn from the cloud in developing accessible scalable applications.<br />
      <br />
      When I’m not coding, I’m usually hanging out with my wife and daughter, chatting with a friend, or playing Pink Floyd in my patio!
    </p>
  </section>
</template>

<script>
export default {
  name: 'About-me',
  props: ['myData'],
  data() {
    return {
      awa: 'https://alwan-awtar.org/',
      deca: 'https://home.adef.xyz/',
      TE: 'https://www.techelevator.com/'
    }
  },
  methods: {}
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

.img {
  overflow: hidden;
  box-shadow: var(--shadow);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  height: 20rem;
  width: 20rem;
  object-fit: cover;
  box-shadow: var(--inner-shadow);
  border-radius: 50%;
  padding: 10px;
  filter: grayscale();
}
</style>
