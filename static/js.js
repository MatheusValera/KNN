getData = async () =>{
  const data = JSON.stringify({k: 3})
  let result = ''
  await fetch('/knnTest', { headers: { 'Content-Type': 'application/json'}, method: 'POST', body: data })
    .then( async (response) => {
      result = await response.json()
  })
  console.log(result)
}

showData = async () => {
  const data = JSON.stringify({k: $('#k').val()})
  let matrix = ''

  console.log("F:")

  await fetch('/knn', { headers: { 'Content-Type': 'application/json'}, method: 'POST', body: data })
    .then( async (response) => {
      matrix = await response.json()
  })


  let table = document.createElement('table')
  let row = document.createElement('tr')
  for(let x=0; x<7; x++){

    row.append(document.createElement(th).html('X'+(x+1)))
  }
  table.append(row)

  matrix.forEach(elem => {
    let row = document.createElement('tr')
    row.append(document.createElement(td).html(e))
    elem.forEach(e => {
      row.append(document.createElement(td).html(e))
    });
    table.append(row)
  });
}

