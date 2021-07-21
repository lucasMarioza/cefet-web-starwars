// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.dev/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução

const API_ENDPOINT = 'https://swapi.dev/api'

import { play } from './music.js';
import { restartAnimation } from './restart-animation.js';

play(
  {
    audioUrl: 'audio/tema-sw.mp3',
    coverImageUrl: 'imgs/logo.svg',
    title: 'Intro',
    artist: 'John Williams',
  },
  document.body
);

const listaFilmes = document.querySelector('#filmes ul');
const elementoIntro = document.querySelector('pre.introducao');

const NUMERO_PARA_ROMANO = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
  6: 'VI',
}

function preparaEpisodio(numEpisodio){
  const epRomano = NUMERO_PARA_ROMANO[numEpisodio].padEnd(3, ' ');
  return `EPISODE ${epRomano}`;
}

function preparaTitulo(titulo, numEpisodio) {
  return `${preparaEpisodio(numEpisodio)} - ${titulo}`;
}

function mudaIntro(episodio, titulo, conteudo) {
  const intro = document.createTextNode(`
    ${preparaEpisodio(episodio)}\n
    ${titulo}\n
    ${conteudo}
  `);
  return () => {
    elementoIntro.innerHTML = '' 
    elementoIntro.appendChild(intro);
    restartAnimation(elementoIntro);
  }
}

function insereFilme({ title, episode_id, opening_crawl }) {
  let titulo = document.createTextNode(preparaTitulo(title, episode_id));
  let elementoLista = document.createElement('li');
  elementoLista.appendChild(titulo);
  elementoLista.addEventListener('click', mudaIntro(episode_id, title, opening_crawl));
  listaFilmes.appendChild(elementoLista);
}

fetch(`${API_ENDPOINT}/films`)
  .then(response => response.json())
  .then(({ results }) => results.forEach(insereFilme));
