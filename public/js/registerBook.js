function registerBook (e) {
    e.preventDefault()
    const ISBN = document.getElementById('inputISBN').value
    const titolo =  document.getElementById('inputTitolo').value
    const autore =  document.getElementById('inputAutore').value

    const data = {ISBN,titolo,autore}

    fetch('/',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
    })
    .then(res => {
        if (res.status == 200) alert('Book successfully registered')
        else if (res.status == 500) res.json().then(json => console.log(json)).catch(e => console.log(e.message))
        else res.json().then(json => console.log(json)).catch(e => console.log(e.message))
    }).catch(e => console.log(e.message))
}