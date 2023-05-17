// const apiKey = "5a7e1f6e7bmsh6d39ab48a316edap179f01jsnf7042d5b88df";
// const jobID = "ps4lEfc1C2gAAAAAAAAAAA%3D%3D"; // Replace with your valid job ID
// const jobDetailsContainer = document.getElementById("jobDetails");

// document.addEventListener("DOMContentLoaded", fetchJobDetails);

// async function fetchJobDetails() {
//   const url = `https://jsearch.p.rapidapi.com/job-details?job_id=${jobID}&extended_publisher_details=false`;
//   const options = {
//     method: "GET",
//     headers: {
//       "X-RapidAPI-Key": apiKey,
//       "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
//     },
//   };

//   try {
//     const response = await fetch(url, options);
//     const result = await response.text();
//     displayJobDetails(result);
//   } catch (error) {
//     console.error(error);
//     jobDetailsContainer.textContent =
//       "An error occurred while fetching job details.";
//   }
// }

// function displayJobDetails(data) {
//   jobDetailsContainer.textContent = data;
//   console.log(data.Job_title);
// }
document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const jobResults = document.getElementById("job-results");

  function fetchJobs(searchQuery) {
    const url = `https://jsearch.p.rapidapi.com/search?query=${searchQuery}&page=1&num_pages=1`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "be705896bfmsh0d56807be257ba7p1696fejsn5ce586f497d4",
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // Check if data.data exists
        if (data.data && Array.isArray(data.data)) {
          // Clear previous job results
          jobResults.innerHTML = "";

          // Process and display the job results
          const jobs = data.data;
          const jobsString = jobs
            .map(
              (job) =>
                ` <h1>${job.employer_name}</h1>
                 <h1>${job.job_title}</h1>

                <p>${job.job_city}</p>
                <p>${job.job_country}</p>
                <p>${job.job_apply_link}</p>
              </div>`
            )

            .join("");

          jobResults.innerHTML = jobsString;
          console.log(jobsString);
        } else {
          jobResults.innerHTML = "<p>No job results found.</p>";
        }
      })
      .catch((error) => console.error(error));
  }

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchQuery = searchInput.value.trim();
    if (searchQuery) {
      fetchJobs(searchQuery);
    }
  });
});
