const URL = "https://striveschool-api.herokuapp.com/api/product/";
const APY_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0NzlmYzFjMjUwNDAwMTUxYWI2NTIiLCJpYXQiOjE3NDYxNzI0MTIsImV4cCI6MTc0NzM4MjAxMn0.1Dju6Fggu44sjbpV_zUO5Dr0iwLbi8aDcjr6lub0Bxo";

const dataProducts = () => {
  fetch(URL, {
    headers: {
      Authorization: `Bearer ${APY_KEY}`,
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("Errore generico");
      }
      return resp.json();
    })
    .then((data) => {
      console.log(data);

      const containerCard = document.getElementById("cardContainer");

      data.forEach((items) => {
        //DIV-CONTAINER
        const divCol = document.createElement("div");
        divCol.className = "col-12 col-sm-4 col-md-3 d-flex";

        //DIV-CARD
        const divCard = document.createElement("div");
        divCard.className = "card text-dark border-1 h-100 d-flex flex-column";
        divCard.style.maxWidth = " 18rem";
        //IMG
        const img = document.createElement("img");
        img.src = items.imageUrl;
        img.className = "card-img-top";
        img.alt = items.name;

        //CARD-BODY
        const divBody = document.createElement("div");
        divBody.className = "card-body d-flex flex-column";
        const h5 = document.createElement("h5");
        h5.className = "card-title";
        h5.innerHTML = items.name;
        const p = document.createElement("p");
        p.className = "card-text";
        p.innerHTML = items.description;
        const a = document.createElement("a");
        a.href = `./details.html?phoneId=${items._id}`;
        a.className = "btn btn-warning mt-auto";
        a.innerHTML = "Modifica";

        divBody.append(h5, p, a);

        divCard.append(img, divBody);
        divCol.appendChild(divCard);
        containerCard.appendChild(divCol);
      });
    })
    .catch((error) => console.log(error));
};

window.onload = () => {
  dataProducts();
};
