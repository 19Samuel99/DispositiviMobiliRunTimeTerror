async function getNomeFilm( nome) {
  indirizzo = 'https://imdb8.p.rapidapi.com/title/find?q=';
  nome.split(' ').join('%20')
  const response = await fetch(this.indirizzo + nome, {
    method: "GET",
    headers:{
      'x-rapidapi-key': '187756bb25msh2f84f141c42ff45p17a255jsn7b3b652923f2',
      'x-rapidapi-host': 'imdb8.p.rapidapi.com'
    }

  });

  //per tenere l'item del risultato nella pagina ricerca hidden fino a quando non si effettua una ricerca
  document.getElementById("risultato").hidden = false;

  const data = await response.json();

  const {title, titleType, year} = data['results'][0];
  document.getElementById('titolo').textContent = title;
  document.getElementById('tTitolo').textContent = titleType;
  document.getElementById('anno').textContent = year;
  const {url} = data['results'][0]['image'];
  locandina.src=url
}

async function GetFullCredits() {
  indirizzo = 'https://imdb8.p.rapidapi.com/title/get-full-credits?tconst=';
  const response1 = await fetch(this.indirizzo + 'tt1853728', {
    method: "GET",
    headers: {
      'x-rapidapi-key': '187756bb25msh2f84f141c42ff45p17a255jsn7b3b652923f2',
      'x-rapidapi-host': 'imdb8.p.rapidapi.com'
    }

  });
  const data = await response1.json();
  console.log(data);
  const {runningTimeInMinutes, title, year,} = data['base'];
  document.getElementById('titolo').textContent = title;
  document.getElementById('durata').textContent = runningTimeInMinutes;
  document.getElementById('anno').textContent = year;
  const {url} = data['base']['image'];
  locandina.src = url;
  let Direttore = data['crew']['director'][0]['name'];
  document.getElementById('Regista').textContent = Direttore;
  urlImmagineRegista = data['crew']['director'][0]['image']['url'];
  ImmagineRegista.src=urlImmagineRegista;
  const name = [];
  const character = [];
  const UrlImmagineAttore = [];
  //inizio ciclo for
  for (let i = 0; i < 10; i++) {
    name[i] = data['cast'][i]['name'];
    character[i] = data['cast'][i]['characters'][0];
    UrlImmagineAttore[i] = data['cast'][i]['image']['url'];

    /*
      document.getElementById('NomeAttore' + i).textContent = name[i];
      document.getElementById('Nomecharacter' + i).textContent = character[i];
    */


    //creazione riga
    var row = document.createElement("tr");
    //creazione cella
    var cell = document.createElement("td");
    //riempimento cella
    //var cellImg = new Image(100, 100);
    var cellImg= document.createElement("img");
    cellImg.src = UrlImmagineAttore[i];
    cellImg.style.width = "20%";
    cellImg.style.height = "auto";
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
  RicercaRating();
}//chiusura GetFullCredits

  async function RicercaRating(){
    indirizzo = 'https://imdb8.p.rapidapi.com/title/get-ratings?tconst=';
    const response2 = await fetch(this.indirizzo + 'tt1853728', {
      method: "GET",
      headers:{
        'x-rapidapi-key': '187756bb25msh2f84f141c42ff45p17a255jsn7b3b652923f2',
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
        'x-rapidapi-key': '187756bb25msh2f84f141c42ff45p17a255jsn7b3b652923f2',
        'x-rapidapi-host': 'imdb8.p.rapidapi.com'
      }

    });
    const data = await response.json();
    const {text} = data['plots'][0];
    console.log(text);
    traduciPlot(text);
  } //chiusura RicercaPlot


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
        "x-rapidapi-key": "f49ccd9ba0msh6625224d24a637cp1c66ffjsne6d5ec895a86"
      }
    })
    const translation = await response3.json();
    console.log(translation);
    const translatedText = translation['text'][0];
    document.getElementById('Descrizione').textContent = translatedText;
GetTrailer()
  }
async function GetTrailer(){
  const response4 = await fetch("https://imdb8.p.rapidapi.com/title/get-videos?tconst=tt1853728&limit=1&region=IT", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "imdb8.p.rapidapi.com",
      "x-rapidapi-key": "187756bb25msh2f84f141c42ff45p17a255jsn7b3b652923f2"
    }
  })
  const data = await response4.json();
  const idvideo = data['resource']['videos'][0]['id'];
  let srg = idvideo.substring(9, 21);
  let video_src = 'https://www.imdb.com/video/imdb/' + srg + '/imdb/embed';
  console.log(video_src);
  document.getElementById("trailer").src = video_src;

}

