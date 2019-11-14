function userInformationHTML(user) {
  return `
      <div class="gh-content row">
          <div class="gh-user col-md-4">
          <h3>Github: 
            <a href="${user.html_url}" target="_blank">${user.login}</a>
          </h3>
          <a href="${user.html_url}" target="_blank">
            <img src="${user.avatar_url}" alt="${user.login}" />
          </a>
          <p class=>Followers / Gebruikers die mij volgen: ${
                user.followers
              }<br>Following / Gebruikers die ik volg: ${user.following} <br> Repos: ${
    user.public_repos
  }</p>
          </div>
          
          <div id="gh-repo-data" class="clearfix col-md-8"></div>
      </div>`;
}

function repoInformationHTML(repos) {
  if (repos.length == 0) {
    return `<div class="clearfix repo-list">No repos!</div>`;
  }

  var listItemsHTML = repos.map(function(repo) {
    if (repo.homepage != null) {
      return `<tr>
                <th>
                <a href="${repo.html_url}" target="_blank" class="btn btn-info">${repo.name}</a>
                </th>
                <td>${repo.description}</td>
                <td>${repo.language}</td>
                <td>
                   <a href="${repo.homepage}" target="_blank" class="btn btn-info">Website</a>
                </td>
              </tr>`;
    }
  });

  var listItemsMobile = repos.map(function(repo) {
    if (repo.homepage != null) {
      return `<div class="col-xs-12 col-sm-6 card">
              
              <a href="${repo.html_url}" target="_blank" class="btn btn-info uppercase">${repo.name}</a>
              
              <p>${repo.description}</p>
              <p>${repo.language}</p>
              <p>
                <a class="btn btn-info" href="${
                  repo.homepage
                }" target="_blank">Website</a>
              </p>
            </div>
            `;
    }
  });

  return `<div class="clearfix repo-list container-fluid">
              <table class="large-screen">
                <tr class="en">
                  <th>Repo Name / Naam</th>
                  <th>Description / Omschrijving</th>
                  <th>Language / Taal</th>
                  <th>View this site / Bekijk de website</th>
                </tr>
                
                  ${listItemsHTML.join("\n")}
              </table>
              <div class="row mobile">
                  ${listItemsMobile.join("\n")}
              </div>
          </div>`;
}

function fetchGitHubInformation(event) {
  $("#gh-user-data").html("");
  $("#gh-repo-data").html("");
  var username = "wings30306";

  $("#gh-user-data").html(
    `<div id="loader">
      <img src="https://i.gifer.com/D1iW.gif" alt="loading..." />
    </div>`
  );

  $.when(
    $.getJSON(`https://api.github.com/users/${username}`),
    $.getJSON(`https://api.github.com/users/${username}/repos`)
  ).then(
    function(firstResponse, secondResponse) {
      var userData = firstResponse[0];
      var repoData = secondResponse[0];
      $("#gh-user-data").html(userInformationHTML(userData));
      $("#gh-repo-data").html(repoInformationHTML(repoData));
    },
    function(errorResponse) {
      if (errorResponse.status === 404) {
        $("#gh-user-data").html(`<h3>No info found for user ${username}</h3>`);
      } else if (errorResponse.status === 403) {
        var resetTime = new Date(
          errorResponse.getResponseHeader("X-RateLimit-Reset") * 1000
        );
        $("#gh-user-data").html(
          `<h4>Too many requests, please wait until ${resetTime.toLocaleTimeString()}</h4>`
        );
      } else {
        console.log(errorResponse);
        $("#gh-user-data").html(
          `<h2>Error: ${errorResponse.responseJSON.message}</h2>`
        );
      }
    }
  );
}

$(document).ready(fetchGitHubInformation);
