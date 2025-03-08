<template>
  <section id="about" class="hidden">
    <div class="img-container">
      <img src="../assets/moe.jpg" alt="Moe Ezz - Software Developer" loading="lazy" />
    </div>
    <div class="about-content">
      <p>
        Technology and computers have been my passion since I was little, but my journey with tech
        started back in 2010 when I got involved with the
        <b>Arab Digital Expression Foundation</b> (<a :href="deca" target="_blank" class="link">ADEF<span class="sr-only">(opens in a new tab)</span></a>) and
        attended workshops on Linux and Ubuntu. Through these workshops, I learned how to
        install and use Ubuntu for the first time, and it inspired me to keep looking into Linux.
      </p>
      <p>
        I started learning HTML, CSS, and JavaScript shortly after I moved to the US with
        <strong>Egypt Future Work Digital</strong> (<a href="https://egfwd.com/" target="_blank"
        class="link">FWD<span class="sr-only">(opens in a new tab)</span></a>), and enrolled in
        <a href="https://www.techelevator.com/" target="_blank" class="link">Tech Elevator<span class="sr-only">(opens in a new tab)</span></a> in-person Spring
        2024 cohort. I spent "over 800+ hours" coding and learning the languages and frameworks
        necessary to start my career in tech. Since graduating in April 2024, my main focus has been
        learning more about DevOps while using the tools I learn from the cloud in developing scalable
        applications.
      </p>
      <p>
        When I'm not coding, I'm usually hanging out with my wife and daughter, chatting with a
        friend, or playing Pink Floyd in my patio!
      </p>
    </div>
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
  }
}
</script>

<style scoped>
/* 
  I added padding-top instead of margin-top because padding doesn't collapse
  and I needed a consistent 5rem space from the top regardless of viewport.
  Also limited the width for better readability on big monitors.
*/
#about {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: clamp(1.5rem, 4vw, 3rem);
  padding-top: 5rem;
  font-size: clamp(1rem, 3vw, 1.2rem);
  font-weight: 400;
  line-height: 1.6;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

/* 
  I wanted my profile pic to be round with a nice shadow effect.
  The clamp sizing makes it responsive on all screens.
*/
.img-container {
  overflow: hidden;
  box-shadow: var(--shadow);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: clamp(10rem, 40vw, 20rem);
  height: clamp(10rem, 40vw, 20rem);
}

/* 
  The grayscale filter gives a nice professional look,
  but I wanted it to show color on hover for a bit of interactivity
*/
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-shadow: var(--inner-shadow);
  border-radius: 50%;
  padding: clamp(5px, 2%, 10px);
  filter: grayscale(80%);
  transition: filter 0.4s ease;
}

img:hover {
  filter: none;
}

/* 
  Using flex with gap for paragraphs is so much cleaner than margins
  for consistent spacing between text blocks
*/
.about-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

p {
  margin: 0;
}

/* 
  My links needed a bit more pop! This underline effect with
  the thickness change on hover feels really nice
*/
.link {
  position: relative;
  font-weight: 600;
  padding: 2px 4px;
  text-decoration: underline;
  text-decoration-thickness: 0.1em;
  text-underline-offset: 0.2em;
  transition: color 0.3s ease, text-decoration-thickness 0.3s ease;
}

.link:hover, .link:focus {
  outline: none;
  text-decoration-thickness: 0.2em;
  color: var(--card-title);
}

/* For screen readers - accessibility is important! */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* 
  Mobile needs some horizontal padding but I had to keep
  the 5rem padding on top consistent across all breakpoints
*/
@media (max-width: 767.98px) {
  #about {
    padding: 5rem 1rem 1rem 1rem;
  }
  
  p {
    text-align: left;
  }
}

@media (min-width: 768px) and (max-width: 991.98px) {
  #about {
    gap: 2rem;
    padding: 5rem 2rem 2rem 2rem;
  }
}

@media (min-width: 992px) and (max-width: 1439.98px) {
  #about {
    font-size: 1.1rem;
    padding: 5rem 2rem 2rem 2rem;
  }
}

/* 
  For my big 1440p monitor, I wanted slightly larger text
  and a bit more bottom padding for balance
*/
@media (min-width: 1440px) {
  #about {
    font-size: 1.2rem;
    padding: 5rem 0 4rem 0;
  }
  
  .img-container {
    width: 18rem;
    height: 18rem;
  }
}
</style>