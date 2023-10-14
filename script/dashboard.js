const currentPage = new URLSearchParams(location.search).get("page");
const $sidebarMenuItemLinks = document.querySelectorAll(".post-pages a");
const $mainContents = document.querySelectorAll("main > div");
const $allContent = document.querySelector("#all-content");
const $signOut = document.querySelector(".sign-out")
const $posts = document.querySelector(".posts");
const $deleteModalWrapper = document.querySelector(".delete-modal");
const $deleteModal = document.querySelector(".delete-popup");
const $deleteBtn = document.querySelector(".deleteBtn");

$sidebarMenuItemLinks.forEach((sidebarLink) => {
  if (sidebarLink.href.includes(currentPage)) {
    sidebarLink.setAttribute("aria-current", "page");
  }
}); 

$mainContents.forEach((content) => {
  if (content.dataset.contentName.includes(currentPage)) {
    content.style.display = "block";
  }
});
const userId = JSON.parse(atob(localStorage.getItem("user-token").split(".")[1])).id;

// Manage Posts
axios
  .get("http://localhost:3000/api/posts")
  .then((response) => renderProducts(response.data.data));

function renderProducts(data) {
  data.forEach((item) => {
    const $swiperSlide = document.createElement("div");
    $swiperSlide.classList.add("swiper-slide");
    $swiperSlide.innerHTML = `
        <div class="post w-[276px] h-[336px] border-2 border-[#F0DE36] bg-[#1e1e1e]">
              <img src="${
                item.image
              }" class="w-[100%]" style="height: 172px;" alt="" />
              <h3 class="text-[20px] text-left mt-[10px] mx-[10px] mb-[5px]">${item.title.slice(
                0,
                20
              )}</h3>
              <p class="mx-[10px] text-[13px] text-left">
                  ${item.description.slice(0, 100) + "..."}
              </p>
              <div class="flex gap-[17px] m-[10px]">
                <button class="btn bg-[#F5C147] text-[14px] w-[121px] h-[33px]">Edit</button>
                <button data-post-id="${item._id}" id="card-delete" class="btn  bg-[#CA3838] text-[14px] w-[121px] h-[33px]">Delete</button>
              </div>
          </div>
    `;
    $posts.appendChild($swiperSlide);
  });
  
}
$posts.addEventListener("click", (e) => {
  if (e.target.closest("#card-delete")) {
    $deleteModalWrapper.classList.add("active");
    $deleteModal.classList.add("active");
    $deleteBtn.setAttribute("data-post-id", e.target.dataset.postId);
  }
});
document.querySelector(".close-delete").addEventListener("click", () => {
  $deleteModalWrapper.classList.remove("active");
  $deleteModal.classList.remove("active");
});
$deleteBtn.addEventListener("click", (e) =>{
  const postId = e.target.dataset.postId
  axios
    .delete(`http://localhost:3000/api/posts/${postId}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("user-token")}`,
      },
    })
    .then((response) => console.log(response));
})




// async function fetchData(endpoint) {
//   const response = await axios.get(`http://localhost:3000/api${endpoint}`);
//   renderAllRealEstateData(response.data);
// }

// function renderAllRealEstateData(data) {
//   const $allRealEstateFrgament = document.createDocumentFragment();
//   data.map((realestate) => {
//     const $realEstateCardItem = document.createElement("div");
//     $realEstateCardItem.className = "real-estate__card-item";
//     $realEstateCardItem.innerHTML = `
//             <img src="${realestate.imageUrls[0]}" alt="${
//       realestate.description
//     }">
//             <h3>${realestate.name}</h3>
//             <p>${realestate.description.split(" ").slice(0, 20)}</p>
//             <strong>$${realestate.regularPrice}</strong>
//             <div class="card__button-wrapper">
//                 <button>Edit</buttton>
//                 <button id="card-delete">Delete</button>
//             </div>
//         `;
//     $allRealEstateFrgament.appendChild($realEstateCardItem);
//   });
//   $allContent.appendChild($allRealEstateFrgament);
// }

$signOut.addEventListener("click", () => {
  document.querySelector(".popup").classList.add("active");
  document.querySelector(".popup-modal").classList.add("active");
});
document.querySelector(".close-popup").addEventListener("click", () => {
  document.querySelector(".popup").classList.remove("active");
  document.querySelector(".popup-modal").classList.remove("active");
})
document.querySelector(".signOutBtn").addEventListener("click", () => {
  window.localStorage.clear();
});
// switch (currentPage) {
//   case "all":
//     fetchData("/listing/get");
//     break;
// }
