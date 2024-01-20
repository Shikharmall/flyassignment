const apiUrl = "https://api.github.com/users/USERNAME/repos";
const perPageOptions = [10, 25, 50, 100];
let perPage = 6; // Default number of repositories per page
let currentPage = 1;
let repositories = [];

function showLoader() {
  $("#loader").show();
  $("#notloader").hide();
}

function hideLoader() {
  $("#loader").hide();
  $("#notloader").show();
}

function renderRepositories() {
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const currentRepositories = repositories.slice(start, end);

  $("#repositories").empty();
  currentRepositories.forEach((repo) => {
    const topicsContent =
      repo.topics.length > 0
        ? repo.topics
            .map(
              (item, index) =>
                `<button type="button" class="btn btn-primary">${item}</button>`
            )
            .join(" ")
        : `<button type="button" class="btn btn-primary">No Topics</button>`;
    const repoElement = `<div class="col-md-6">
                            <div class="card mb-3">
                              <div class="card-body">
                                <h5 class="card-title text-primary">${
                                  repo.name || "No Repository Name"
                                }</h5>
                                <p class="card-text">${
                                  repo.description ||
                                  "No Repository Description"
                                }</p>
                                ${topicsContent}
                              </div>
                            </div>
                          </div>`;
    $("#repositories").append(repoElement);
  });

  // Add event listener for topics button
  $(".topics-btn").on("click", function () {
    const topics = $(this).data("topics");
    // Display topics in the modal or perform any other action
    console.log("Topics:", topics);
  });
}

function renderPagination() {
  const totalPages = Math.ceil(repositories.length / perPage);

  $("#pagination").empty();

  const paginationElement = $(
    '<nav aria-label="Page navigation example"><ul class="pagination"></ul></nav>'
  );

  // Previous button
  const prevButton = $(
    '<li class="page-item"><a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>'
  );
  prevButton.click(() => {
    if (currentPage > 1) {
      currentPage--;
      renderRepositories();
      renderPagination();
    }
  });
  paginationElement.find("ul").append(prevButton);

  for (let i = 1; i <= totalPages; i++) {
    const li = $(
      `<li class="page-item"><a class="page-link" href="#">${i}</a></li>`
    );
    if (i === currentPage) {
      li.addClass("active");
    }
    li.click(() => {
      currentPage = i;
      renderRepositories();
      renderPagination();
    });
    paginationElement.find("ul").append(li);
  }

  // Next button
  const nextButton = $(
    '<li class="page-item"><a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>'
  );
  nextButton.click(() => {
    if (currentPage < totalPages) {
      currentPage++;
      renderRepositories();
      renderPagination();
    }
  });
  paginationElement.find("ul").append(nextButton);

  $("#pagination").append(paginationElement);
}

function fetchRepositories(username) {
  showLoader();

  $.ajax({
    url: apiUrl.replace("USERNAME", username),
    method: "GET",
    success: (data) => {
      repositories = data.map((repo) => ({
        name: repo.name,
        description: repo.description,
        topics: repo.topics || [],
      }));

      hideLoader();
      renderRepositories();
      renderPagination();
    },
    error: (error) => {
      hideLoader();
      console.error("Error fetching repositories:", error);
    },
  });
}

$(document).ready(() => {
  fetchRepositories("johnpapa");
});
