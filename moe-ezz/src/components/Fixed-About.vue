<template>
  <main>
    <section class="greeting">
      <div class="header">
        <h3 class="greet">Hi, my name is...</h3>
        <h1 class="name">Moe Ezzeldin</h1>
        <h2 class="whomi">Junior Developer && Cloud Eng</h2>
        <p class="para">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia eligendi dolorem
          aspernatur! Accusantium a vel in atque laborum dolor facilis eaque fugiat accusamus, sint
          distinctio harum placeat suscipit molestiae ut!
        </p>
      </div>
    </section>
    <!-- Nav -->
    <nav class="nav">
      <ul class="list">
        <li class="holder">
          <span></span><a class="link" href="#About"><span></span>About</a>
        </li>
        <li class="holder">
          <span></span><a class="link" href="#Pro-exp"><span></span>Experience</a>
        </li>
        <li class="holder">
          <span></span><a class="link" href="#Projects"><span></span>Projects</a>
        </li>
      </ul>
    </nav>
    <footer>
      <!-- Links and Icons for CONTACT -->
      <a href="https://github.com/MoeEzzeldin" target="_blank">
        <img :src="icons.gitHub" alt="Description of Image 1" />
      </a>
      <a href="https://www.linkedin.com/in/moe-ezz-columbus-ohio/" target="_blank">
        <img :src="icons.linkedIn" alt="" />
      </a>
      <a href="mailto:ezzeldin.mo3@gmail.com" target="_blank">
        <img :src="icons.gmail" alt="" />
      </a>
      <a href="'tel:' + 6148169143">
        <img :src="icons.phone" alt="phone icon" />
      </a>
    </footer>
    <div class="copy">
      <p>© 2024 Moe Ezzeldin. All rights reserved.</p>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Fixed-About',
  props: {
    theme: {
      type: String,
      required: true
    },
    icons: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
main {
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr 0.5fr 0.3fr 0.5fr;
  gap: 25px;
  box-sizing: border-box;
}

main .header {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 10px;
}

main .header > * {
  padding-top: 10px;
}

main .greet {
  font-family: 'Pixelify Sans', sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  color: #4caf50;
}

main .name {
  font-weight: 700;
  font-style: normal;
  font-size: 3rem;
  line-height: 1;
  margin: 0;
}

main .whomi {
  font-weight: 700;
  font-style: normal;
  background: linear-gradient(to right, blue, red);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

main .para {
  font-weight: 400;
  font-style: normal;
}

main .nav {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100px;
}

main .list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  list-style: none;
  padding: 0;
}

main .list > * {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

main .holder {
  align-items: center;
  gap: 5px;
}

main .holder:hover span:not(link) {
  height: 3px;
  width: 100px;
  /* transform:scale(1.1) ; */
  transition: transform 6s ease; /* Smooth scaling */
}

main .list span {
  background-color: black;
  height: 1px;
  width: 50px;
  font-weight: 700;
  font-style: normal;
  background: linear-gradient(to right, rgb(255, 106, 0), rgb(234, 255, 0));
}

main .list a {
  text-decoration: none;
  color: var(--text-color);
  padding: 10px 0;
}

footer {
  height: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}

footer a img {
  font-weight: 400;
  font-style: normal;
  height: 50px;
  width: 50px;
}
</style>
