<template>
    <section id="about">
      <div class="img">
        <img src="../assets/moe.jpg" alt="">
      </div>
      <p>
        Technology and computers have been my passion since I was young, but my journey with tech
        started back in 2010 when I got involved with the Arab Digital Expression Foundation
        <a :href="deca" target="_blank">(ADEF)</a> and attended workshops on Linux and Ubuntu.
        Through those courses, I wrote my first lines of command and. After immigrating to the US, I
        focused on expanding my skills with Microsoft and Adobe apps and gaining leadership skills
        while working customer service roles. I made wonderful connections and learned a lot about
        community dynamics, but deep down I knew I wanted to follow my passion into a tech career
        and start learning to code. After dabbling in HTML, CSS, and JavaScript through a 6-month
        virtual front-end development program with Egypt Future Work Digital (FWD), I stumbled
        across Tech Elevator
        <a href="https://www.techelevator.com/" target="_blank">Tech Elevator</a>. and enrolled for
        the Spring 2024 in-person Columbus cohort. Participating in Tech Elevator was a
        game-changer. Not only did I spend 800+ hours coding and learning the languages and
        frameworks necessary to succeed as a software developer, but I also made lifelong
        connections and expanded my knowledge base beyond what I would have thought possible in 14
        weeks. Since graduating in April 2024, my main focus has been learning more about network
        layers and building a deeper understanding of DevOps for developing accessible scalable
        applications. When I’m not coding, I’m usually hanging out with my wife and daughter,
        playing guitar or video games, walking my dog, or catching Pokémon!
      </p>
    </section>
</template>

<script>
export default {
  name: 'El-Pitch',
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
  height: 100vh;
  font-size: var(--font-large);
  font-weight: 400;
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
  filter: grayscale(50px);
}


</style>
