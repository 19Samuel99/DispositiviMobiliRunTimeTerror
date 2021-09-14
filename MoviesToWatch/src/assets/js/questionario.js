domandeGenere  = [
  ["Genere", "action" , "Fatti travolgere dall&apos;azione"],
  ["Genere", "adventure" , "Pronto per vivere una nuova avventura&quest;"],
  ["Genere", "animation" , "Film d&apos;animazione&quest;"],
  ["Genere", "biography" , " Ti senti inspirato per una biografia&quest;"],
  ["Genere", "comedy" , "Giornata triste&quest; Guarda una commedia"],
  ["Genere", "crime" , "Un crime&quest;"],
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
  ["Genere", "western" , "Un viaggio nel vecchio West&quest;"],
  ["Attore", "nm0000138" ,"Leonardo di caprio"],
  ["Attore","nm6864189", "johnny deep"],
  ["Attore","nm0000093", "brad pitt"],
  ["Attore","nm0000168", "samuel l jackson"],
  ["Attore","nm0000120" ,"Jim Carrey"],
  ["Attore", "nm0000129", "Tom Cruise"],
  ["Attore","nm0001618" ,"joaquin phoenix"],
  ["Attore","nm0000288", "Christian Bale"],
  ["Attore","nm0000323", "Michael Caine"],
  ["Attore", "nm0000134", "Robert De Niro"],
  ["Attore","nm0000226", "Will Smith"],
  ["Attore","nm0000125", "Sean Connery"],
  ["Attore","nm0000123" ,"George Clooney"],
  ["Attore", "nm0425005", "Dwayne Johnson (the rock!)"],
  ["Attore","nm0000199", "Al Pacino"],
  ["Attore","nm0000246", "Bruce Willis"],
  ["Attore","nm0000151" ,"Morgan Freeman"],
  ["Attore","nm0000206" ,"Keanu Reeves"],
  ["Attore","nm0000190" ,"Matthew McConaughey"],
  ["Attore","nm0000142" ,"Clint Eastwood"],
  ["Attore","nm0004874" ,"Vin Diesel"],

  ["Attore","nm2225369", "Jennifer Lawrence"],
  ["Attore","nm3053338", "Margot Robbie"],
  ["Attore","nm0000658", "Meryl Streep"],
  ["Attore","nm0000235", "Uma Thurman"],
  ["Attore","nm0001401", "Angelina Jolie"],
  ["Attore","nm0424060", "Scarlett Johansson"],
  ["Attore","nm0000098", "Jennifer Aniston"],
  ["Attore","nm0000173", "Nicole Kidman"],
  ["Attore","nm0000234", "Charlize Theron"],
  ["Attore","nm0000047", "Sophia Loren"],
  ["Attore","nm0914612", "Emma Watson"],
  ["Attore","nm0000204", "Natalie Portman"],
  ["Attore","nm0000113", "Sandra Bullock"],
  ["Attore","nm2933757", "Gal Gadot"]
]

domandeVarie = [
  ["Anno", "1970", "Un tuffo negli anni &apos;70&quest;"],
  ["Anno", "1980", "Anni &apos;80&quest;"],
  ["Anno", "1990", "Amo gli anni &apos;90"],
  ["Anno", "2000", "&apos;00&quest;"],
  ["Anno", "2010", "Indietro di qualche anno&quest;"],
  ["Anno", "2020", "Un film recente&quest;"],
  ["Rating", "7", "Un film apprezzato dalla critica&quest;"],
  ["Durata", "2", "Hai tanto tempo a disposizione&quest;"]
]
domandaRatingeDurata = [
  ["Rating", "7", "Un film apprezzato dalla critica&quest;"],
  ["Durata", "2", "Hai tanto tempo a disposizione&quest;"]
]

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
  console.log("GenerateDomanda i:", i);
  if(i >= array.length){
    if(arrayFilm.length>1){
      creaRisultati(arrayFilm)
      return;
    }else {
      console.log("domande finite");
      document.getElementById("div_domanda").innerHTML = "Domande finite";
      document.getElementById("question-actions_actions").hidden = true;
      return;
    }
  }
  document.getElementById("question-actions_actions").hidden = false;
  console.log("array", array);
  document.getElementById("div_domanda").innerHTML = array[result[i]][2];
  risposte[i] = array[result[i]];
}

