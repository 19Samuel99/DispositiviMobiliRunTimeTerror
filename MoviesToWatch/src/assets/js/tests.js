function delayScreen(){
  setTimeout(function(){
   window.location.href='http://localhost:8100/login/'
},300);}

async function getNomeFilm( nome) { //FUNZIONE RICHIAMATA SULL'ONCLICK DEL BOTTONE DELLA PAGINA RICERCA, RITORNA I FILM CON IL NOME INSERITO
  document.getElementById('risultato').innerHTML = ""
  indirizzo = 'https://imdb8.p.rapidapi.com/title/find?q=';
  nome.split(' ').join('%20')
  const response = await fetch(this.indirizzo + nome, {
    method: "GET",
    headers: {
      'x-rapidapi-key': 'e4db6a6ebamshb19a0f17a58b00ep177b18jsn9670a35590d8',
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
    idPerClick[i] = idDaModificare[i].substring(7)
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

    let trTitolo = document.createElement("tr")
    trTitolo.id = "trTitolo_ricerca"
    let aTitolo = document.createElement("a")
    aTitolo.id = "aTitolo"
    let tdTitolo = document.createElement("td")
    let tdTitolotext = document.createTextNode(titolo[i])
    tdTitolo.appendChild(tdTitolotext)
    tdTitolo.id = "tdTitolo_ricerca"
    aTitolo.href ="http://localhost:8100/schedainformativa/" + idPerClick[i]
    aTitolo.appendChild(tdTitolo)
    trTitolo.appendChild(aTitolo)
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
    lable.appendChild(table)
    Item.appendChild(lable)
    ItemSliding.appendChild(Item)

    document.getElementById("risultato").appendChild(ItemSliding)
  }
}


async function GetFullCredits(idFilm) {//FUNZIONE CHE PARTE AL CARICAMENTO DI SCHEDA INFORMATIVA CON L'ID DEL FILM E RITORNA TUTTE LE INFO DEL FILM
  indirizzo = 'https://imdb8.p.rapidapi.com/title/get-full-credits?tconst=';
  const response1 = await fetch(this.indirizzo + idFilm, {
    method: "GET",
    headers: {
      'x-rapidapi-key': 'e4db6a6ebamshb19a0f17a58b00ep177b18jsn9670a35590d8',
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
  document.getElementById('Regista').textContent = data['crew']['director'][0]['name'];
  GetGeneresByID(idFilm);
  const name = [];
  const character = [];
  const UrlImmagineAttore = [];
  let a
  if(data['cast'].length > 10){
    a = 10
  }
  else{
    a= data['cast'].length
  }
  for (let i = 0; i < a; i++) {
    name[i] = data['cast'][i]['name'];
    if(data['cast'][i]['characters'] != null) {
      character[i] = data['cast'][i]['characters'][0];
    }
    else{
      character[i] = "Non definito"
    }
    if(data['cast'][i]['image'] != null) {
      UrlImmagineAttore[i] = data['cast'][i]['image']['url'];
    }
    else {
      UrlImmagineAttore[i] = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png"
    }
    //creazione riga
    var row = document.createElement("tr");
    //creazione cella
    var cell = document.createElement("td");
    //riempimento cella
    var cellImg= document.createElement("img");
    cellImg.id= "img_attore"
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

}//chiusura GetFullCredits

async function GetGeneresByID(idFilm){//RITORNA IL GENERE DEL FILM
  indirizzo = 'https://imdb8.p.rapidapi.com/title/get-genres?tconst=';
  const response = await fetch(this.indirizzo + idFilm, {
    method: "GET",
    headers:{
      'x-rapidapi-key': 'e4db6a6ebamshb19a0f17a58b00ep177b18jsn9670a35590d8',
      'x-rapidapi-host': 'imdb8.p.rapidapi.com'
    }
  });
  const data = await response.json();
   let newText
  for (let i=0; i < data.length ; i++){
    newText = document.createTextNode(data[i] +" ")
    document.getElementById('Generi').append(newText)
  }
  RicercaPloteTrailereRating(idFilm);
}


async function RicercaPloteTrailereRating(idFilm){//RITORNA IL PLOT DEL FILM
  indirizzo = 'https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/';
  const response = await fetch(indirizzo + idFilm, {
    method: "GET",
    headers: {
      'x-rapidapi-key': 'e4db6a6ebamshb19a0f17a58b00ep177b18jsn9670a35590d8',
      'x-rapidapi-host': 'imdb-internet-movie-database-unofficial.p.rapidapi.com'
    }

  });
  const data = await response.json();
  document.getElementById('Valutazione').textContent = data['rating'];
  if(data['trailer']['id'] !== "") {
    let video_src = 'https://www.imdb.com/video/imdb/' + data['trailer']['id'] + '/imdb/embed';
    console.log(video_src);
    document.getElementById("trailer").src = video_src;
  }
  else{
    document.getElementById("trailer").src = "\..\\..\\assets\\image\\video-placeholder.jpg"
  }
  document.getElementById('Descrizione').textContent = data['plot'];
}


async function GetTopRated() {//RITORNA LA LISTA DEI FILM TOP RATED
  const response = await fetch("https://imdb8.p.rapidapi.com/title/get-top-rated-movies", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "imdb8.p.rapidapi.com",
      "x-rapidapi-key": "e4db6a6ebamshb19a0f17a58b00ep177b18jsn9670a35590d8"
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

  async function GetFullCreditsTopRated(idFilm) {//RITORNA TUTTE LE INFO PER CREARE LA LISTA DEI TOP RATED
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
          "x-rapidapi-key": "e4db6a6ebamshb19a0f17a58b00ep177b18jsn9670a35590d8"
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

      let aTitolo = document.createElement("a")
      aTitolo.id = "aTitolo"
      let tdTitolo = document.createElement("td")
      let tdTitolotext = document.createTextNode(titolo[i])
      tdTitolo.appendChild(tdTitolotext)
      tdTitolo.id = "tdTitolo_toprated"
      aTitolo.href ="http://localhost:8100/schedainformativa/" + idFilm[i]
      aTitolo.appendChild(tdTitolo)
      trUnica.appendChild(aTitolo)

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


  /* TRADUCE IL PLOT
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
      "x-rapidapi-key": "e4db6a6ebamshb19a0f17a58b00ep177b18jsn9670a35590d8" https://rapidapi.com/lebedev.str/api/just-translated/
    }
  })
  const translation = await response3.json();
  console.log(translation);
  document.getElementById('Descrizione').textContent = translation['text'][0];
}
*/

async function creaFilmGiaVisti(idFilm) {//PARTE AL CARICAMENTO DI PAGINA GI?? VISTI E RITORNA LA LISTA DEI FILM INSERITI DALL'UTENTE
  if(!idFilm.length){
    document.getElementById("giavisti_non_presente").hidden = false;
    document.getElementById("lista_filmGiaVisti").hidden = true;
    return;
  }
  else {
    document.getElementById("giavisti_non_presente").hidden = true;
    document.getElementById("lista_filmGiaVisti").hidden = false;
  }

  const immagine = [];
  const titolo = [];
  const anno = [];
  const attori = [];
  console.log(idFilm);
  indirizzo = "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/";
  for (let i = 0; i < idFilm.length; i++) {
    const response = await fetch(indirizzo + idFilm[i], {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com",
        "x-rapidapi-key": "e4db6a6ebamshb19a0f17a58b00ep177b18jsn9670a35590d8"
      }
    })
    const data = await response.json();
    console.log(data);

    titolo[i] = data['title'];
    anno[i] = data['year'];
    immagine[i] = data['poster'];
    for (let j = 0; j< 3 ; j++){
      attori[j] = data['cast'][j]['actor'];
    }

    let ItemSliding = document.createElement("ion-item-sliding")
    ItemSliding.src = "ItemSliding_film"
    let Item = document.createElement("ion-item")
    let thumbnail = document.createElement("ion-thumbnail")
    thumbnail.id = "thumbnail_film"
    let img = document.createElement("img")
    img.src = immagine[i];
    img.id = "locandina_film"
    thumbnail.appendChild(img)
    Item.appendChild(thumbnail)

    let lable = document.createElement("ion-label")
    lable.id = "lable_film"
    let table = document.createElement("table")
    table.id = "table_film"

    let trTitolo = document.createElement("tr")
    trTitolo.id = "trTitolo_film"
    let aTitolo = document.createElement("a")
    aTitolo.id = "aTitolo"
    let tdTitolo = document.createElement("td")
    let tdTitolotext = document.createTextNode(titolo[i])
    tdTitolo.appendChild(tdTitolotext)
    tdTitolo.id = "tdTitolo_film"
    aTitolo.href = "http://localhost:8100/schedainformativa/" + idFilm[i]
    aTitolo.appendChild(tdTitolo)
    trTitolo.appendChild(aTitolo)
    table.appendChild(trTitolo)

    let trAnno = document.createElement("tr")
    let tdAnno = document.createElement("td")
    let tdAnnoText = document.createTextNode(anno[i])
    tdAnno.appendChild(tdAnnoText)
    tdAnno.id = "tdAnno_film"
    trAnno.appendChild(tdAnno)
    table.appendChild(trAnno)

    let trAttori = document.createElement("tr")
    let tdAttori = document.createElement("td")
    let tdattore0 = document.createTextNode(attori[0])
    tdAttori.appendChild(tdattore0)
    let tdattore1 = document.createTextNode(", " + attori[1])
    tdAttori.appendChild(tdattore1)
    let tdattore2 = document.createTextNode(", " + attori[2])
    tdAttori.appendChild(tdattore2)
    tdAttori.id = "tdRating_film"
    trAttori.appendChild(tdAttori)
    table.appendChild(trAttori)
    lable.appendChild(table)
    Item.appendChild(lable)
    ItemSliding.appendChild(Item)

    document.getElementById("lista_filmGiaVisti").appendChild(ItemSliding);
  }
}

async function creaFilmDaVedere(idFilm) {//PARTE AL CARICAMENTO DI PAGINA DA VEDERE E RITORNA LA LISTA DEI FILM INSERITI DALL'UTENTE
  if(!idFilm.length){
    document.getElementById("davedere_non_presente").hidden = false;
    document.getElementById("lista_filmDaVedere").hidden = true;
    return;
  }
  else {
    document.getElementById("davedere_non_presente").hidden = true;
    document.getElementById("lista_filmDaVedere").hidden = false;
  }
  const immagine = [];
  const titolo = [];
  const anno = [];
  const attori = [];
  console.log(idFilm);
  indirizzo = "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/";
  for (let i = 0; i < idFilm.length; i++) {
    const response = await fetch(indirizzo + idFilm[i], {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com",
        "x-rapidapi-key": "e4db6a6ebamshb19a0f17a58b00ep177b18jsn9670a35590d8"
      }
    })
    const data = await response.json();
    console.log(data);

    titolo[i] = data['title'];
    anno[i] = data['year'];
    immagine[i] = data['poster'];
    for (let j = 0; j< 3 ; j++){
      attori[j] = data['cast'][j]['actor'];
    }

    let ItemSliding = document.createElement("ion-item-sliding")
    ItemSliding.src = "ItemSliding_film"
    let Item = document.createElement("ion-item")
    let thumbnail = document.createElement("ion-thumbnail")
    thumbnail.id = "thumbnail_film"
    let img = document.createElement("img")
    img.src = immagine[i];
    img.id = "locandina_film"
    thumbnail.appendChild(img)
    Item.appendChild(thumbnail)

    let lable = document.createElement("ion-label")
    lable.id = "lable_film"
    let table = document.createElement("table")
    table.id = "table_film"

    let trTitolo = document.createElement("tr")
    trTitolo.id = "trTitolo_film"
    let aTitolo = document.createElement("a")
    aTitolo.id = "aTitolo"
    let tdTitolo = document.createElement("td")
    let tdTitolotext = document.createTextNode(titolo[i])
    tdTitolo.appendChild(tdTitolotext)
    tdTitolo.id = "tdTitolo_film"
    aTitolo.href = "http://localhost:8100/schedainformativa/" + idFilm[i]
    aTitolo.appendChild(tdTitolo)
    trTitolo.appendChild(aTitolo)
    table.appendChild(trTitolo)

    let trAnno = document.createElement("tr")
    let tdAnno = document.createElement("td")
    let tdAnnoText = document.createTextNode(anno[i])
    tdAnno.appendChild(tdAnnoText)
    tdAnno.id = "tdAnno_film"
    trAnno.appendChild(tdAnno)
    table.appendChild(trAnno)

    let trAttori = document.createElement("tr")
    let tdAttori = document.createElement("td")
    let tdattore0 = document.createTextNode(attori[0])
    tdAttori.appendChild(tdattore0)
    let tdattore1 = document.createTextNode(", " + attori[1])
    tdAttori.appendChild(tdattore1)
    let tdattore2 = document.createTextNode(", " + attori[2])
    tdAttori.appendChild(tdattore2)
    tdAttori.id = "tdRating_film"
    trAttori.appendChild(tdAttori)
    table.appendChild(trAttori)
    lable.appendChild(table)
    Item.appendChild(lable)
    ItemSliding.appendChild(Item)

    document.getElementById("lista_filmDaVedere").appendChild(ItemSliding);
  }
}

