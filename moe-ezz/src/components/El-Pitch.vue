<template>
  <main>
    <section id="">
      <h3>Elevator pitch:</h3>
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
        pitch: `Back in 2010 I was volenteering to teach the children of my community the basics of using the internet safely with AWA LINK,
               I got the opportunity to attend some open source workshops with Deca Adef, including hands on Linux and Ubuntu.
              That's when I thought I had something for tech.
              I started digging more into linux, but I didn't have enough resources to continue on my own.
              right after moving to the united states in 2019 is when that spark lit again and I started a cource "Cource name" in HTML5 CSS and JS.
              I started inspecting famouse websites to learn the how beyond all of that.
              It wasn't so simple and my curiousity drove me deeper into code, so i started "TE SUMMERY"`,
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
  line-height: 1.5;
  padding: 15px 0
}
#about{
  padding : 25px 0;
}
</style>
