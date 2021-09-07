async function getNomeFilm( nome) {
  document.getElementById('risultato').innerHTML = ""
  indirizzo = 'https://imdb8.p.rapidapi.com/title/find?q=';
  nome.split(' ').join('%20')
  const response = await fetch(this.indirizzo + nome, {
    method: "GET",
    headers: {
      'x-rapidapi-key': '5b03057532msh710fb8c58bfec33p168690jsn356d6c9b7c25',
      'x-rapidapi-host': 'imdb8.p.rapidapi.com'
    }

  });

  document.getElementById("risultato").hidden = false;

  const data = await response.json();
  let titolo = [];
  let titleType = [];
  let anno = [];
  let immagine = [];
  let attori = [];
  let idDaModificare = []
  let idmodificato
  let annocorrente = new Date()
  let flag = 0
  let idPerClick = []
  console.log(data)
  console.log(data['results'].length)

  for (let i = 0; i < data['results'].length; i++) {
    //if(data['results'][i]['disambiguation'] != null){continue}
    idDaModificare [i] = data['results'][i]['id']
    idmodificato = idDaModificare[i].substring(1, 6)
    idPerClick[i] = idDaModificare[i].substring(7, 16)
    console.log(idmodificato)
    if (idmodificato !== 'title') {
      continue
    }
    titleType [i] = data['results'][i]['titleType']
    if (titleType[i] !== 'movie') {
      continue
    }
    titolo [i] = data['results'][i]['title']
    anno [i] = data['results'][i]['year']
    if (anno[i] > annocorrente.getFullYear()) {
      continue
    }
    if (data['results'][i]['image'] == null) {
      continue
    }
    immagine [i] = data['results'][i]['image']['url']
    for (let j = 0; j < 3; j++) {
      if (data['results'][i]['principals'][j] == null) {
        continue
      }
      attori [j] = data['results'][i]['principals'][j]['name']
      flag = j + 1
    }
    let ItemSliding = document.createElement("ion-item-sliding")
    ItemSliding.src = "ItemSliding_ricerca"
    let Item = document.createElement("ion-item")
    let thumbnail = document.createElement("ion-thumbnail")
    thumbnail.id = "thumbnail_ricerca"
    let img = document.createElement("img")
    img.src = immagine[i];
    img.id = "locandina_ricerca"
    thumbnail.appendChild(img)
    Item.appendChild(thumbnail)

    let lable = document.createElement("ion-label")
    lable.id = "lable_ricerca"
    let table = document.createElement("table")
    table.id = "table_ricerca"
    //let trUnica = document.createElement("tr")

    let trTitolo = document.createElement("tr")
    trTitolo.id = "trTitolo_ricerca"
    let tdTitolo = document.createElement("td")
    let tdTitolotext = document.createTextNode(titolo[i])
    tdTitolo.appendChild(tdTitolotext)
    tdTitolo.id = "tdTitolo_ricerca" + idPerClick[i]

    trTitolo.appendChild(tdTitolo)
    table.appendChild(trTitolo)

    let trAnno = document.createElement("tr")
    let tdAnno = document.createElement("td")
    let tdAnnoText = document.createTextNode(anno[i])
    tdAnno.appendChild(tdAnnoText)
    tdAnno.id = "tdAnno_ricerca"
    trAnno.appendChild(tdAnno)
    table.appendChild(trAnno)

    let trAttori = document.createElement("tr")
    let tdAttori = document.createElement("td")
    if (flag >= 1) {
      let tdattore0 = document.createTextNode(attori[0])
      tdAttori.appendChild(tdattore0)
    }
    if (flag >= 2) {
      let tdattore1 = document.createTextNode(", " + attori[1])
      tdAttori.appendChild(tdattore1)
    }
    if (flag === 3) {
      let tdattore2 = document.createTextNode(", " + attori[2])
      tdAttori.appendChild(tdattore2)
    }
    tdAttori.id = "tdRating_ricerca"
    trAttori.appendChild(tdAttori)
    table.appendChild(trAttori)

    //trUnica.appendChild(tdRating)
    //table.appendChild(trUnica)
    lable.appendChild(table)
    Item.appendChild(lable)
    ItemSliding.appendChild(Item)

    let ItemOptions = document.createElement("ion-item-options")
    ItemOptions.id = "ItemOptions_ricerca"
    let ItemOpzione = document.createElement("ion-item-option")
    ItemOpzione.id = "ItemOpzione_ricerca"
    let IconTime = document.createElement("ion-icon")
    IconTime.name = "time"
    ItemOpzione.appendChild(IconTime)
    let ItemOpzioneText = document.createTextNode("Aggiungi a Film da Vedere")
    ItemOpzione.appendChild(ItemOpzioneText)
    ItemOptions.appendChild(ItemOpzione)
    ItemSliding.appendChild(ItemOptions)


    document.getElementById("risultato").appendChild(ItemSliding)

    document.getElementById('tdTitolo_ricerca' + idPerClick[i]).onclick = function assegnaID(elementid) {
      window.location.href = "http://localhost:8100/schedainformativa/"    //+ id del film da prendere nel id in html
    }

  }


}




