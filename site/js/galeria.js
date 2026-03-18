let filtrosAtivos = [];

/* ativar/desativar filtros */
document.querySelectorAll(".tag").forEach(tag => {
  tag.addEventListener("click", () => {
    const valor = tag.dataset.tag;

    if (tag.classList.contains("selected")) {
      tag.classList.remove("selected");
      filtrosAtivos = filtrosAtivos.filter(f => f !== valor);
    } else {
      tag.classList.add("selected");
      filtrosAtivos.push(valor);
    }

    carregarGaleria(); // recarrega exibindo somente o que combina
  });
});

async function carregarGaleria() {
  try {
    const resposta = await fetch("galeria.json");
    const dados = await resposta.json();

    const container = document.getElementById("galeria-container");
    container.innerHTML = ""; // limpar antes de recriar

    dados.decadas.forEach(decada => {
      // aplicar filtros
      const fotosFiltradas = decada.fotos.filter(foto => {
        if (filtrosAtivos.length === 0) return true; // sem filtros = tudo
        return filtrosAtivos.every(tag => foto.tags.includes(tag));
      });

      // pular década se nenhuma imagem combinou
      if (fotosFiltradas.length === 0) return;

      // título da década
      const titulo = document.createElement("h2");
      titulo.classList.add("decada-titulo");
      titulo.textContent = decada.ano;
      container.appendChild(titulo);

      // grid
      const grid = document.createElement("div");
      grid.classList.add("fotos-grid");

      fotosFiltradas.forEach(foto => {
        const card = document.createElement("div");
        card.classList.add("foto-card");

        card.innerHTML = `
          <img src="${foto.imagem}" alt="${foto.descricao}">
          <div class="foto-ano">${foto.ano}</div>
          <div class="foto-desc">${foto.descricao}</div>
        `;

        grid.appendChild(card);
      });

      container.appendChild(grid);
    });

  } catch (erro) {
    console.error("Erro ao carregar galeria:", erro);
  }
}

carregarGaleria();
