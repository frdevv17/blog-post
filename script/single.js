const postURL = new URLSearchParams(window.location.search).get("postId");

axios(`http://localhost:3000/api/posts/${postURL}`)
  .then((res) => singlePost(res.data))
function singlePost(data){
    const containerWrapper = document.createElement("div");
    containerWrapper.classList.add('single-post', 'w-[1040px]',  'm-auto', 'text-white')
    containerWrapper.innerHTML = `
        <div class="post-section text-white">
                <div class="title flex justify-between items-center mt-[30px] mb-[15px]">
                    <h1 class="text-white text-3xl">${data.title}</h1>
                    <h3>${btoa(data.category)}</h3>
                </div>
                <img src="${data.image}" class="w-[100%] h-[400px] my-[10px]" alt="">
                <p class="text-[18px] m-[50px]">
                    ${data.description}
                </p>
            </div>
        `;
    document.querySelector(".single").appendChild(containerWrapper);
}
if (typeof localStorage.getItem("user-token") === "string") {
    document.querySelector(".nav-ul").style.display = "none";
    document.querySelector(".dashboard-link").style.display = "block";
}