async function GetFullCredits() {
  indirizzo = 'https://imdb8.p.rapidapi.com/title/get-full-credits?tconst=';
  const response1 = await fetch(this.indirizzo + 'tt1853728', {
    method: "GET",
    headers: {
      'x-rapidapi-key': '5b03057532msh710fb8c58bfec33p168690jsn356d6c9b7c25',
      'x-rapidapi-host': 'imdb8.p.rapidapi.com'
    }
  });
  const data = await response1.json();
  console.log(data);
  document.getElementById('titolo').textContent = data['base']['title'];
  document.getElementById('durata').textContent = data['base']['runningTimeInMinutes'];
  document.getElementById('anno').textContent = data['base']['year'];
  const {url} = data['base']['image'];
  locandina.src = url;
  let Direttore = data['crew']['director'][0]['name'];
  document.getElementById('Regista').textContent = Direttore;
  urlImmagineRegista = data['crew']['director'][0]['image']['url'];
  //ImmagineRegista.src=urlImmagineRegista;

  const name = [];
  const character = [];
  const UrlImmagineAttore = [];
  //inizio ciclo for
  for (let i = 0; i < 10; i++) {
    name[i] = data['cast'][i]['name'];
    character[i] = data['cast'][i]['characters'][0];
    UrlImmagineAttore[i] = data['cast'][i]['image']['url'];

    //creazione riga
    var row = document.createElement("tr");
    //creazione cella
    var cell = document.createElement("td");
    //riempimento cella
    var cellImg= document.createElement("img");
    cellImg.id= "img_attore2"
    cellImg.src = UrlImmagineAttore[i];
    cell.style.width="33%";
    //cellImg.style.borderRadius = "50%";
    cell.appendChild(cellImg);
    cell.style.borderRight = "1px solid #282828";
    row.appendChild(cell);

    var cell = document.createElement("td");
    var cellText = document.createTextNode(name[i]);
    cell.style.width="33%";
    cell.appendChild(cellText);
    cell.style.borderRight = "1px solid #282828";
    row.appendChild(cell);

    var cell = document.createElement("td");
    var cellText = document.createTextNode(character[i]);
    cell.style.width="33%";
    cell.appendChild(cellText);
    row.appendChild(cell);
    row.style.borderBottom = "1px solid #282828";
    //append dell'intera riga nella tabella con id
    document.getElementById("table_cast").appendChild(row);
  }//chiusura ciclo for
  GetGeneresByID();

}//chiusura GetFullCredits
async function GetGeneresByID(){
  indirizzo = 'https://imdb8.p.rapidapi.com/title/get-genres?tconst=';
  const response = await fetch(this.indirizzo + 'tt1853728', {
    method: "GET",
    headers:{
      'x-rapidapi-key': '5b03057532msh710fb8c58bfec33p168690jsn356d6c9b7c25',
      'x-rapidapi-host': 'imdb8.p.rapidapi.com'
    }
  });
  const data = await response.json();
   let newText
  for (let i=0; i < data.length ; i++){
    newText = document.createTextNode(data[i] +" ")
    document.getElementById('Generi').append(newText)
  }RicercaPloteTrailereRating();}


