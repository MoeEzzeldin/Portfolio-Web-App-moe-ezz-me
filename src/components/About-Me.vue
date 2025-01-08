<template>
  <section id="about">
    <div class="img">
      <img src="../assets/moe.jpg" alt="" />
    </div>
    <p>
      Technology and computers have been my passion since I was little, but my journey with tech
      started back in 2010 when I got involved with the
      <b>Arab Digital Expression Foundation</b> (<a :href="deca" target="_blank">ADEF</a>) and
      attended workshops on Linux and Ubuntu. Through these workshop, I learned how to
      install and use ubuntu for the first time, and it inspired me to keep looking into Linux.<br />
      <br />
      I started learning HTML, CSS, and JavaScript shortly after I moved to the US with
      <strong>Egypt Future Work Digital</strong> (<a href="https://egfwd.com/" target="_blank"
        >FWD</a
      >), and enrolled for
      <a href="https://www.techelevator.com/" target="_blank">Tech Elevator</a> in-person Spring
      2024 cohort. I spent over 800+ hours coding and learning the languages and frameworks
      necessary to start my career in tech. Since graduating in April 2024, my main focus has been
      learning more about DevOps while using the tools I learn from the cloud in developing scalable
      applications.<br />
      <br />
      When I’m not coding, I’m usually hanging out with my wife and daughter, chatting with a
      friend, or playing Pink Floyd in my patio!
    </p>
  </section>
</template>

<script>
export default {
  name: 'About-me',
  props: ['myData'],
  components: {
  },
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
  justify-content: flex-start;
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
@media (min-width: 1440px) {

  #about {
    font-size: 1.5rem;
    height: 100vh;
  }
}
</style>
