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

  const name = [];
  const character = [];
  const UrlImmagineAttore = [];
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
    var cellImg = new Image(100, 100);
    //var cellImg= document.createElement("img");
    cellImg.src = UrlImmagineAttore[i];
    cellImg.style.borderRadius = "50%";
    cell.appendChild(cellImg);
    cell.style.borderRight = "1px solid #282828";
    row.appendChild(cell);

    var cell = document.createElement("td");
    var cellText = document.createTextNode(name[i]);
    cell.appendChild(cellText);
    cell.style.borderRight = "1px solid #282828";
    row.appendChild(cell);

    var cell = document.createElement("td");
    var cellText = document.createTextNode(character[i]);
    cell.appendChild(cellText);
    row.appendChild(cell);
    row.style.borderBottom = "1px solid #282828";
    //append dell'intera riga nella tabella con id
    document.getElementById("table_cast").appendChild(row);
  }
  RicercaRating();
}

  async function RicercaRating()
  {
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
  }


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
        "x-rapidapi-key": "f49ccd9ba0msh6625224d24a637cp1c66ffjsne6d5ec895a86"
      }
    })
    const translation = await response3.json();
    console.log(translation);
    const translatedText = translation['text'][0];
    document.getElementById('Descrizione').textContent = translatedText;
    return translatedText
  }

  /*
    UrlImmagineAttore[0] = data['cast'][0]['image']['url'];
    ImmagineAttore0.src=UrlImmagineAttore[0];
    UrlImmagineAttore[1] = data['cast'][1]['image']['url'];
    ImmagineAttore1.src=UrlImmagineAttore[1];
    UrlImmagineAttore[2] = data['cast'][2]['image']['url'];
    ImmagineAttore2.src=UrlImmagineAttore[2];
    UrlImmagineAttore[3] = data['cast'][3]['image']['url'];
    ImmagineAttore3.src=UrlImmagineAttore[3];
    UrlImmagineAttore[4] = data['cast'][4]['image']['url'];
    ImmagineAttore4.src=UrlImmagineAttore[4];
    UrlImmagineAttore[5] = data['cast'][5]['image']['url'];
    ImmagineAttore5.src=UrlImmagineAttore[5];
    UrlImmagineAttore[6] = data['cast'][6]['image']['url'];
    ImmagineAttore6.src=UrlImmagineAttore[6];
    UrlImmagineAttore[7] = data['cast'][7]['image']['url'];
    ImmagineAttore7.src=UrlImmagineAttore[7];
    UrlImmagineAttore[8] = data['cast'][8]['image']['url'];
    ImmagineAttore8.src=UrlImmagineAttore[8];
    UrlImmagineAttore[9] = data['cast'][9]['image']['url'];
    ImmagineAttore9.src=UrlImmagineAttore[9];
  */