async function RicercaPloteTrailereRating(){
  indirizzo = 'https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/';
  const response = await fetch(indirizzo + 'tt1853728', {
    method: "GET",
    headers: {
      'x-rapidapi-key': '6eb4c8471amsh3c0309278efd822p141880jsna07d16bfda03',
      'x-rapidapi-host': 'imdb-internet-movie-database-unofficial.p.rapidapi.com'
    }

  });
  const data = await response.json();
  document.getElementById('Valutazione').textContent = data['rating'];
  let video_src = 'https://www.imdb.com/video/imdb/' + data['trailer']['id'] + '/imdb/embed';
  console.log(video_src);
  document.getElementById("trailer").src = video_src;
  traduciPlot(data['plot']);
}


  async function traduciPlot(text) {
    console.log(text);
    text.split(' ').join('%20');
    text.split(',').join('%2C');
    text.split('?').join('%3F');
    text.split(':').join('%3A');

    const response3 = await fetch("https://just-translated.p.rapidapi.com/?lang=it&text=" + text, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "just-translated.p.rapidapi.com",
        "x-rapidapi-key": "5b03057532msh710fb8c58bfec33p168690jsn356d6c9b7c25" /*https://rapidapi.com/lebedev.str/api/just-translated/*/
      }
    })
    const translation = await response3.json();
    console.log(translation);
    document.getElementById('Descrizione').textContent = translation['text'][0];
  }




async function GetTopRated() {
  const response = await fetch("https://imdb8.p.rapidapi.com/title/get-top-rated-movies", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "imdb8.p.rapidapi.com",
      "x-rapidapi-key": "5b03057532msh710fb8c58bfec33p168690jsn356d6c9b7c25"
    }
  })
  const data = await response.json();
  const idFilm = [];
  for (let i = 0; i < data.length; i++) {
    idDaModificare = data[i]['id']
    idDaModificare = idDaModificare.substring(7, 16)
    idFilm[i] = idDaModificare;
    console.log(idFilm[i]);
  }
  GetFullCreditsTopRated(idFilm);
}

  function linkSchedainformativa(idFilm) {
    location.href = '/schedainformativa' + idFilm;
  }

  async function GetFullCreditsTopRated(idFilm) {
    indirizzo = "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/";
    const IdImmagine = [];
    const titolo = [];
    const anno = [];
    const rating = [];
    for (let i = 0; i < idFilm.length; i++) {
      const response = await fetch(indirizzo + idFilm[i], {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com",
          "x-rapidapi-key": "6eb4c8471amsh3c0309278efd822p141880jsna07d16bfda03"
        }

      })
      const data = await response.json();
      console.log(data);
      titolo[i] = data['title'];
      anno[i] = data['year'];
      IdImmagine[i] = data['poster'];
      rating[i] = data['rating'];
      console.log(titolo[i])
      console.log(anno[i])
      console.log(rating[i])
      console.log(IdImmagine[i])

      let ItemSliding = document.createElement("ion-item-sliding")
      ItemSliding.src = "ItemSliding_toprated"
      let Item = document.createElement("ion-item")
      let thumbnail = document.createElement("ion-thumbnail")
      thumbnail.id = "thumbnail_toprated"
      let img = document.createElement("img")
      img.src = IdImmagine[i];
      img.id = "locandina_toprated"
      thumbnail.appendChild(img)
      Item.appendChild(thumbnail)

      let lable = document.createElement("ion-label")
      let table = document.createElement("table")
      table.id = "table_toprated"
      let trUnica = document.createElement("tr")
      trUnica.id = "trUnica_toprated"
      let tdRanking = document.createElement("td")
      let tdRankingtext = document.createTextNode(i + 1 + ".")
      tdRanking.appendChild(tdRankingtext)
      tdRanking.id = "tdRanking_toprated"
      trUnica.appendChild(tdRanking)

      let tdTitolo = document.createElement("td")
      let tdTitolotext = document.createTextNode(titolo[i])
      tdTitolo.appendChild(tdTitolotext)
      tdTitolo.id = "tdTitolo_toprated"
      tdTitolo.value = "Click"
      trUnica.appendChild(tdTitolo)

      let tdAnno = document.createElement("td")
      let tdAnnoText = document.createTextNode(anno[i])
      tdAnno.appendChild(tdAnnoText)
      tdAnno.id = "tdAnno_toprated"
      trUnica.appendChild(tdAnno)

      let tdRating = document.createElement("td")
      tdRating.id = "tdRating_toprated"
      let tableRating = document.createElement("table")
      tableRating.id = "tableRating_toprated"
      let trRatig = document.createElement("tr")
      let tdStella = document.createElement("td")
      tdStella.id = "tdStella_toprated"
      let imgStella = document.createElement("img")
      imgStella.id = "imgStella_toprated"
      imgStella.src = "\..\\..\\assets\\image\\star-icon.png"
      tdStella.appendChild(imgStella)
      trRatig.appendChild(tdStella)
      let tdValoreRating = document.createElement("td")
      tdValoreRating.id = "tdValoreRating_toprated"
      let tdRatingFilm = document.createTextNode(rating[i])
      tdValoreRating.appendChild(tdRatingFilm)
      trRatig.appendChild(tdValoreRating)

      /*
        let tdIMDBLogo  = document.createElement("td")
        let imgIMDBlogo = document.createElement("img")
        imgIMDBlogo.src ="\..\\..\\assets\\image\\imdbLogo.jpg"
        tdIMDBLogo.appendChild(imgIMDBlogo)
        trRatig.appendChild(tdIMDBLogo)
      */
      tableRating.appendChild(trRatig)
      tdRating.appendChild(tableRating)
      trUnica.appendChild(tdRating)
      table.appendChild(trUnica)
      lable.appendChild(table)
      Item.appendChild(lable)
      ItemSliding.appendChild(Item)
      document.getElementById("ListTopRated").appendChild(ItemSliding)

    }//chiusura for
  }


