
axios.get("http://localhost:3000/api/posts")
  .then(response => renderProducts(response.data.data))

function renderProducts(data){
  data.forEach(item => {
    console.log(item);
    const $swiperSlide = document.createElement("div")
    $swiperSlide.classList.add("swiper-slide")
    $swiperSlide.innerHTML = `
      <a href="./pages/single-post.html?postId=${item._id}">
        <div class="post w-[276px] h-[336px] border-2 border-[#F0DE36] bg-[#1e1e1e]">
              <img src="${
                item.image
              }" style="height: 172px;" alt="" />
              <h3 class="text-[20px] text-left mt-[10px] mx-[10px] mb-[5px]">${item.title.slice(
                0,
                20
              )}</h3>
              <p class="mx-[10px] text-[13px] text-left">
                  ${item.description.slice(0, 70) + "..."}
              </p>
              <div class="flex gap-[10px] mx-[10px] my-[15px]">
                  <img src="./img/author.svg" style="width: 40px;" alt="">
                  <div>
                      <h3 >${btoa(item.author).slice(0, 15)}</h3>
                      <p class="text-gray-400 text-left">${btoa(
                        item.category
                      ).slice(0, 7)}</p>
                  </div>
              </div>
          </div>
      </a>
    `;
    document.querySelector(".swiper-wrapper").appendChild($swiperSlide)
  })
}

if(typeof(localStorage.getItem("user-token")) === "string"){
  document.querySelector(".nav-ul").style.display = "none"
  document.querySelector(".dashboard-link").style.display = "block"
}