// Seleciona os elementos do HTML para manipulação posterior
const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

// Variável que armazena o ID ou nome do Pokémon atual
let searchPokemon = 1;

// Função assíncrona que busca os dados do Pokémon na API
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  // Verifica se a resposta da API foi bem-sucedida (status 200)
  if (APIResponse.status === 200) {
    const data = await APIResponse.json(); // Converte o JSON para objeto JS
    return data;
  }
}

// Função responsável por renderizar os dados do Pokémon na tela
const renderPokemon = async (pokemon) => {
  // Exibe mensagem de "Loading..." enquanto os dados são carregados
  pokemonName.innerHTML = 'Carregando...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon); // Chama a função que busca o Pokémon

  if (data) {
    // Se os dados foram encontrados, mostra a imagem e os dados do Pokémon
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;

    // Acessa o sprite animado da geração 5
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

    input.value = ''; // Limpa o campo de busca
    searchPokemon = data.id; // Atualiza o valor do Pokémon atual
  } else {
    // Caso o Pokémon não seja encontrado, mostra mensagem de erro
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Não encontrado :c';
    pokemonNumber.innerHTML = '';
  }
}

// Adiciona evento ao formulário para buscar o Pokémon digitado ao enviar
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Impede o recarregamento da página
  renderPokemon(input.value.toLowerCase()); // Chama a função com o valor digitado
});

// Adiciona funcionalidade ao botão de "anterior"
buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1; // Decrementa o ID
    renderPokemon(searchPokemon); // Exibe o Pokémon anterior
  }
});

// Adiciona funcionalidade ao botão de "próximo"
buttonNext.addEventListener('click', () => {
  searchPokemon += 1; // Incrementa o ID
  renderPokemon(searchPokemon); // Exibe o próximo Pokémon
});

// Mostra o primeiro Pokémon ao carregar a página
renderPokemon(searchPokemon);
