'use strict';


async function generateThumbnail(repoName) {
  const textColor = 'FFDB70';  // Text color as per your request
  const backgroundColor = '2B2B2B';  // Background color as per your request
  const avatarUrl = `https://ui-avatars.com/api/?name=${repoName}&color=${textColor}&background=${backgroundColor}`;

  return avatarUrl;
}


const githubUsername = 'amrachraf6699';
const projectList = document.getElementById('project-list');
const loader = document.getElementById('loader');

// Function to fetch repos from GitHub
async function fetchRepositories() {
  // Show the loader while fetching data
  loader.style.display = 'block';

  try {
    const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`);

    // Check if the response is ok (status code 200)
    if (!response.ok) {
      // Log full response for debugging
      console.error('Error response from GitHub API:', response);
      const errorData = await response.json();
      console.error('Error details:', errorData);
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const repos = await response.json();
    console.log(repos);  // Log the response for debugging

    // Clear any existing project items
    projectList.innerHTML = '';

    // If no repos found
    if (repos.length === 0) {
      projectList.innerHTML = '<li>No repositories found.</li>';
    }

    // Loop through each repo and create the project item
    for (const repo of repos) {
      const projectItem = document.createElement('li');
      projectItem.classList.add('project-item');
      projectItem.setAttribute('data-filter-item', '');
      projectItem.setAttribute('data-category', 'web development');

      const thumbnailUrl = await generateThumbnail(repo.name);

      // Ensure display is set to block to override any display: none styles
      projectItem.style.display = 'block';

      projectItem.innerHTML = `
        <a href="${repo.html_url}" target="_blank">
          <figure class="project-img">
            <div class="project-item-icon-box">
              <ion-icon name="eye-outline"></ion-icon>
            </div>
            <img src="${thumbnailUrl}" alt="${repo.name}" loading="lazy">
          </figure>
          <h3 class="project-title">${repo.name}</h3>
        </a>
      `;

      // Append the new project item to the list
      projectList.appendChild(projectItem);
    }
  } catch (error) {
    console.error('Error fetching repositories:', error);  // Log any errors for debugging
    projectList.innerHTML = '<li>Error fetching repositories. Check console for details.</li>';
  } finally {
    // Hide the loader once done
    loader.style.display = 'none';
  }
}

// Call the function to fetch and display repositories
fetchRepositories();

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });


// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}