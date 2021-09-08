domande_array  = [
  ["Action" , "Fatti travolgere dall&apos;azione"],
  ["Adventure" , "Pronto per vivere una nuova avventura&quest;"],
  ["Animation" , "Film d&apos;animazione&quest;"],
  ["Biography" , " Ti senti inspirato per una biografia&quest;"],
  ["Comedy" , "Giornata triste&quest; Guarda una commedia"],
  ["Crime" , "Ti piace risolvere crimini&quest;"],
  ["Documentary" , "Un po&apos; di informazione non fa mai male. Un documentario&quest;"],
  ["Drama" , "Dramma&quest; Io amo il dramma"],
  ["Family" , " Giornata in famiglia&quest;"],
  ["Fantasy" , "Nel mood per un fantasy&quest;"],
  ["FilmNoir" , "Che ne dici di un Noir&quest;"],
  ["History" , "Voglia di storia&quest;"],
  ["Horror" , "Qualcosa di spaventoso&quest;"],
  ["Music" , "Un po&apos; di musica&quest;"],
  ["Musical" , "Guarda un musical"],
  ["Mystery" , "Risolviamo un mistero"],
  ["Romance" , "Il romanticismo &egrave; nell&apos;aria "],
  ["SciFi" , "Entra nel mondo dei film di fantascienza."],
  ["Sport" , "Film sportivo&quest;"],
  ["Thriller" , "Cosa ne dici di un Thriller"],
  ["War" , "Film di guerra&quest;"],
  ["Western" , "Un viaggio nel vecchio West&quest;"],
  ["2020", "2020"],
  ["2021", "2021"],
  ["2000", "2000"],
  ["2005", "2005"],
  ["1999", "1999"],
  ["1990", "90'"],
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

let result
function QuestionarioStart(){
  let range = domande_array.length;
  let outputCount = domande_array.length;

  result = randomUniqueNum(range, outputCount)
  console.log(result)
  document.getElementById("div_domanda").innerHTML = "Questionario Iniziato";
  GenerateDomanda()
}


let i = -1;
let risposte = [];
function GenerateDomanda(){
  i++;
  if(i >= domande_array.length){
    console.log("domande finite");
    document.getElementById("div_domanda").innerHTML = "Domande finite";
    document.getElementById("question-actions_actions").hidden = true;
    return;
  }
  document.getElementById("question-actions_actions").hidden = false;
  console.log(domande_array);
  console.log(result);
  console.log("i:" + i);
  console.log(result[i]);
  document.getElementById("div_domanda").innerHTML = domande_array[result[i]][1];
  risposte[i] = domande_array[result[i]];
  console.log(risposte[i][0]);
}

let risposteSi = [];
let countSi = 0;
function ClickSi(){
  console.log("hai premuto si");
  risposteSi[countSi] = risposte[i][0];
  console.log(risposteSi);
  countSi++;
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


