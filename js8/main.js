// * ///////////////
// * render

let page = 1;

function render() {
  let container = document.querySelector(".container");
  container.innerHTML = "";

  fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`)
    .then((result) => result.json()) // получаем promise // todo что такое promise?
    .then((data) =>
      data.slice(0, 20).forEach((item) => {
        container.innerHTML += `
          <div class="card">
            <div class="card-header">
              <b>Post id: ${item.id}</b><br />
              <b>${item.title}</b>
            </div>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <p>${item.body}</p>
              </blockquote>
              <button
                type="button"
                class="btn btn-dark user-btn"
                id="authorId-${item.userId}"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                About author
              </button>
            </div>
          </div>
        `;
      })
    );
  addModalEvent();
}

render();

function writeAuthorObj(id) {
  let modal = document.querySelector(".modal-body");
  modal.innerHTML = `
    <div class="spinner-grow" role="status">
      <span class="visually-hidden"></span>
    </div>
  `;

  fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((result) => result.json())
    .then((data) => {
      setTimeout(() => {
        modal.innerHTML = "";
        modal.innerHTML = `
          <p><b>Author id</b>:${data.id}</p>
          <p><b>email</b>:${data.email}</p>
          <p><b>Name</b>:${data.name}</p>
          <p><b>Username</b>:${data.username}</p>
          `;
      }, 1000);
    });
}

function getPostAuthor(e) {
  let authorId = e.target.id[e.target.id.length - 1];
  writeAuthorObj(authorId);
}

function addModalEvent() {
  setTimeout(() => {
    let authorBtns = document.querySelectorAll(".user-btn");
    authorBtns.forEach((item) => {
      item.addEventListener("click", getPostAuthor);
    });
  }, 2000);
}


let nextPage = document.querySelector("#next-page");
let prevPage = document.querySelector("#prev-page");

function checkPage() {
  if (page === 1) {
    prevPage.style.display = "none";
    nextPage.style.display = "block";
  } else if (page === 10) {
    prevPage.style.display = "block";
    nextPage.style.display = "none";
  } else {
    prevPage.style.display = "block";
    nextPage.style.display = "block";
  }
}
checkPage();


nextPage.addEventListener("click", () => {
  page++;
  render();
  checkPage();
});
prevPage.addEventListener("click", () => {
  page++;
  render();
  checkPage();
});

// * ///////////////
// *home upload
let homeBtn = document.querySelector("#home-btn");
homeBtn.addEventListener("click", () => {
  page = 1;
  render();
  checkPage();
});