let flag = 0;
let countRD = 0
let risposteSi = [];
let countSi = -1;
async function ClickSi(){//FUNZIONE CHE PARTE AL CLICK SI! SUL QUESTIONARIO
  countSi++;
  console.log("hai premuto si");
  risposteSi[countSi] = risposte[i];
  console.log('questo è il consol log di rispostesi', risposteSi[countSi]);

  if(risposteSi[countSi][0] === "Anno"){
    filterByAnno(risposteSi[countSi][1])
    if (countRD === 0){
      let range = domandaRatingeDurata.length;
      let outputCount = domandaRatingeDurata.length;
      result = randomUniqueNum(range, outputCount)
      array = domandaRatingeDurata;
      i=-1
    }else {
      if(flag<1){
        creaRisultati(arrayFilm)
        return;
      }
    }

  }
  if(risposteSi[countSi][0] === "Rating"){
    countRD++
    filterByRatingMaggiore()
  }
  if(risposteSi[countSi][0] === "Durata"){
    countRD++
    filterByDurataMaggiore()
  }
  if(risposteSi[countSi][0] === "Genere"){
    await GetPopularMoviesByGenre(risposteSi[countSi][1])
    let range = domandeVarie.length;
    let outputCount = domandeVarie.length;
    result = randomUniqueNum(range, outputCount)
    array = domandeVarie;
    i=-1
  }
  if(risposteSi[countSi][0] === "Attore"){
    await getAllFilmography(risposteSi[countSi][1])
    let range = domandaRatingeDurata.length;
    let outputCount = domandaRatingeDurata.length;
    result = randomUniqueNum(range, outputCount)
    array = domandaRatingeDurata;
    i=-1
  }
  if(flag<1){
    GenerateDomanda()
  }
  else {
    return
  }
}

let risposteNo = [];
let countNo = 0;
function ClickNo(){//FUNZIONE CHE PARTE AL CLICK NO! SUL QUESTIONARIO
  console.log("hai premuto no");
  risposteNo[countNo] = risposte[i][1];
  console.log('questo è il consol log di risposteNo',risposteNo);

  if( risposte[i][0] === "Anno"){
    filterByAnnoNo(risposteNo[countNo])
  }
  if(risposte[i][0] === "Rating"){
    countRD++
    filterByRatingMinore()
  }
  if(risposte[i][0] === "Durata"){
    countRD++
    filterByDurataMinore()
  }
  countNo++;
  GenerateDomanda()
}

let risposteSkip = [];
let countSkip = 0;
function ClickSkip(){//FUNZIONE CHE PARTE AL CLICK NON SO SUL QUESTIONARIO
  console.log("hai premuto non so");
  risposteSkip[countSkip] = risposte[i];
  console.log(risposteSkip);
  countSkip++;
  GenerateDomanda()
}

