const apiUrlForUserDetails = "https://api.github.com/users/{user}";


function renderUserDetails() {
    const userImageElement = `
    <img src="${userDetails.avatar_url}" alt="profile-pic" class="img-thumbnail rounded-circle"
      style="width: 200px; height: 200px;">`;
    $("#userImage").prepend(userImageElement);
  
    const userDetailsElement = `<div class="m-2 ml-10" style="margin-left: 20px;">
                                  <h2>${userDetails.name}</h2>
                                  <p>${userDetails.bio || "No bio available"}</p>
                                  <p class="d-flex align-items-center">
                                    <svg fill="#000000" width="20px" height="20px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M17.657 5.304c-3.124-3.073-8.189-3.073-11.313 0-3.124 3.074-3.124 8.057 0 11.13l5.656 5.565 5.657-5.565c3.124-3.073 3.124-8.056 0-11.13zm-5.657 8.195c-.668 0-1.295-.26-1.768-.732-.975-.975-.975-2.561 0-3.536.472-.472 1.1-.732 1.768-.732s1.296.26 1.768.732c.975.975.975 2.562 0 3.536-.472.472-1.1.732-1.768.732z" />
                                    </svg>
                                    <span class="ml-5" style="padding-left: 10px;">${
                                      userDetails.location ||
                                      "No location available"
                                    }</span>
                                  </p>
                                  <p > <a href="https://twitter.com/${
                                    userDetails.twitter_username
                                  }" target="_blank" style="text-decoration:none; color: #323232;">Twitter: https://twitter.com/${
                                    userDetails.twitter_username ||
                                    "No Twitter Link"
    }</a></p>
                                </div>`;
    $("#userdetailsdiv").prepend(userDetailsElement);
  
    const userLinkElement = `<a href=${userDetails.html_url} style="text-decoration:none; color: #323232;"><svg fill="#000000" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd"
      d="M14,9 L14,7 L18,7 C20.7614237,7 23,9.23857625 23,12 C23,14.7614237 20.7614237,17 18,17 L14,17 L14,15 L18,15 C19.6568542,15 21,13.6568542 21,12 C21,10.3431458 19.6568542,9 18,9 L14,9 Z M10,15 L10,17 L6,17 C3.23857625,17 1,14.7614237 1,12 C1,9.23857625 3.23857625,7 6,7 L10,7 L10,9 L6,9 C4.34314575,9 3,10.3431458 3,12 C3,13.6568542 4.34314575,15 6,15 L10,15 Z M7,13 L7,11 L17,11 L17,13 L7,13 Z" />
  </svg> <span>${userDetails.html_url}</span> </a>`;
    $("#githubLink").prepend(userLinkElement);
  }
  
  function fetchUserDetails(username) {
    $.ajax({
      url: apiUrlForUserDetails.replace("{user}", username),
      method: "GET",
      success: (data) => {
        userDetails = {
          name: data.name || username,
          bio: data.bio,
          html_url: data.html_url,
          location: data.location,
          twitter_username: data.twitter_username,
          avatar_url: data.avatar_url
        };
  
        renderUserDetails();
      },
      error: (error) => {
        console.error("Error fetching user details:", error);
      },
    });
  }

  $(document).ready(() => {
    fetchUserDetails("johnpapa");
  });