// Set global variables
let students = document.querySelectorAll(".student-list li");
let itemsPerPage = 10;
let pages = document.createElement("div");
let noResultsText = document.createElement("h3");
let filterText;;
let filteredStudentList;

// Render student list with set items per page
function showPage(list, page) {
  let start = (page * itemsPerPage) - itemsPerPage;
  let stop = page * itemsPerPage;

  // Show 10 students on current page, hide the other pages students
  list.forEach(function (item, index) {
    if (index >= start && index < stop) {
      item.style.display = null;
    } else {
      item.style.display = "none";
    }
  });
}

// Create numbered page links for each grouping students in full list
function appendPageLinks(list) {
  let numberOfPages = Math.ceil(list.length / itemsPerPage);

  pages.className = "pagination";

  document.querySelector(".page").append(pages);
  let pageList = document.createElement("ul");
  pages.append(pageList);

  // Create page link for each grouping of students
  for (let i = 1; i <= numberOfPages; i++) {
    let pageItem = document.createElement("li");
    let pagelink = document.createElement("a");
    pagelink.textContent = i;
    pagelink.href = "#"

    pageItem.appendChild(pagelink);
    pageList.appendChild(pageItem);

    // Set page 1 as initial active link
    if (i == 1) {
      pagelink.className = "active";
    }

    // Add event listener for selecting and navigating to linked pages
    pagelink.addEventListener("click", (event) => {
      let items = pageList.getElementsByTagName("a");

      for (let i = 0; i < items.length; i++) {
        items[i].classList.remove("active");
      }

      event.target.className = "active";

      showPage(list, parseInt(event.target.text));
    });
  }
}

// Add real-time search functionality
function addSearch() {
  // Create search input and button
  let studentSearch = document.createElement("div");
  studentSearch.className = "student-search";
  let searchInput = document.createElement("input");
  searchInput.placeholder = "Search for students...";
  let searchButton = document.createElement("button");
  searchButton.textContent = "Search";

  // Add search elements to DOM
  studentSearch.appendChild(searchInput);
  studentSearch.appendChild(searchButton);
  document.querySelector(".page-header").appendChild(studentSearch);

  function filterSearchResults() {
    // Compare input text against each name in student list
    // Matched names are are added to search results
    filterText = searchInput.value;
    filteredStudentList = [];
    students.forEach((student) => {
      student.style.display = "none";
      let name = student.getElementsByTagName("h3")[0].textContent;
      if (name.indexOf(filterText) > - 1) {
        filteredStudentList.push(student);
      }
    })

    // Clear pagination links
    pages.innerHTML = '';
    pages.remove();

    // Show custom message if no matching search results
    if (filteredStudentList.length == 0) {
      document.querySelector(".page").appendChild(noResultsText);
      noResultsText.innerHTML = "There are no matching search results";
      showPage(filteredStudentList, 1);
    } else {
      noResultsText.innerHTML = '';
      showPage(filteredStudentList, 1);
      appendPageLinks(filteredStudentList);
    }
}

  // Add eventlistener for keyup within input field to filter search results
  searchInput.addEventListener("keyup", (event) => {
    event.preventDefault();
    filterSearchResults();
  })

  // Add eventlistener for clicking search button to filter search results
  searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    filterSearchResults();
  });
}

// Intitial function calls
showPage(students, 1);
appendPageLinks(students);
addSearch();