//FUNZIONE CHE FA LA FETCH CON IL GENERE ESTRAENDO I FILM PIù POPOLARI CON IL GENERE INSERITO
async function GetPopularMoviesByGenre(genere){
  document.getElementById("div_domanda").innerHTML = "Wait...";
  document.getElementById("question-actions_actions").hidden = true;
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



async function getAllFilmography(IDAttore){//FETCH CHE RITORNA TUTTA LA FILMOGRAFIA DELL'ATTORE INSERITO CON IL SUO ID
  document.getElementById("div_domanda").innerHTML = "Wait...";
  document.getElementById("question-actions_actions").hidden = true;
  const idFilm= [];
  let idDaModificare
  let z=0
  const response = await fetch("https://imdb8.p.rapidapi.com/actors/get-all-filmography?nconst=" + IDAttore ,  {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "imdb8.p.rapidapi.com",
      "x-rapidapi-key": "6eb4c8471amsh3c0309278efd822p141880jsna07d16bfda03"
    }
  })
  const data = await response.json();
  console.log('questo è data',data)
  for (let i = 0; i < data['filmography'].length; i++) {
    if(data['filmography'][i]['titleType'] !== "movie") {
    continue;
    }
    if(data['filmography'][i]['status'] !== "released") {
      continue;
    }
    if(data['filmography'][i]['category'] !== "actress" && data['filmography'][i]['category'] !== "actor"){
        continue;
    }

    console.log(data['filmography'].length)
    idDaModificare = data['filmography'][i]['id']
    idDaModificare = idDaModificare.substring(7, (idDaModificare.length - 1) )
    idFilm[z] = idDaModificare;
    z++
  }
  console.log(idFilm);
  await FilmDataAttori(idFilm)
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

    arrayFilm[j] = [ i, titolo[i] ,anno[i] ,IdImmagine[i] , rating[i],lunghezza[i],idFilm[i] ];
    j++
  }
  console.log("arrayFilm:",arrayFilm)
}
//è uguale a filmdata ma prende dal primo film invece che dal 30 visto che con questa fetch anche i primi sono pieni e sono i più importanti mentra con l'altra sono vuoti
async function FilmDataAttori(idFilm) {                                                  //FUNZIONE CHE RITORNA LE INFORMAZIONI DI OGNI SINGOLO FILM
  indirizzo = "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/";
  const IdImmagine = [];
  const titolo = [];
  const anno = [];
  const rating = [];
  const lunghezza = [];

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
    if(data['title'] === "") {
      continue;
    }
    titolo[i] = data['title'];
    anno[i] = data['year'];
    IdImmagine[i] = data['poster'];
    rating[i] = data['rating'];
    lunghezza[i] = data['length']

    arrayFilm[j] = [ i, titolo[i] ,anno[i] ,IdImmagine[i] , rating[i],lunghezza[i],idFilm[i] ];
    j++
  }
  console.log("arrayFilm:",arrayFilm)
}


function filterByAnno(Anno){//FUNZIONE CHE FILTRA L'ARRAY DEI FILM PRESI DALLE FETCH IN BASE ALL'ANNO E LI PRENDE
  var integer = parseInt(Anno, 10);
  const annopiudieci= integer + 10
  console.log('il tuo anno è', integer ,'anno più 10', annopiudieci)
  for(let i=0; i< arrayFilm.length;){
    if( (arrayFilm[i][2]>= integer)  && (arrayFilm[i][2]< annopiudieci)){
      i++
    }
    else{
      console.log('consollog di array film i',arrayFilm[i])
      arrayFilm.splice(i, 1)
      console.log('consollog di array film di i',arrayFilm[i])
    }
  }
  console.log('consollog di array film ',arrayFilm)
  console.log("arrayFilm.length ",arrayFilm.length )

  if(arrayFilm.length <= 12){
    console.log("entra in if array length")
    creaRisultati(arrayFilm)
  }
}

function filterByAnnoNo(Anno){//FUNZIONE CHE FILTRA L'ARRAY DEI FILM PRESI DALLE FETCH DEI GENERI IN BASE ALL'ANNO E LI SCARTA
  var integer = parseInt(Anno, 10);
  const annopiudieci= integer + 10
  console.log('il tuo anno è', integer ,'anno più 10', annopiudieci)
  for(let i=0; i< arrayFilm.length;){
    if( (arrayFilm[i][2]>= integer)  && (arrayFilm[i][2]< annopiudieci)){
      console.log('consollog di array film i',arrayFilm[i])
      arrayFilm.splice(i, 1)
      console.log('consollog di array film di i',arrayFilm[i])
    }
    else{
      i++;
    }
  }
  console.log('consollog di array film ',arrayFilm)
  console.log("arrayFilm.length ",arrayFilm.length )

  if(arrayFilm.length <= 12){
    console.log("entra in if array length")
    creaRisultati(arrayFilm)
  }
}

function filterByRatingMaggiore(){//FUNZIONE CHE FILTRA L'ARRAY DEI FILM PRESI DALLE FETCH e filtra il rating

  for(let i=0; i< arrayFilm.length;){
    if( arrayFilm[i][4] < 7 ){
      console.log('consollog di array film i',arrayFilm[i])
      arrayFilm.splice(i, 1)
      console.log('consollog di array film di i',arrayFilm[i])
    }
    else{
      i++;
    }
  }
  console.log('consollog di array film ',arrayFilm)
  console.log("arrayFilm.length ",arrayFilm.length )

  if(arrayFilm.length <= 12){
    console.log("entra in if array length")
    creaRisultati(arrayFilm)
  }
}

