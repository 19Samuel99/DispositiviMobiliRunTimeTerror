async function getNomeFilm( nome) {
  indirizzo = 'https://imdb8.p.rapidapi.com/title/find?q=';
  nome.split(' ').join('%20')
  const response = await fetch(this.indirizzo + nome, {
    method: "GET",
    headers:{
      'x-rapidapi-key': '257bf8c403msh243c5dce7795224p139d76jsn721067b57113',
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
      'x-rapidapi-key': '257bf8c403msh243c5dce7795224p139d76jsn721067b57113',
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
        'x-rapidapi-key': '257bf8c403msh243c5dce7795224p139d76jsn721067b57113',
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
        'x-rapidapi-key': '257bf8c403msh243c5dce7795224p139d76jsn721067b57113',
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
      "x-rapidapi-key": "af622af5f0msh7c4f3576c3d19e1p1c9877jsna4822a599ad7"
    }
  })
  const data = await response4.json();
  const idvideo = data['resource']['videos'][0]['id'];
  let srg = idvideo.substring(9, 21);
  let video_src = 'https://www.imdb.com/video/imdb/' + srg + '/imdb/embed';
  console.log(video_src);
  document.getElementById("trailer").src = video_src;

}




