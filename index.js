const container = document.querySelector(".movies")
const movieSection = document.querySelector("section.content");
const sliderLeft = document.querySelector(".bxs-left-arrow-alt")
const sliderRight = document.querySelector(".bxs-right-arrow-alt")
const wrap = document.querySelector(".slide")
const search = document.querySelector(".inputSearch")
let index = 3

async function getData() {
  const response = await fetch('https://ghibli.rest/films')
  const data = await response.json()

  data.forEach(movie => {
    container.innerHTML += `
    <div class="card">
        <img class="card-img" src="${movie.image}" alt="">
        <div class="descricao">
          <h1 class="title">${movie.title}</h1>
        </div>
     </div>
    `
  })
  let length = data.length - 1
  let chooseMovie = data[index]

  displaySlide(chooseMovie)

  sliderRight.addEventListener("click", () => {
    nextMovie(length)    
  })
  
  sliderLeft.addEventListener("click", () => {
    prevMovie()
  });

  document.addEventListener("touchend", () => {
    index > 3 ? prevMovie() : nextMovie(length)
  })
  return data
}

const prevMovie = () =>{
  index > 3 ? index -= 1 : index = 3 
  displaySlide(control(movies))
}

const nextMovie = (length)=>{
  index < length ? index += 1 : index = 3
  displaySlide(control(movies))
}

function control(movie) {
  return movie[index]
}

function displaySlide(filme) {
  const imgActive = document.querySelector(".banner-movie")
  const titleActive = document.querySelector(".titulo-movie")
  const movieDesc = document.querySelector(".movie-desc")

  imgActive.src = filme.movie_banner
  titleActive.textContent = filme.title

  movieDesc.textContent = filme.description
}


const endpoint = 'https://ghibli.rest/films'
const movies = []

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => movies.push(...data))

function findMovie(matchMovie, filmes) {
  return filmes.filter(film => {
    const regex = new RegExp(matchMovie, 'gi')
    return film.title.match(regex)
  })
}

function displayMatch() {
  const matches = findMovie(this.value, movies)
  console.log(matches);
  const result = matches.map(item => {
    return `
       <div class="card">
            <img class="card-img" src="${item.image}" alt="">
         <div class="descricao">
            <h1 class="title">${item.title}</h1>
         </div>
      </div>
         `
  }).join('')
  if (search.value === '') {
      movieSection.style.display = 'block'
  }else if(result){
      movieSection.style.display = 'none'
      container.innerHTML = result
  }
}

search.addEventListener("input", displayMatch)

window.onload = getData
