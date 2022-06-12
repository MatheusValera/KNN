getData = async () =>{
  const data = JSON.stringify({k: 3})
  let result = ''
  await fetch('/knnTest', { headers: { 'Content-Type': 'application/json'}, method: 'POST', body: data })
    .then( async (response) => {
      result = await response.json()
  })
  console.log(result)
}