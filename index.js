const loadAllNews = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
    const data = await response.json();
    return data;
};


const setAllNews = async () => {

    const data = await loadAllNews();

    const menu = document.getElementById("all-menu");
    showSpinner(false);
    const uniqueArray = [];
    for (const news of data.data.news_category) {

        if (uniqueArray.indexOf(news.category_name) === -1) {

            uniqueArray.push(news.category_name);

            const li = document.createElement("li");
            li.innerHTML = `<a class="nav-link" onclick="loadNews('${news.category_id}')" href="#">${news.category_name}</a>`;
            menu.appendChild(li);
        }
    }


};

setAllNews();


const menus = document.getElementById("parent-news");

const categoriesCount = document.getElementById("categories-count");

const loadNews = async(id) =>{
menus.innerHTML = '';
showSpinner(true);
const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
const data = await response.json();
categoriesCount.innerText = `${data.data.length} items found for news`;

data.data.forEach(el => {
  const newDescription = el.details.slice(0, 150);
  const dots = el.details.length > 150 ? "..." : "";
  const id =el._id;
  const rowDiv = document.createElement('div');
  rowDiv.setAttribute('class', 'row')
  rowDiv.innerHTML = `
  <div class="row my-2">
  <div class="col-sm-4">
    <div class="card">
      <div class="card-body">
          <img src=${el.image_url} class="card-img-top flu" alt="aa">
      </div>
    </div>
  </div>
  <div class="col-sm-8">
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">${el.title}</h3>
        <p class="card-text">${newDescription} ${dots}</p>
      <div class="d-flex bd-highlight mb-3">
          <div>
          <p>${el.author.name}</p>
          <p>${el.author.published_date}</p>
          </div>
          <div class="ms-auto p-2 bd-highlight">Total view: ${el.total_view}</div>
          <div class="ms-auto p-2 bd-highlight">  <button onclick="loadProduct('${id}')" class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button></div>
        </div>
      
      </div>
    </div>
  </div>
</div>
  `
  menus.appendChild(rowDiv)
});

};

const loadProduct = (id) => {
  const productDetails = document.getElementById("product-details");
  const productTitle = document.getElementById("product-title");
  fetch(`https://openapi.programming-hero.com/api/news/${id}`)
    .then((res) => res.json())
    .then((data) => showProductDetails(data))
    .catch((err) => console.log(err));
};

const showProductDetails = (data) => {

  const productDetails = document.getElementById("product-details");
  const productTitle = document.getElementById("product-title");
  const newDescription = data.data[0].details.slice(0, 150);
  const dots = data.data[0].details.length > 150 ? "..." : "";
  productTitle.innerText = '';
  productDetails.innerHTML = `
  <img
              src=${data.data[0].image_url}
              alt=""
              class="img-fluid"
            />
           
            <p>${newDescription} ${dots}</p>
            <div>
            <div class="d-flex bd-highlight mb-3">
            <div>
            <p>${data.data[0].author.name}</p>
            <p>${data.data[0].author.published_date}</p>
            </div>
            <div class="ms-auto p-2 bd-highlight">${data.data[0].rating.badge}</div>
            <div class="ms-auto p-2 bd-highlight">Total view: ${data.data[0].total_view}</div>
          </div>
            </div>
        
  `;
};


const showSpinner = (isLoading = false) => {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.add("d-block");
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
    spinner.classList.remove("d-block");
  }
};