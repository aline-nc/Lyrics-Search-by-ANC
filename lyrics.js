//vamos chamar uma api para fazer essa busca de músicas
//Crio função que vai receber artista e musica
function findLyrics(artist, song) {
    //fetch é uma promise interna do JS que foi feita para tarzer conteúdo
    //de uma determinada url
    return fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);
    //então, eu vou retornar a promise toda!
}
//agora eu pego o formulário da interface e vou cancelar o comportamento default
//que seria enviar, fazer o submit. Vou cancelar e fazer uma função de submit
const form = document.querySelector('#lyrics_form');
form.addEventListener('submit', el => {
    el.preventDefault();
    doSubmit();
})
//função que vai fazer a chamada real no formulário
function doSubmit() {
    const lyrics_el = document.querySelector("#lyrics");
    const artist = document.querySelector("#artist");
    const song = document.querySelector("#song");

    lyrics_el.innerHTML = `<div class="spinner-grow" role="status"><span class="sr-only">Carregando...</span></div>`;

    findLyrics(artist.value, song.value)
    .then(response => response.json())
    .then(data => {
        if(data.lyrics) {
            lyrics_el.innerHTML = data.lyrics;
        }else {
            lyrics_el.innerHTML = data.error;
        }
    })
    .catch(err => {
        lyrics_el.innerHTML = `Ooops! ${err}`;
    })
}