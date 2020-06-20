let students = document.querySelectorAll(".student-list li");
const itemsPerPage = 10;

function showPage(list, page) {
  let start = (page * itemsPerPage) - itemsPerPage;
  let stop = page * itemsPerPage;

  list.forEach(function (item, index) {
    if (index >= start && index < stop) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

function appendPageLinks(list) {
   let numberOfPages = Math.ceil(list.length / itemsPerPage);

   let pages = document.createElement("div");
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

        showPage(students, parseInt(event.target.text));
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
    // console.log("it works");
  })

  searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    // console.log("it works too");
  });
}

showPage(students, 1);
appendPageLinks(students);
addSearch();
