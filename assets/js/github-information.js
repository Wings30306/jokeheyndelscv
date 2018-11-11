function userInformationHTML (user) {
  return `
      <h3>Find me on Github 
          <span class="small-name">
              @ <a href="${user.html_url}" target="_blank">${user.login}</a>
          </span>
      </h3>
      <div class="gh-content">
          <div class="gh-avatar">
              <a href="${user.html_url}" target="_blank">
                  <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
              </a>
          </div>
          <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
      </div>`
}

function repoInformationHTML (repos) {
  if (repos.length == 0) {
    return `<div class="clearfix repo-list">No repos!</div>`
  }
  
  var listItemsHTML = repos.map(function (repo) {
    if (repo.homepage != null) {
    return `<tr>
                <th>
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </th>
                <td>${repo.description}</td>
                <td>${repo.language}</td>
                <td>
                   <a href="${repo.homepage}" target="_blank">Live site</a>
                </td>
              </tr>`
  }
  })

  var listItemsMobile = repos.map(function (repo) {
    if (repo.homepage != null) {
    return `<div class="col-xs-12 card">
              <h5>
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
              </h5>
              <p>${repo.description}</p>
              <p>${repo.language}</p>
              <p>
                <a class="btn btn-primary" href="${repo.homepage}" target="_blank">Live site</a>
              </p>
            </div>
            `
  }
  })

  return `<div class="clearfix repo-list container-fluid">
              <table class="large-screen">
                <tr>
                  <th>Repo Name</th>
                  <th>Description</th>
                  <th>Language</th>
                  <th>Deployed site</th>
                </tr>
                  ${listItemsHTML.join('\n')}
              </table>
              <div class="row mobile">
                  ${listItemsMobile.join('\n')}
              </div>
          </div>`
}

function fetchGitHubInformation (event) {
  $("#gh-user-data").html("")
  $("#gh-repo-data").html("")
  var username = "wings30306"

  $('#gh-user-data').html(
    `<div id="loader">
          <img src="assets/css/loader.gif" alt="loading..." />
      </div>`
  )

  $.when(
    $.getJSON(`https://api.github.com/users/${username}`),
    $.getJSON(`https://api.github.com/users/${username}/repos`)
  ).then(
    function (firstResponse, secondResponse) {
      var userData = firstResponse[0]
      var repoData = secondResponse[0]
      $('#gh-user-data').html(userInformationHTML(userData))
      $('#gh-repo-data').html(repoInformationHTML(repoData))
    },
    function (errorResponse) {
      if (errorResponse.status === 404) {
        $('#gh-user-data').html(`<h3>No info found for user ${username}</h3>`)
      } else if(errorResponse.status === 403) {
        var resetTime = new Date(errorResponse.getResponseHeader("X-RateLimit-Reset")*1000);
        $("#gh-user-data").html(
          `<h4>Too many requests, please wait until ${resetTime.toLocaleTimeString()}</h4>`
        )
      } else {
        console.log(errorResponse)
        $('#gh-user-data').html(
          `<h2>Error: ${errorResponse.responseJSON.message}</h2>`
        )
      }
    }
  )
}


$(document).ready(fetchGitHubInformation);