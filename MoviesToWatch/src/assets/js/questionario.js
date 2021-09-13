domandeGenere  = [
  ["Genere", "action" , "Fatti travolgere dall&apos;azione"],
  ["Genere", "adventure" , "Pronto per vivere una nuova avventura&quest;"],
  ["Genere", "animation" , "Film d&apos;animazione&quest;"],
  ["Genere", "biography" , " Ti senti inspirato per una biografia&quest;"],
  ["Genere", "comedy" , "Giornata triste&quest; Guarda una commedia"],
  ["Genere", "crime" , "Ti piace risolvere crimini&quest;"],
  ["Genere", "documentary" , "Un po&apos; di informazione. Un documentario&quest;"],
  ["Genere", "drama" , "Dramma&quest; Io amo il dramma"],
  ["Genere", "family" , " Giornata in famiglia&quest;"],
  ["Genere", "fantasy" , "Nel mood per un fantasy&quest;"],
  ["Genere", "film_noir" , "Che ne dici di un Noir&quest;"],
  ["Genere", "history" , "Voglia di storia&quest;"],
  ["Genere", "horror" , "Qualcosa di spaventoso&quest;"],
  ["Genere", "music" , "Un po&apos; di musica&quest;"],
  ["Genere", "musical" , "Guarda un musical"],
  ["Genere", "mystery" , "Risolviamo un mistero"],
  ["Genere", "romance" , "Il romanticismo &egrave; nell&apos;aria "],
  ["Genere", "sci_fi" , "Entra nel mondo dei film di fantascienza."],
  ["Genere", "sport" , "Film sportivo&quest;"],
  ["Genere", "thriller" , "Cosa ne dici di un Thriller"],
  ["Genere", "war" , "Film di guerra&quest;"],
  ["Genere", "western" , "Un viaggio nel vecchio West&quest;"]
]

domandeVarie = [
  ["Anno", "1970", "Un tuffo negli anni &apos;70&quest;"],
  ["Anno", "1980", "Anni &apos;80&quest;"],
  ["Anno", "1990", "Amo gli anni &apos;90"],
  ["Anno", "2000", "&apos;00&quest;"],
  ["Anno", "2010", "Indietro di qualche anno&quest;"],
  ["Anno", "2020", "Un film recente&quest;"]
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
 /* console.log(array);
  console.log(result);
  console.log("i:" + i);
  console.log(result[i]);*/
  document.getElementById("div_domanda").innerHTML = array[result[i]][2];
  risposte[i] = array[result[i]];

  console.log('risposte[i][0]',risposte[i][0]);
  console.log('risposte[i]',risposte[i])
  console.log('risposte',risposte)
  console.log('result[i]',result[i])
}

let risposteSi = [];
let countSi = 0;
function ClickSi(){
  console.log("hai premuto si");
  risposteSi[countSi] = risposte[i][1];
  console.log('questo è il consol log di rispostesi', risposteSi[countSi]);

  if( risposte[i][0] === "Genere"){
    GetPopularMoviesByGenre(risposteSi[countSi])
  }
  if( risposte[i][0] === "Anno"){
    filterByAnno(risposteSi[countSi])
  }

  countSi++;
  if(countSi === 2){
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
  risposteNo[countNo] = risposte[i][1];
  console.log('questo è il consol log di risposteNo',risposteNo);

  if( risposte[i][0] === "Anno"){
    filterByAnnoNo(risposteNo[countNo])
  }

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

//FUNZIONE CHE FA LA FETCH CON IL GENERE ESTRAENDO I FILM PIù POPOLARI CON IL GENERE INSERITO
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

let j = 0
let arrayFilm = [];
async function FilmData(idFilm) {//FUNZIONE CHE RITORNA LE INFORMAZIONI DI OGNI SINGOLO FILM
  indirizzo = "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/";
  const IdImmagine = [];
  const titolo = [];
  const anno = [];
  const rating = [];
  const lunghezza = [];

  for (let i = 20; i < 35 /*idFilm.length*/; i++) {
    const response = await fetch(indirizzo + idFilm[i], {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com",
        "x-rapidapi-key": "6eb4c8471amsh3c0309278efd822p141880jsna07d16bfda03"
      }

    })
    const data = await response.json();
    console.log(data);
    if(data['title'] === "") {
      continue;
    }
    titolo[i] = data['title'];
    anno[i] = data['year'];
    IdImmagine[i] = data['poster'];
    rating[i] = data['rating'];
    lunghezza[i] = data['length']

    arrayFilm[j] = [ i, titolo[i] ,anno[i] ,IdImmagine[i] , rating[i],lunghezza[i] ];
    j++
  }
  console.log(arrayFilm)
}

function filterByAnno(Anno){//FUNZIONE CHE FILTRA L'ARRAY DEI FILM PRESI DALLE FETCH DEI GENERI IN BASE ALL'ANNO E LI PRENDE
  var integer = parseInt(Anno, 10);
  const annopiudieci= integer + 10
  console.log('il tuo anno è', integer ,'anno più 10', annopiudieci)
  for(let i=0; i< arrayFilm.length;){
    if( (arrayFilm[i][2]>= integer)  && (arrayFilm[i][2]<= annopiudieci)){
      i++
    }
    else{
      console.log('consollog di array film i',arrayFilm[i])
      arrayFilm.splice(i, 1)
      console.log('consollog di array film di i',arrayFilm[i])
    }
  }
  console.log('consollog di array film ',arrayFilm)
}

function filterByAnnoNo(Anno){//FUNZIONE CHE FILTRA L'ARRAY DEI FILM PRESI DALLE FETCH DEI GENERI IN BASE ALL'ANNO E LI SCARTA
  var integer = parseInt(Anno, 10);
  const annopiudieci= integer + 10
  console.log('il tuo anno è', integer ,'anno più 10', annopiudieci)
  for(let i=0; i< arrayFilm.length;){
    if( (arrayFilm[i][2]>= integer)  && (arrayFilm[i][2]<= annopiudieci)){
      console.log('consollog di array film i',arrayFilm[i])
      arrayFilm.splice(i, 1)
      console.log('consollog di array film di i',arrayFilm[i])
    }
    else{
      i++;
    }
  }
  console.log('consollog di array film ',arrayFilm)
}
//cast
//anno
//lunghezza
//rating
