const books = JSON.parse(document.getElementById('raw-text').innerText)

      const classes = ['normal','water','electric','fire','psychic','dark','grass','ice','fairy']

      const cardCollection = document.getElementById('cards')

      
      for(let i = 0; i < books.length; i++) {

        const {ISBN,titolo,autore} = books[i]

        const rand_class = classes[Math.floor(Math.random() * classes.length)]

        cardCollection.innerHTML += 

        `
        <figure class="card card--${rand_class}">
            <figcaption class="card__caption">
              <h3 class="card__type">${ISBN}</h3>
              <h1 class="card__name">${titolo}</h1>
              
              <div class="card__abilities">
                <h4 class="card__ability">
                  <span class="card__label">Author</span>
                  ${autore}
                </h4>
              </div>
            </figcaption>
          </figure>
        `
      }