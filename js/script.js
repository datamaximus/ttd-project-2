const students = document.querySelectorAll(".student-list li");
const itemsPerPage = 10;
let pages = document.createElement("div");
let noResultsText = document.createElement("h3");

function showPage(list, page) {
  let start = (page * itemsPerPage) - itemsPerPage;
  let stop = page * itemsPerPage;

  list.forEach(function (item, index) {
    if (index >= start && index < stop) {
      item.style.display = null;
    } else {
      item.style.display = "none";
    }
  });
}

function appendPageLinks(list) {
  let numberOfPages = Math.ceil(list.length / itemsPerPage);


  pages.className = "pagination";

  document.querySelector(".page").append(pages);
  let pageList = document.createElement("ul");
  pages.append(pageList);

  for (let i = 1; i <= numberOfPages; i++) {
    let pageItem = document.createElement("li");

    let pagelink = document.createElement("a");
    pagelink.textContent = i;
    pagelink.href = "#"

    pageItem.appendChild(pagelink);
    pageList.appendChild(pageItem);

    if (i == 1) {
      pagelink.className = "active";
    }

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

function addSearch() {
  let studentSearch = document.createElement("div");
  studentSearch.className = "student-search";

  let searchInput = document.createElement("input");
  searchInput.placeholder = "Search for students...";

  let searchButton = document.createElement("button");
  searchButton.textContent = "Search";

  studentSearch.appendChild(searchInput);
  studentSearch.appendChild(searchButton);

  document.querySelector(".page-header").appendChild(studentSearch);

  searchInput.addEventListener("keyup", (event) => {
    event.preventDefault();

    let filterText = searchInput.value;
    let filteredStudentList = [];
    students.forEach((student) => {
      student.style.display = "none";
      let name = student.getElementsByTagName("h3")[0].textContent;
      if (name.indexOf(filterText) > -1) {
        filteredStudentList.push(student);
      }
    })

    pages.innerHTML = '';
    pages.remove();

    if (filteredStudentList.length == 0) {
      document.querySelector(".page").appendChild(noResultsText);
      noResultsText.innerHTML = "There are no matching search results";
      showPage(filteredStudentList, 1);
    } 
    
    else {
      noResultsText.innerHTML = '';
      showPage(filteredStudentList, 1);
      appendPageLinks(filteredStudentList);
    }

  })

  searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    let filterText = searchInput.value;
    let filteredStudentList = [];
    students.forEach((student) => {
      student.style.display = "none";
      let name = student.getElementsByTagName("h3")[0].textContent;
      if (name.indexOf(filterText) > -1) {
        filteredStudentList.push(student);
      }
    })

    pages.innerHTML = '';
    pages.remove();
    showPage(filteredStudentList, 1);
    appendPageLinks(filteredStudentList);
  });
}

showPage(students, 1);
appendPageLinks(students);
addSearch();
