let tableResult = []
getData = async () =>{
  const data = JSON.stringify({k: 3})
  let result = ''
  await fetch('/knnTest', { headers: { 'Content-Type': 'application/json'}, method: 'POST', body: data })
    .then( async (response) => {
      result = await response.json()
  })
  console.log(result)
  tableResult = result.matrix
  showData()
}

showData = async () => {
  let table = document.createElement('table')
  let row = document.createElement('tr')
  for(let x=0; x<tableResult.length; x++){

    row.append(document.createElement(th).html('X'+(x+1)))
  }
  table.append(row)

  tableResult.forEach(elem => {
    let row = document.createElement('tr')
    row.append(document.createElement(td).html(e))
    elem.forEach(e => {
      row.append(document.createElement(td).html(e))
    });
    table.append(row)
  });
}

