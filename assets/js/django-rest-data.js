const projectDivNL = document.getElementById("project-content-nl");
const projectDivEN = document.getElementById("project-content-en");


const url = "https://jh-portfolio-api.herokuapp.com/projects/";

async function loadProjects() {
  let projectsNl = await fetch(url)
    .then(response => response.json())
    .then(data => data.results)
    .then(data =>
      data
        .map(
          (repo) => `
        <div class="col-12 col-sm-6 col-md-4 col-lg-4 card">
              
    <a href="${repo.live_link}" target="_blank" class="btn btn-info uppercase">${repo.title}</a>
    <p>${repo.description_nl}</p>
    <p>
      <a class="btn btn-info" href="${repo.code_link}" target="_blank">
      <i class="fab fa-github"></i>&nbsp CODE</a>
    </p>
  </div>
  `
        )
        .join("\n")
    )

    let projectsEn = await fetch(url)
    .then(response => response.json())
    .then(data => data.results)
    .then(data =>
      data
        .map(
          (repo) => `
        <div class="col-12 col-sm-6 col-md-4 col-lg-4 card">
              
    <a href="${repo.live_link}" target="_blank" class="btn btn-info uppercase">${repo.title}</a>
    <p>${repo.description}</p>
    <p>
      <a class="btn btn-info" href="${repo.code_link}" target="_blank">
      <i class="fab fa-github"></i>&nbsp CODE</a>
    </p>
  </div>
  `
        )
        .join("\n")
    )

    projectDivNL.innerHTML = `<div class="row row-table">${projectsNl}</div>`
    projectDivEN.innerHTML = `<div class="row row-table">${projectsEn}</div>`
  }

loadProjects()




loadProjects()
