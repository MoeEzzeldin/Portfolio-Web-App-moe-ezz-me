<template>
  <main class="main">
    <section class="greeting">
      <div class="header">
        <h3 class="greet">Hi, my name is...</h3>
        <!-- Use v-if to check if myData and myData.basics exist -->
        <h1 class="name" v-if="myData.basics">{{ myData.basics.name }}</h1>
        <h2 class="whomi" v-if="myData.basics">{{ myData.basics.label }}</h2>
        <p class="intro" v-if="myData.basics">
          {{ myData.basics.summary }}
        </p>
      </div>
    </section>
    <!-- Nav -->
    <nav class="nav">
      <ul class="list">
        <li class="holder">
          <span></span><a class="link" href="#scroll"><span></span>About</a>
        </li>
        <li class="holder">
          <span></span><a class="link" href="#experience"><span></span>Experience</a>
        </li>
        <li class="holder">
          <span></span><a class="link" href="#projects"><span></span>Projects</a>
        </li>
      </ul>
    </nav>
    <div class="footer">
      <!-- Links and Icons for CONTACT -->
      <div class="icons">
        <a href="https://github.com/MoeEzzeldin" target="_blank">
          <i class="fi fi-brands-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/moe-ezz-columbus-ohio/" target="_blank">
          <i class="fi fi-brands-linkedin"></i>
        </a>
        <a href="mailto:ezzeldin.mo3@gmail.com" target="_blank">
          <i class="fi fi-sc-envelope"></i>
        </a>
        <a href="'tel:'+16148169143">
          <i class="fi fi-ss-phone-flip"></i>
        </a>
      </div>
      <div class="copy">
        <p>© 2024 Moe Ezzeldin. All rights reserved.</p>
      </div>
    </div>
  </main>
</template>

<script>

export default {
  name: 'Sticky-About',
  props: ['theme', 'icons', 'myData'],

  data() {
    return {
    }
  },

}
</script>

<style scoped>
.main{
  display: grid;
  grid-template-rows: 1fr .5fr .5fr;
  height: 100vh;
  gap: 4rem;
}


.main >*:not(:last-child) {
  margin-left: 25px;
}

main .header {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 1rem;
}


main .greet {
  /* font-family: 'Pixelify Sans', sans-serif; */
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  background: linear-gradient(to right, rgb(255, 106, 0), blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-top: 2rem;
}

main .name {
  font-weight: 700;
  font-style: normal;
  font-size: 2.8rem;
  line-height: 1;
  margin: 0;
  color: var(--heading-color);
}

main .whomi {
  font-weight: 600;
  font-style: normal;
  background: linear-gradient(to right, rgb(255, 106, 0), blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

main .intro {
  font-weight: 600;
  font-style: normal;
  font-size: 1.2rem;
  /* max-width: 680px; */
}

main .nav {
  display: flex;
  justify-content: left;
  align-items: center;
}

main .list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  list-style: none;
  padding: 0;
}

main .list > * {
  display: flex;
}

main .holder {
  display: flex;
  align-items: center;
  gap: 25px;
}

main .holder:hover span {
  height: 3px;
  width: 75px;
  transform: scale(1.1);
}

main .list span {
  background-color: black;
  height: 1px;
  width: 50px;
  font-weight: 700;
  font-style: normal;
  background: linear-gradient(to right, rgb(255, 106, 0), rgb(90, 60, 240));
  transition:
    transform 0.3s ease,
    width 0.3s ease;
}

main .list a {
  text-decoration: none;
  color: var(--text-color);
  padding: 10px 0;
  transform: scale(1.1);
}
main .holder:hover a {
  transform: scale(1.3);
  background: linear-gradient(to right, rgb(255, 89, 0), rgb(255, 204, 0));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer {
  position: relative;
  align-self: center;
}

.footer .icons {
  display: flex;
  justify-content: space-evenly;
  gap: 30px;
  
}

.footer .copy {
  display: none;
}


.footer i {
  color: var(--text-color);
  font-size: 2.5rem;
  transition:
    transform 0.3s ease,
    filter 0.3s ease;
}

.footer i:hover {
  text-shadow: var(--shadow);
}
@media (min-width: 992px) and (max-width: 1199.98px) {
  /* CSS rules for tablets */

}
@media (min-width: 1200px) {
  main .main {
    display: grid;
    grid-template-rows: 1fr .5fr .5fr;
    height: 88vh;    
    gap: 4rem;
  }
.main .name {
  font-size: 4rem;
}

  .footer {
    height: 150px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0;
  }

  .footer .icons {
    width: 100%;
    gap: 50px;
  }
  .footer .copy {
    display:block;
  }
}

@media (orientation: landscape) {
  .main {
    gap: 2rem;
    height: 100vh;
  }
  #scroll {
    gap: 2rem;
  }
}
@media (min-width: 1440px) {
  body {
    transform: scale(1.05); /* Scale up by 5% */
    transform-origin: top left; /* Set the scaling origin */
  }
}
</style>