function filterByRatingMinore(){//FUNZIONE CHE FILTRA L'ARRAY DEI FILM PRESI DALLE FETCH e filtra il rating

  for(let i=0; i< arrayFilm.length;){
    if( arrayFilm[i][4] >= 7 ){
      console.log('consollog di array film i',arrayFilm[i])
      arrayFilm.splice(i, 1)
      console.log('consollog di array film di i',arrayFilm[i])
    }
    else{
      i++;
    }
  }
  console.log('consollog di array film ',arrayFilm)
  console.log("arrayFilm.length ",arrayFilm.length )

  if(arrayFilm.length <= 12){
    console.log("entra in if array length")
    creaRisultati(arrayFilm)
  }
}

function filterByDurataMinore(){//FUNZIONE CHE FILTRA L'ARRAY DEI FILM PRESI DALLE FETCH e filtra il rating
  for(let i=0; i< arrayFilm.length;){
    durataFilm =arrayFilm[i][5][0]
    console.log(durataFilm)
    if( durataFilm >= 2 ){
      console.log('consollog di array film i',arrayFilm[i])
      arrayFilm.splice(i, 1)
      console.log('consollog di array film di i',arrayFilm[i])
    }
    else{
      i++;
    }
  }
  console.log('consollog di array film ',arrayFilm)
  console.log("arrayFilm.length ",arrayFilm.length )

  if(arrayFilm.length <= 12){
    console.log("entra in if array length")
    creaRisultati(arrayFilm)
  }
}

function filterByDurataMaggiore(){//FUNZIONE CHE FILTRA L'ARRAY DEI FILM PRESI DALLE FETCH e filtra il rating
  for(let i=0; i< arrayFilm.length;){
    durataFilm =arrayFilm[i][5][0]
    console.log(durataFilm)
    if( durataFilm == 1 ){
      console.log('consollog di array film i',arrayFilm[i])
      arrayFilm.splice(i, 1)
      console.log('consollog di array film di i',arrayFilm[i])
    }
    else{
      i++;
    }
  }
  console.log('consollog di array film ',arrayFilm)
  console.log("arrayFilm.length ",arrayFilm.length )
  if(arrayFilm.length <= 12){
    console.log("entra in if array length")
    creaRisultati(arrayFilm)
  }
}

async function creaRisultati(arrayFilm){

  if(arrayFilm.length >5){
    let range = arrayFilm.length;
    let outputCount = 5;
    result = randomUniqueNum(range, outputCount)
  }
  else {
    result = [0,1,2,3,4]
  }

  document.getElementById("tr_actions_actions").hidden = true;
  await stampaFilm()

}

let countFilm=0;
let aLocandina;
function stampaFilm(){//FUNZIONE CHE STAMPA LA LOCANDINA DEL FILM NEL QUESTIONARIO
  console.log("entra in stampa film")

  document.getElementById("question-actions_film").hidden= false;
  aLocandina = document.createElement("a");
  let imgLocandina = document.createElement("img");
  imgLocandina.src= arrayFilm[result[countFilm]][3]
  imgLocandina.style.height="450px";
  aLocandina.appendChild(imgLocandina)
  aLocandina.href = "http://localhost:8100/schedainformativa/" + arrayFilm[result[countFilm]][6]
  document.getElementById("div_imgLocandina").appendChild(aLocandina);
  //document.getElementById("div_imgLocandina").innerHTML = arrayFilm[result[i]][1];
  document.getElementById("div_domanda").hidden= true;
  return flag= 1;
}

function ClickFilmBtn(){//AL PREMERE "UN ALTRO CONSIGLIO" VEDE SE CI SONO ALTRI FILM RISULTANTI
  countFilm++;
  if(countFilm < result.length){
    document.getElementById("div_imgLocandina").removeChild(aLocandina);
    stampaFilm();
  }
  else{
    document.getElementById("div_imgLocandina").removeChild(aLocandina);
    document.getElementById("div_domanda").hidden= false;
    document.getElementById("div_domanda").innerHTML ="Film finiti!";
    setTimeout(() => {  location.reload(); }, 2000);
  }

}

