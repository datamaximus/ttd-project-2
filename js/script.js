/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
let students = document.querySelectorAll(".student-list li");

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

function showPage(list, page) {
  let start = page - 1;
  let stop = start + 9;

  if (page > 1) {
     start = start * 10;
     stop = start + 9;
  }

  list.forEach(function (item, index) {
    if (index >= start && index <= stop) {
      return;
    } else {
      item.style.display = "none";
    }
  });
}

showPage(students, 1);

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

function appendPageLinks(list) {
   let numberOfPages = Math.floor(list.length / 10);

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
   }
}

appendPageLinks(students);
// Remember to delete the comments that came with this file, and replace them with your own code comments.
