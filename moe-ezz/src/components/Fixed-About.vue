<template>
  <main>
    <section>
      <h3>Hi, my name is...</h3>
      <h1>Moe Ezzeldin</h1>
      <h2>Junior Developer && Cloud Eng</h2>
      <p>
        I use my creativity and love for learning to build cool interactive web designs with
        .................... ............... <a href="">blach blah blah</a> and that you know blah
        blah blah
      </p>
    </section>
    <nav class="nav">
      <a href="#About"><span></span>About</a>
      <a href="#Pro-exp"><span></span>Experience</a>
      <a href="#Projects"><span></span>Projects</a>
      <a href="#CONNECT"><span></span>Connect</a>
    </nav>
    <footer>
      <!-- Links and Icons for CONTACT -->
      <a href="https://example.com/link1">
        <img src="../assets/github_3291695.png" alt="Description of Image 1" />
      </a>
      <a href="https://example.com/link2">
        <img src="../assets/linkedin_3992606.png" alt="Description of Image 2" />
      </a>
      <a href="https://example.com/link3">
        <img src="../assets/envelope_15047426.png" alt="Description of Image 3" />
      </a>
      <a href="https://example.com/link3">
        <img src="../assets/phone-call_455907.png" alt="Description of Image 3" />
      </a>
    </footer>
  </main>
</template>

<script>
export default {}
</script>

<style scoped>
/* Dark Mode Palette:
Background: #1E1E1E (Very dark gray)
Primary Text: #E0E0E0 (Light gray)
Secondary Text: #B0B0B0 (Medium gray)
Accent: #4CAF50 (Green)
Light Mode Palette:
Background: #F5F5F5 (Light gray)
Primary Text: #333333 (Very dark gray)
Secondary Text: #666666 (Medium gray)
Accent: #4CAF50 (Green) */
main {
  font-family: 'Poppins', sans-serif;
  display: grid;
  grid-template-rows: 1fr 0.6fr 0.6fr;
  gap: 25px;
}
main h1 {
  font-weight: 700;
  font-style: normal;
  font-size: 3rem;
  line-height: 1;
}
main h3 {
  font-family: 'DotGothic16', sans-serif;
  font-weight: 400;
  font-style: normal;
  color: #4caf50;
}
main h2 {
  color: wheat;
  font-weight: 500;
  font-style: normal;
}
main p {
  color: #b0b0b0;
  font-weight: 300;
  font-style: normal;
  overflow-wrap: break-word; /* Also known as word-wrap */
  word-break: break-word; /* Fallback for older browsers */
}
.nav {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
}
footer{

}

footer a img {
  font-weight: 400;
  font-style: normal;
  height: 50px;
  width: 50px;
}
</style>
