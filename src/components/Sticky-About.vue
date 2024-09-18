<template>
  <main>
    <section class="greeting">
      <div class="header">
        <h3 class="greet">Hi, my name is...</h3>
        <h1 class="name">Moe Ezzeldin</h1>
        <h2 class="whomi">Junior Developer && Cloud Eng</h2>
        <p class="intro">
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
    <footer>
      <!-- Links and Icons for CONTACT -->
       <div class="icons">
         <a href="https://github.com/MoeEzzeldin" target="_blank">
           <img :src="icons.gitHub" alt="Description of Image 1" />
         </a>
         <a href="https://www.linkedin.com/in/moe-ezz-columbus-ohio/" target="_blank">
           <img :src="icons.linkedIn" alt="" />
         </a>
         <a href="mailto:ezzeldin.mo3@gmail.com" target="_blank">
           <img :src="icons.gmail" alt="" />
         </a>
         <a href="'tel:'+16148169143">
           <img :src="icons.phone" alt="phone icon" />
         </a>
       </div>
      <div class="copy">
        <p>© 2024 Moe Ezzeldin. All rights reserved.</p>
      </div>
    </footer>
  </main>
</template>

<script>
export default {
  name: 'Sticky-About',
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
  display: grid;
  grid-template-rows: 0.3fr 0.3fr 0.3fr;
  gap: 25px;
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
  /* font-family: 'Pixelify Sans', sans-serif; */
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  background: linear-gradient(to right, rgb(255, 106, 0), blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  padding-top: 2rem;
}

main .name {
  font-weight: 700;
  font-style: normal;
  font-size: 3rem;
  line-height: 1;
  margin: 0;
  color: var(--heading-color);
  text-shadow: -5px -3px 5px var(--shadow-color);
  ;
}

main .whomi {
  font-weight: 700;
  font-style: normal;
  background: linear-gradient(to right, rgb(255, 106, 0), blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  width: 400px;
}

main .intro {
  font-weight: 500;
  font-style: normal;
  width: 475px;
}

main .nav {
  display: flex;
  justify-content: left;
  align-items: center;
  /* margin-bottom: 60px; */
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
  transition: transform 0.3s ease, width 0.3s ease;
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

footer {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
footer .icons {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  width: 80%;
}


footer .copy{
  text-align: center;
  
}



footer a img {
  font-weight: 400;
  font-style: normal;
  height: 50px;
  width: 50px;
  border-radius: 100%;
  box-shadow: 0px 0px 10px 5px var(--shadow-color);
  transition: transform 0.3s ease, box-shaodw 0.3s ease;
}
footer a img:hover {
  transform: scale(1.1);
}
@media (max-width: 1200px) {
  /* Styles for mobile devices */

  footer{
    display: flex;
    justify-content: center;
    height: 100px;
  }
  footer .copy{
    display: none;
  }

  main{
    height: 50vh;
    grid-template-rows: 1fr 1fr 1fr;
    box-sizing: border-box;
  }

  main .greeting .intro{
    /* width: 500px; */
  }
  .nav.nav{
    margin: 0;
    padding: 0;
    gap: 0;
  }
}

@media (min-width: 1201px) {
  /* Styles for mobile devices */
  main {
    height: 100vh;
    justify-content: space-between;
    gap: 100px;
  }
  footer{
    justify-content: space-between;
    align-items: center;
  }

}

</style>
