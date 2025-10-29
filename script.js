const API_URL = "https://api.pokemontcg.io/v2";
const LOG_API_BASE = "https://www.piway.com.br/unoesc/api";
const MATRICULA = "447676";

const cardsContainer = document.getElementById("cards");
const setList = document.getElementById("setList");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const viewLogsBtn = document.getElementById("viewLogsBtn");
const logModal = document.getElementById("logModal");
const closeModal = document.getElementById("closeModal");
const logList = document.getElementById("logList");

// Função para registrar log
function registrarLog(api, metodo, resultado) {
  const url = `${LOG_API_BASE}/inserir/log/${MATRICULA}/${api}/${metodo}/${encodeURIComponent(resultado)}`;
  fetch(url)
    .then(res => res.text())
    .then(msg => console.log("LOG registrado:", msg))
    .catch(err => console.error("Erro ao registrar log:", err));
}

// Buscar cartas
searchBtn.addEventListener("click", () => {
  const name = searchInput.value.trim();
  if (name) {
    fetch(`${API_URL}/cards?q=name:${name}`)
      .then(res => res.json())
      .then(data => {
        showCards(data.data);
        registrarLog("Pokémon TCG API", "Buscar Cartas", `${data.data.length} resultados`);
      })
      .catch(err => console.error(err));
  }
});

// Carregar sets
function loadSets() {
  fetch(`${API_URL}/sets`)
    .then(res => res.json())
    .then(data => {
      data.data.slice(0, 10).forEach(set => {
        const li = document.createElement("li");
        li.textContent = `${set.name} (${set.releaseDate})`;
        setList.appendChild(li);
      });
      registrarLog("Pokémon TCG API", "Listar Sets", "10 coleções carregadas");
    })
    .catch(err => console.error(err));
}

// Carregar cartas aleatórias
function loadRandomCards() {
  fetch(`${API_URL}/cards?pageSize=6`)
    .then(res => res.json())
    .then(data => {
      showCards(data.data);
      registrarLog("Pokémon TCG API", "Cartas Aleatórias", "6 cartas carregadas");
    })
    .catch(err => console.error(err));
}

// Exibir cartas
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

// Exibir logs
viewLogsBtn.addEventListener("click", () => {
  fetch(`${LOG_API_BASE}/logs/${MATRICULA}`)
    .then(res => res.json())
    .then(data => {
      logList.innerHTML = "";
      data.forEach(log => {
        const li = document.createElement("li");
        li.textContent = `[${log.id}] ${log.api} - ${log.metodo} => ${log.resultado}`;
        const btnDel = document.createElement("button");
        btnDel.textContent = "Excluir";
        btnDel.onclick = () => excluirLog(log.id);
        li.appendChild(btnDel);
        logList.appendChild(li);
      });
      logModal.style.display = "block";
    })
    .catch(err => console.error("Erro ao exibir logs:", err));
});

// Excluir log
function excluirLog(id) {
  fetch(`${LOG_API_BASE}/excluir/log/${id}/aluno/${MATRICULA}`)
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      registrarLog("Logs API", "Excluir Log", `Log ${id} excluído`);
      viewLogsBtn.click();
    })
    .catch(err => console.error("Erro ao excluir log:", err));
}

// Fechar modal
closeModal.onclick = () => logModal.style.display = "none";
window.onclick = e => { if (e.target === logModal) logModal.style.display = "none"; };

loadRandomCards();
loadSets();
