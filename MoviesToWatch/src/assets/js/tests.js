
  async function getNomeFilm( nome) {
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
    //getNomeFilm('inception');
