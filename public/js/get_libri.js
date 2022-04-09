let global_books = []

const change = (e) => {
  if(e.target.value == 'Titolo'){
    global_books.sort((a,b) => {
      if (a.titolo.toUpperCase() > b.titolo.toUpperCase()) return 1
      else return -1
    })
    generate_cards(global_books)
  } else if (e.target.value == 'Autore'){
    global_books.sort((a,b) => {
      if (a.autore.toUpperCase() > b.autore.toUpperCase()) return 1
      else return -1
    })
    generate_cards(global_books)
  }
}

const switchs = document.getElementsByName('select')

for(const radioButton of switchs){
  radioButton.addEventListener('change', change);
} 

get_books()

function get_books(){
  
  fetch('/get_libri',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({order:'titolo'})
  }) .then(res => res.json()
      .then(json => generate_cards(json))
      .catch(e => console.log(e.message))
      ).catch(e => console.log(e.message))
}



function generate_cards(books){
  global_books = books

  const classes = ['normal','water','electric','fire','psychic','dark','grass','ice','fairy']

  const cardCollection = document.getElementById('cards')

  cardCollection.innerHTML = ""


  for(let i = 0; i < global_books.length; i++) {

    const {ISBN, titolo, autore} = global_books[i]

    const rand_class = classes[Math.floor(Math.random() * classes.length)]

    cardCollection.innerHTML += 

    `
    <figure class="card card--${rand_class}">
        <figcaption class="card__caption">
            <i class="material-icons" style="color:red" onclick="delete_book('${ISBN}')">delete</i>
            <i class="material-icons" style="color:green" onclick="edit_book(this)">edit</i>
          <h3 class="card__type" id="isbn">
            ${ISBN}
          </h3>
          <h1 class="card__name" id="titolo">${titolo}</h1>
          <div class="card__abilities">
            <h4 class="card__ability">
              <span class="card__label">Author</span>
              <text id="autore">${autore}</text>
            </h4>
          </div>
        </figcaption>
      </figure>
    `
  }
}

function delete_book(b){
  const d = window.prompt('Vuoi eliminare il libro dal catalogo? (Y/N)');
  if(d.toUpperCase() != "Y") return
  fetch('/' + b,{
    method:'DELETE',
  }).then(() => get_books())
}

function edit_book(b){
  console.log('edit')
}