async function GetTopRated(){
  const response = await fetch("https://imdb8.p.rapidapi.com/title/get-top-rated-movies", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "imdb8.p.rapidapi.com",
      "x-rapidapi-key": "187756bb25msh2f84f141c42ff45p17a255jsn7b3b652923f2"
    }
  })
  const data = await response.json();
  const idFilm=[];
  const ratingFilm=[];
  for (let i = 0; i < 2; i++) {
    idDaModificare= data[i]['id']
    idDaModificare=idDaModificare.substring(7, 16)
    idFilm[i] = idDaModificare;
    console.log(idFilm[i]);
    ratingFilm[i] = data[i]['chartRating']
  }
  GetFullCreditsTopRated(idFilm, ratingFilm);
}

async function GetFullCreditsTopRated(idFilm, ratingFilm) {
  indirizzo = 'https://imdb8.p.rapidapi.com/title/get-full-credits?tconst=';
  console.log(idFilm[0])
  console.log(idFilm[1])
  const IdImmagine = [];
  const titolo = [];
  const anno = [];
  for (let i = 0; i < 1; i++) {
    const response = await fetch("https://imdb8.p.rapidapi.com/title/get-full-credits?tconst=" + idFilm[i], {
      method: "GET",
      headers: {
        'x-rapidapi-key': '187756bb25msh2f84f141c42ff45p17a255jsn7b3b652923f2',
        'x-rapidapi-host': 'imdb8.p.rapidapi.com'
      }

    })
  const data = await response.json();
  console.log(data);
   titolo[i] = data['base']['title'];
   anno[i] = data['base']['year'];
   IdImmagine[i] = data['base']['image']['url'];
    console.log(titolo[i])
    console.log(anno[i])
    console.log(ratingFilm[i])
    console.log(IdImmagine[i])

    let ItemSliding = document.createElement("ion-item-slidingn")
    let Item = document.createElement("ion-item")
    let thumbnail = document.createElement("ion-thumbnail")
    let img = document.createElement("ion-img")
    img.src=IdImmagine[i];
    img.style.width = "70%";
    img.style.height = "auto";
    thumbnail.appendChild(img)
    Item.appendChild(thumbnail)

    let lable = document.createElement("ion-label")
    let table = document.createElement("table")
    let trUnica = document.createElement("tr")

    //let trRanking = document.createElement("tr")
    let tdRanking = document.createElement("td")
    let tdRankingtext = document.createTextNode(i+1)
    tdRanking.appendChild(tdRankingtext)
    tdRanking.style.width="5%";
    tdRanking.style.textAlign= "center"
    tdRanking.style.borderRight = "3px solid green";
    trUnica.appendChild(tdRanking)
    //trRanking.appendChild(tdRanking)
    //table.appendChild(trTitolo)

    //let trTitolo = document.createElement("tr")
    let tdTitolo = document.createElement("td")
    let tdTitolotext = document.createTextNode(titolo[i])
    tdTitolo.appendChild(tdTitolotext)
    tdTitolo.style.width="65%";
    tdTitolo.style.paddingLeft= "20px"
    tdTitolo.style.textAlign= "left";
    tdTitolo.style.borderRight = "3px solid green";
    trUnica.appendChild(tdTitolo)
    //trTitolo.appendChild(tdTitolo)
    //table.appendChild(trTitolo)

    //let trAnno = document.createElement("tr")
    let tdAnno = document.createElement("td")
    let tdAnnoText = document.createTextNode(anno[i])
    tdAnno.appendChild(tdAnnoText)
    tdAnno.style.width="25%";
    tdAnno.style.textAlign= "center"
    tdAnno.style.borderRight = "3px solid green";
    trUnica.appendChild(tdAnno)
    //trAnno.appendChild(tdAnno)
    //table.appendChild(trAnno)

    //let trRating = document.createElement("tr")
    let tdRating = document.createElement("td")
    let tableRating = document.createElement("table")
    let trRatig = document.createElement("tr")
    let tdStella  = document.createElement("td")
    let imgStella = document.createElement("img")
    imgStella.src ="\..\\..\\assets\\image\\star-icon.png"
    imgStella.style.width = "33px";
    //cellImg.style.height = "auto";
    tdStella.appendChild(imgStella)
    //tdStella.style.textAlign= "center"
    trRatig.appendChild(tdStella)
    let tdValoreRating  = document.createElement("td")
    let tdRatingFilm = document.createTextNode(ratingFilm[i])
    tdValoreRating.appendChild(tdRatingFilm)
    //tdValoreRating.style.textAlign= "center"
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
    tdRating.style.width="25%";
    tdRating.style.textAlign= "center"
    tdRating.style.borderRight = "3px solid green";
    trUnica.appendChild(tdRating)
    //trRating.appendChild(tdRating)
    //table.appendChild(trRating)

    table.appendChild(trUnica)
    lable.appendChild(table)
    Item.appendChild(lable)
    ItemSliding.appendChild(Item)
    document.getElementById("ListTopRated").appendChild(ItemSliding)

  }//chiusura for di riga 194
}

