<template>
  <main>
    <section id="about">
      <h3>Elevator pitch</h3>
      <p>
        Back in 2010 I was volenteering to teach children of my community the basics of using the
        internet safely with <a :href="awa" target="_blank">Alwan-Wa-Awtar</a>. I loved the
        activities I learned from since I was 11 and it was time to pass the flag on to the new
        generation. I got the opportunity to attend some open source workshops with Deca
        <a :href="deca" target="_blank">ADEF</a> , including hands on Linux and Ubuntu workshops
        where I wrote my first lines of calls to ubuntu's terminal. It was a great experience that
        pushed me to switch my system completely to ubuntu for a couple of years. right after moving
        to the united states in 2019 is when that spark lit again and I started a cource in HTML5
        CSS and JS "course name", unfortunately my course stopped right after finishing HTML and
        CSS, so I decided to take it a step farther and join
        <a href="https://www.techelevator.com/" target="_blank">Tech Elevator</a>. a game-changer.
        Over 800+ hours of coding in person with a bunch of brainy pals, I've been soaking up
        everything like a sponge. my focus these days is to build and deploy applications that would
        help people manage simple tasks in their daily life using my full stack patterns MVC /MVVM.
        When im not coding, im usually hangingout with my wife and daughter, playing music, video
        games or walking my dog and catching pokemons!
      </p>
    </section>
  </main>
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
main {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-style: normal;
  font-size: 1.2rem;
  height: 100vh;
}

p {
  color: var(--text-color);
  line-height: 2.5;
}

@media (min-width: 1200px) {
  main {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-style: normal;
  }

  p {
    color: var(--text-color);
    line-height: 2.5;
    padding: 10px 0 0 30px;
  }
  h3 {
    padding-top: 2rem;
  }
}

</style>
