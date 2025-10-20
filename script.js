const API_URL = "https://api.pokemontcg.io/v2";
const headers = { "X-Api-Key": "" };

const cardsContainer = document.getElementById("cards");
const setList = document.getElementById("setList");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", () => {
  const name = searchInput.value.trim();
  if (name) {
    fetch(`${API_URL}/cards?q=name:${name}`, { headers })
      .then(res => res.json())
      .then(data => showCards(data.data))
      .catch(err => console.error(err));
  }
});

function loadSets() {
  fetch(`${API_URL}/sets`, { headers })
    .then(res => res.json())
    .then(data => {
      data.data.slice(0, 10).forEach(set => {
        const li = document.createElement("li");
        li.textContent = `${set.name} (${set.releaseDate})`;
        setList.appendChild(li);
      });
    })
    .catch(err => console.error(err));
}

function loadRandomCards() {
  fetch(`${API_URL}/cards?pageSize=6`, { headers })
    .then(res => res.json())
    .then(data => showCards(data.data))
    .catch(err => console.error(err));
}

function showCards(cards) {
  cardsContainer.innerHTML = "";
  cards.forEach(card => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <img src="${card.images.small}" alt="${card.name}">
      <h3>${card.name}</h3>
      <p>Raridade: ${card.rarity || "Desconhecida"}</p>
      <p>Tipo: ${card.types ? card.types.join(", ") : "N/A"}</p>
    `;
    cardsContainer.appendChild(div);
  });
}

loadRandomCards();
loadSets();
