const params = new URLSearchParams(window.location.search);
const id = params.get("phoneId");

const URL = "https://striveschool-api.herokuapp.com/api/product/" + id;

const APY_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0NzlmYzFjMjUwNDAwMTUxYWI2NTIiLCJpYXQiOjE3NDYxNzI0MTIsImV4cCI6MTc0NzM4MjAxMn0.1Dju6Fggu44sjbpV_zUO5Dr0iwLbi8aDcjr6lub0Bxo";

fetch(URL, {
  headers: {
    Authorization: `Bearer ${APY_KEY}`,
    "Content-Type": "application/json",
  },
})
  .then((resp) => resp.json())
  .then((data) => {
    const container = document.getElementById("dataDetails");

    //CONTAINER-CARD
    const cardContainer = document.createElement("div");
    cardContainer.className = "card mt-5";
    cardContainer.style.width = "18rem";
    //IMG-CARD
    const img = document.createElement("img");
    img.src = data.imageUrl;
    img.className = "card-img-top";
    img.alt = data.name;
    //CARD-BODY
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    //H5-CARD-BODY
    const h5 = document.createElement("h5");
    h5.className = "card-title";
    h5.innerText = data.name;
    //P-CARD-BODY
    const p = document.createElement("p");
    p.className = "card-text";
    p.innerText = data.description;

    cardBody.append(h5, p);
    cardContainer.append(img, cardBody);
    container.appendChild(cardContainer);
  })
  .catch((error) => console.log(error));