/*async function RicercaRating(){
indirizzo = 'https://imdb8.p.rapidapi.com/title/get-ratings?tconst=';
const response2 = await fetch(this.indirizzo + 'tt1853728', {
  method: "GET",
  headers:{
    'x-rapidapi-key': '5b03057532msh710fb8c58bfec33p168690jsn356d6c9b7c25',
    'x-rapidapi-host': 'imdb8.p.rapidapi.com'
  }

});
const data = await response2.json();

const {rating}=data;
document.getElementById('Valutazione').textContent = rating;

RicercaPlot();
}//RicercaRating





async function RicercaPlot() {
indirizzo = 'https://imdb8.p.rapidapi.com/title/get-plots?tconst=';
const response = await fetch(this.indirizzo + 'tt1853728', {
  method: "GET",
  headers: {
    'x-rapidapi-key': '5b03057532msh710fb8c58bfec33p168690jsn356d6c9b7c25',
    'x-rapidapi-host': 'imdb8.p.rapidapi.com'
  }

});
const data = await response.json();
const {text} = data['plots'][0];
console.log(text);

traduciPlot(text);
} //chiusura RicercaPlot

async function GetTrailer(){
const response4 = await fetch("https://imdb8.p.rapidapi.com/title/get-videos?tconst=tt1853728&limit=1&region=IT", {
  "method": "GET",
  "headers": {
    "x-rapidapi-host": "imdb8.p.rapidapi.com",
    "x-rapidapi-key": "5b03057532msh710fb8c58bfec33p168690jsn356d6c9b7c25"
  }
})
const data = await response4.json();
const idvideo = data['resource']['videos'][0]['id'];
let srg = idvideo.substring(9, 21);
let video_src = 'https://www.imdb.com/video/imdb/' + srg + '/imdb/embed';
console.log(video_src);
document.getElementById("trailer").src = video_src;

}
*/
