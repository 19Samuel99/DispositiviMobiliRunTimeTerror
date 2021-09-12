domandeGenere  = [
  ["Genere", "Action" , "Fatti travolgere dall&apos;azione"],
  ["Genere", "Adventure" , "Pronto per vivere una nuova avventura&quest;"],
  ["Genere", "Animation" , "Film d&apos;animazione&quest;"],
  ["Genere", "Biography" , " Ti senti inspirato per una biografia&quest;"],
  ["Genere", "Comedy" , "Giornata triste&quest; Guarda una commedia"],
  ["Genere", "Crime" , "Ti piace risolvere crimini&quest;"],
  ["Genere", "Documentary" , "Un po&apos; di informazione. Un documentario&quest;"],
  ["Genere", "Drama" , "Dramma&quest; Io amo il dramma"],
  ["Genere", "Family" , " Giornata in famiglia&quest;"],
  ["Genere", "Fantasy" , "Nel mood per un fantasy&quest;"],
  ["Genere", "FilmNoir" , "Che ne dici di un Noir&quest;"],
  ["Genere", "History" , "Voglia di storia&quest;"],
  ["Genere", "Horror" , "Qualcosa di spaventoso&quest;"],
  ["Genere", "Music" , "Un po&apos; di musica&quest;"],
  ["Genere", "Musical" , "Guarda un musical"],
  ["Genere", "Mystery" , "Risolviamo un mistero"],
  ["Genere", "Romance" , "Il romanticismo &egrave; nell&apos;aria "],
  ["Genere", "SciFi" , "Entra nel mondo dei film di fantascienza."],
  ["Genere", "Sport" , "Film sportivo&quest;"],
  ["Genere", "Thriller" , "Cosa ne dici di un Thriller"],
  ["Genere", "War" , "Film di guerra&quest;"],
  ["Genere", "Western" , "Un viaggio nel vecchio West&quest;"]
]

domandeVarie = [
  ["Anno", "2020", "2020"],
  ["Anno", "2021", "2021"],
  ["Anno", "2000", "2000"],
  ["Anno", "2005", "2005"],
  ["Anno", "1999", "1999"],
  ["Anno", "1990", "90'"],
]
//top rated
//popolar movies

function randomUniqueNum(range, outputCount) { // funzione per generare in maniera random e senza ripetizioni di tutte le domande

  let arr = []
  for (let i = 0; i < range; i++) {
    arr.push(i)
  }

  let result = [];
  for (let i = 1; i <= outputCount; i++) {
    const random = Math.floor(Math.random() * (range - i));
    result.push(arr[random]);
    arr[random] = arr[range - i];
  }

  console.log(result)
  return result;
}

let result = [];
let array = [];
function QuestionarioStart(){
  let range = domandeGenere.length;
  let outputCount = domandeGenere.length;
  result = randomUniqueNum(range, outputCount)
  array = domandeGenere;
  console.log(array);
  //console.log(result)
  //document.getElementById("div_domanda").innerHTML = "Questionario Iniziato";
  GenerateDomanda()
}


let i = -1;
let risposte = [];
function GenerateDomanda(){
  i++;
  if(i >= array.length){
    console.log("domande finite");
    document.getElementById("div_domanda").innerHTML = "Domande finite";
    document.getElementById("question-actions_actions").hidden = true;
    return;
  }
  document.getElementById("question-actions_actions").hidden = false;
  console.log(array);
  console.log(result);
  console.log("i:" + i);
  console.log(result[i]);
  document.getElementById("div_domanda").innerHTML = array[result[i]][2];
  risposte[i] = array[result[i]];
  console.log(risposte[i][0]);
}

let risposteSi = [];
let countSi = 0;
let arrayFetch = []
function ClickSi(){
  console.log("hai premuto si");
  risposteSi[countSi] = risposte[i][1];
  console.log(risposteSi);
  countSi++;

  let tipo = risposte[i][0];
  let varieta = risposteSi;

  if( tipo = "Genere"){
    GetPopularMoviesByGenre(varieta)
  }

  if(countSi == 2){
    let range = domandeVarie.length;
    let outputCount = domandeVarie.length;
    result = randomUniqueNum(range, outputCount)
    array = domandeVarie;
  }


  GenerateDomanda()

}

let risposteNo = [];
let countNo = 0;
function ClickNo(){
  console.log("hai premuto no");
  risposteNo[countNo] = risposte[i][0];
  console.log(risposteNo);
  countNo++;
  GenerateDomanda()
}

let risposteSkip = [];
let countSkip = 0;
function ClickSkip(){
  console.log("hai premuto non so");
  risposteSkip[countSkip] = risposte[i][0];
  console.log(risposteSkip);
  countSkip++;
  GenerateDomanda()
}

async function GetPopularMoviesByGenre(genere){
  const response = await fetch("https://imdb8.p.rapidapi.com/title/get-popular-movies-by-genre?genre=%2Fchart%2Fpopular%2Fgenre%2F" + genere , {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "imdb8.p.rapidapi.com",
      "x-rapidapi-key": "6eb4c8471amsh3c0309278efd822p141880jsna07d16bfda03"
    }
  })
  const data = await response.json();
  console.log(data)
  const idFilm = [];
  let idDaModificare
  for (let i = 0; i < data.length; i++) {
    idDaModificare = data[i]
    idDaModificare = idDaModificare.substring(7, (idDaModificare.length - 1) )
    idFilm[i] = idDaModificare;
    console.log(idFilm[i]);
  }
  FilmData(idFilm)
}


async function FilmData(idFilm) {
  indirizzo = "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/";
  const IdImmagine = [];
  const titolo = [];
  const anno = [];
  const rating = [];
  const lunghezza = [];
  let arrayFilm = [];
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
    if(true) {
      titolo[i] = data['title'];
    }
    anno[i] = data['year'];
    IdImmagine[i] = data['poster'];
    rating[i] = data['rating'];
    lunghezza[i] = data['length']

    if( titolo[i] == ""){
      continue;
    }

    arrayFilm.push( [
      [ i, titolo[i] ,anno[i] ,IdImmagine[i] , rating[i],lunghezza[i] ]
    ]);


  }
  console.log(arrayFilm)
}
//cast
//anno
//lunghezza
//rating
