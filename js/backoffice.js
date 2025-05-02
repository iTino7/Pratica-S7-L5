const params = new URLSearchParams(window.location.search);
const id = params.get("phoneId");
console.log("ID " + id);
const URL = id
  ? "https://striveschool-api.herokuapp.com/api/product/" + id
  : "https://striveschool-api.herokuapp.com/api/product/";
const APY_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0NzlmYzFjMjUwNDAwMTUxYWI2NTIiLCJpYXQiOjE3NDYxNzI0MTIsImV4cCI6MTc0NzM4MjAxMn0.1Dju6Fggu44sjbpV_zUO5Dr0iwLbi8aDcjr6lub0Bxo";

const method = id ? "PUT" : "POST";

window.onload = () => {
  const subTitle = document.querySelector(".subTitle");
  const title = document.querySelector(".titleOffice");
  const buttonDelete = document.getElementById("buttonDelete");
  buttonDelete.addEventListener("click", () => {
    fetch(URL, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${APY_KEY}`,
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.ok) {
          alert("Hai eliminato correttamente il prodotto");
          window.location.assign("./backoffice.html");
        }
      })
      .catch((error) => console.log(error));
  });
  const buttonReset = document.getElementById("buttonReset");
  buttonReset.addEventListener("click", () => {
    form.reset();
  });

  if (id) {
    subTitle.innerText = "-Modifica risorsa";
    title.innerText = "Modifica Prodotto";
    buttonDelete.className = "d-block ms-2 btn btn-danger ";
    buttonReset.className = "d-block ms-2 text-white btn btn-warning";

    fetch(URL, {
      headers: {
        Authorization: `Bearer ${APY_KEY}`,
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((dataCell) => {
        document.getElementById("name").value = dataCell.name;
        document.getElementById("description").value = dataCell.description;
        document.getElementById("brand").value = dataCell.brand;
        document.getElementById("imageUrl").value = dataCell.imageUrl;
        document.getElementById("price").value = dataCell.price;
      })
      .catch((error) => console.log(error));
  } else {
    subTitle.innerHTML = "- Crea risorsa";
    title.innerHTML = "Crea Prodotto";
    buttonDelete.className = "d-none";
    buttonReset.className = "d-none";
  }
};

const form = document.getElementById("backOffice");

form.onsubmit = (e) => {
  e.preventDefault();
  const nameInput = document.getElementById("name");
  const descriptionInput = document.getElementById("description");
  const brandInput = document.getElementById("brand");
  const imageUrlInput = document.getElementById("imageUrl");
  const priceInput = document.getElementById("price");

  const newCellInfo = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    imageUrl: imageUrlInput.value,
    price: priceInput.value,
  };

  fetch(URL, {
    method: method,
    body: JSON.stringify(newCellInfo),
    headers: {
      Authorization: `Bearer ${APY_KEY}`,
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("errore");
      }
      return resp.json();
    })
    .then(form.reset())
    .catch((error) => console.log(error));

  console.log("Submit", newCellInfo);
};