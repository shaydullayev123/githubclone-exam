"use strict";

const reposList = document.querySelector(".repos-list");
const reposUrl = "https://api.github.com/users/rasulbek19/repos";
const owerview = document.querySelector("#main");
const repoBtn = document.querySelector("#repo");
const searchbox = document.querySelector("#inputbox"),
  btns = document.querySelector("#btns"),
  cardWrap = document.querySelector(".card_wrapper");

const URL = "https://api.github.com/search/users?q=";

repoBtn.onclick = () => {
  window.location.href = "./repositories.html";
};

owerview.onclick = () => {
  window.location.href = "./index.html";
};

searchbox.addEventListener("keypress", setUser);

function setUser(e) {
  if (e.keyCode === 13) {
    getUser(searchbox.value);
    searchbox.value = "";
  }
}

// getter repos

const getData2 = async () => {
  fetch(reposUrl)
    .then((res) => res.json())
    .then((data) => renderUrl(data))
    .catch((error) => {
      console.log(error);
    });
};

const renderUrl = (data) => {
  reposList.innerHTML = data
    ?.map(
      (item) => `       
      
      
      <div class="repos-card">
      <hr />
      <div
        class="title d-flex align-items-center justify-content-between"
      >
        <div class="title-left">
          <a href="${item.html_url}">${item.name}</a>
          <span>${item.visibility}</span>
        </div>
        <div class="title-right">
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span
                ><svg
                  aria-hidden="true"
                  height="20"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="20"
                  fill="rgba(197, 194, 194, 0.319)"
                  data-view-component="true"
                  class="octicon octicon-star d-inline-block mr-2"
                >
                  <path
                    d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"
                  ></path></svg
              ></span>
              <span>Star</span>
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li>
                <a class="dropdown-item" href="#">Another action</a>
              </li>
              <li>
                <a class="dropdown-item" href="#"
                  >Something else here</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="description">
        <div class="des-left">
          <span class="signOflang"></span>
          <span>HTML</span>
          <span class="time">Updated last week</span>
        </div>
        <div class="des-right">
          <span></span>
        </div>
      </div>
    </div>


`
    )
    .join("");
};

getData2();

// getter

async function getUser(query) {
  const req = await fetch(`${URL}${query}`);
  const res = await req.json();

  console.log(res);

  sendDisplay(res.items);
}

function sendDisplay(user) {
  cardWrap.innerHTML = "";

  user.map((item) => {
    const card = document.createElement("div");
    card.classList.add("user-item");

    card.dataset.id = item.login;

    console.log(card);

    card.innerHTML = `
               <div class=" bg-secondary text-light user-card p-3  d-flex flex-row justify-content-between align-items-center w-100 mt-2 ">

                    <div class="d-flex align-items-center ">
                        <img src="${item.avatar_url}"
                            class="user d-block" alt="">

                        <div class="info mx-1 px-2">
                            <h4>${item.login}</h4>
                        </div>

                    </div>

                    <a href="${item.html_url}" class="text-white">
                        <button class="btn btn-success">
                            view
                        </button>
                    </a>

                </div>

              `;

    cardWrap.prepend(card);
  });

  setProfile();
}

// profil list

async function setProfile(user) {
  console.log(user);

  const useritem = cardWrap.querySelectorAll(".user-item");

  useritem.forEach((item) => {
    console.log(item.dataset.id);

    item.addEventListener("click", async () => {
      const data = await fetch(
        `https://api.github.com/users/${item.dataset.id}`
      );
      const res = await data.json();
      console.log(res);
      sendProfile(res);
    });
  });
}

function sendProfile(sms) {
  const {
    avatar_url,
    bio,
    blog,
    company,
    created_at,
    followers,
    following,
    location,
    login,
    name,
    public_repos,
    public_gists,
    twitter_username,
    type,
    updated_at,
    subscriptions_url,
    email,
  } = sms;

  const personCard = document.createElement("div");
  personCard.classList.add("person");
  // personCard.

  personCard.innerHTML = `

    <div class="row d-flex container justify-content-between">
    <div class="col-4 d-flex flex-column justify-content-center align-items-center p-4 card ">
        <img class="rounded rounded-circle img"
            src="${avatar_url}"
            alt="avatar">

        <h4 class="mt-2">${name}</h4>
        <p class="mb-3">${login}</p>

        <p class="bioProfile">${bio}</p>
        <button class="edit-profile">Edit profile</button>


        <div class="row w-100 ">
            <div class="col-6 ">
                <i class="bi bi-people"></i> <span class="fw-bold">${followers}</span> Followers
            </div>

            <div class="col-6 mb-4">
                <span class="fw-bold">${following}</span> Following
            </div>

            <div class="col-12">
                <ul class="list-unstyled">
                    <li><i class="bi bi-building"></i> ${company}</li>
                    <li><i class="bi bi-geo-alt"></i> ${location}</li>
                    <li><i class="bi bi-envelope"></i> ${
                      email ? email : " "
                    }</li>
                    <li><i class="bi bi-link"></i>${blog}</li>
                    <li> <i class="bi bi-twitter"> </i>${twitter_username}</li>
                </ul>
            </div>


        </div>



    </div>


    <div class="col-8 p-3 ">

    <div class="action-side">
    <div
      class="header-text d-flex justify-content-between align-items-center"
    >
      <h4>Popular repositories</h4>
      <p>Customize your pins</p>
    </div>
    <div class="cards d-flex justify-content-between align-items-center">
      <div class="card">
        <div class="text-line-1">
          <a href="${item.html_url}">${item.name}</a>
          <span>${item.visibility}</span>
        </div>
        <div class="text-line-2">
          <p>${item.description}</p>
        </div>
        <div class="text-line-3">
          <p>
            <span class="signOflang"></span>
            <span>${item.language}</span>
          </p>
        </div>
      </div>
      <div class="card">
        <div class="text-line-1">
          <a href="${item.html_url}">${item.name}</a>
          <span>${item.visibility}</span>
        </div>
        <div class="text-line-2">
        </div>
        <div class="text-line-3">
          <p>
          </p>
        </div>
      </div>
    </div>
  </div>

    </div>


</div>





    `;

  cardWrap.prepend(personCard);
}

//! repos
