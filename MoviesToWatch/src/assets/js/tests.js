
  async function getNomeFilm(nome) {
    indirizzo = 'https://imdb8.p.rapidapi.com/title/find?q=';
    nome.split(' ').join('%20')
    const response = await fetch(this.indirizzo + nome, {
      method: "GET",
      headers:{
        'x-rapidapi-key': 'af622af5f0msh7c4f3576c3d19e1p1c9877jsna4822a599ad7',
        'x-rapidapi-host': 'imdb8.p.rapidapi.com'
      }

    });
    const data = await response.json();
    console.log(data);
    const {title, titleType, year} = data['results'][0];
    document.getElementById('titolo').textContent = title;
    document.getElementById('tTitolo').textContent = titleType;
    document.getElementById('anno').textContent = year;
    const {url} = data['results'][0]['image'];
    locandina.src=url
  }

  async function GetFullCredits() {
    indirizzo = 'https://imdb8.p.rapidapi.com/title/get-full-credits?tconst=';
    const response = await fetch(this.indirizzo + 'tt1853728', {
      method: "GET",
      headers:{
        'x-rapidapi-key': 'f49ccd9ba0msh6625224d24a637cp1c66ffjsne6d5ec895a86',
        'x-rapidapi-host': 'imdb8.p.rapidapi.com'
      }

    });
    const data = await response.json();
    console.log(data);
    const {runningTimeInMinutes, title, year,} = data['base'];
    document.getElementById('titolo').textContent = title;
    document.getElementById('durata').textContent = runningTimeInMinutes;
    document.getElementById('anno').textContent = year;
    const {url} = data['base']['image'];
    locandina.src=url;
    console.log(data);
    const name=[];
    const character=[];
    const UrlImmagineAttore=[];
    for(let i=0; i<10; i++) {
      name[i] = data['cast'][i]['name'];
      document.getElementById('NomeAttore' + i).textContent = name[i];
      character[i] = data['cast'][i]['characters'][0];
      document.getElementById('Nomecharacter' + i).textContent = character[i];
      console.log(data);

    }
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



  }
