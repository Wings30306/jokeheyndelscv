function userInformationHTML(user) {
  return `
      <div class="gh-content">
          <div class="gh-user">
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



function fetchGitHubInformation() {
  $("#gh-user-data").html("");
  $("#gh-repo-data").html("");

  $("#gh-user-data").html(
    `<div id="loader">
      <img src="https://i.gifer.com/D1iW.gif" alt="loading..." />
    </div>`
  );

  $.when(
    $.getJSON(`https://api.github.com/users/wings30306`),
    $.getJSON(`https://api.github.com/users/wings30306/repos`)
  ).then(
    function(firstResponse) {
      var userData = firstResponse[0];
      $("#gh-user-data").html(userInformationHTML(userData));
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
