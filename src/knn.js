const fs = require('fs')

const calculateDistance = (valueList, newValue) => {
  if(valueList.length === newValue.length)
  {
    let sum = 0
    for(let i = 0; i < valueList.length - 1; i++){
      sum += Math.pow((newValue[i]-valueList[i]),2)
    }
    return Math.sqrt(sum)
  }
  return 0
}

const readFile = async (nameFile) => {
  const file = fs.readFileSync(__dirname + '/tests/' + nameFile,'utf-8')
  const list = file.split('\n')
  const fileAux = []
  let fileReturn = []
  list.forEach(line => {
    fileAux.push(line.toString().split(','))
  })
  fileAux.forEach(line => {
    fileReturn.push([])
    line.forEach(line => {
      fileReturn[fileReturn.length - 1].push(parseInt(line) ? parseInt(line) : line)
    })
  })
  fileReturn = fileReturn.splice(1)
  return fileReturn
}

const compareSmaller = (list, smallers,vetIndex) => {
  for (let i = 0; i < list.length; i++) {
    for(let j = 0; j < smallers.length; j++) {
      if(!vetIndex.includes(i) && list[i] < smallers[j])
      {
        smallers[j] = list[i]
        vetIndex[j] = i
      }
    }
  }
}

const smaller = (k,value, listTrainings) => {
  let smallers = []
  let indexSmaller = []
  for(let i = 0; i < k; i++){
    smallers.push(100000000000)
    indexSmaller.push(0)
  }
  let distances = []
  listTrainings.forEach((element, index) => {
    distances.push(calculateDistance(element, value))
  })
  compareSmaller(distances,smallers,indexSmaller)
  return indexSmaller
}

const classify = (values, listTraining) => {
  const map = new Map()
  values.forEach(value => {
    if(!map.has(listTraining[value][listTraining[0].length - 1]))
      map.set(listTraining[value][listTraining[0].length - 1], 0)
    map.set(listTraining[value][listTraining[0].length - 1], map.get(listTraining[value][listTraining[0].length - 1]))
  })
  let classs = [...map.keys()]
  let occurrences = [...map.values()]
  let bigger = 0
  let indexBigger = 0
  for(let i = 0; i < occurrences.length; i++) {
    if(bigger < occurrences[i]){
      indexBigger = i
    }
  }
  return classs[indexBigger]
  //PARECE UM SONHO A GNT FICA JUNTO
}

const getClass = (list) => {
  const classR = []
  list.forEach(elem => {
    if(!classR.includes(elem[elem.length - 1]))
      classR.push(elem[elem.length - 1])
  })
  return classR
}

const generateMatrix = (length) => {
  const matrix = []
  for(let i = 0; i < length; i++){
    matrix.push([])
    for(let j = 0; j < length; j++){
      matrix[matrix.length - 1].push(0)
    }
  }
  
  return matrix
}

const knn = async (k,nameFileTest, nameFileTraining) => {
  const fileTraining = await readFile(nameFileTraining)
  const fileExecute = await readFile(nameFileTest)
  const resultsExecute = []
  fileExecute.forEach((line,index) => {
    const resultSmallers = smaller(k,line,fileTraining)
    resultsExecute.push(classify(resultSmallers,fileTraining))
  })
  const classResults = getClass(fileExecute)
  const matrix = generateMatrix(classResults.length)
  console.log(classResults)
  classResults.sort()
  resultsExecute.sort()
  resultsExecute.forEach((value ,index)=> {
      matrix[classResults.indexOf(value)][classResults.indexOf(value)]++
  })

  return {matrix, classResults}
}

module.exports = { knn }