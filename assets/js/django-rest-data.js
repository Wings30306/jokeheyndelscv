const projectDiv = document.getElementById("project-content");


const url = "https://jh-portfolio-api.herokuapp.com/projects/";

async function loadProjects() {
  let projects = await fetch(url)
    .then(response => response.json())
    .then(data => data.results)
    .then(data =>
      data
        .map(
          (repo) => `
        <div class="col-12 col-sm-6 col-md-4 col-lg-4 card">
              
    <a href="${repo.code_link}" target="_blank" class="btn btn-info uppercase">${repo.title}</a>
    
    <p>${repo.description}</p>
    <p>
      <a class="btn btn-info" href="${repo.live_link}" target="_blank">Website</a>
    </p>
  </div>
  `
        )
        .join("\n")
    )

  projectDiv.innerHTML = projects
}



loadProjects()
