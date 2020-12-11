//Returns the corresponding key to the maximum value in a object wich values are numbers
export const maxKey = (v) => {
  let absComponent = Object.values(v).map(number => Math.abs(number))
  let maxIndex = absComponent.indexOf(Math.max.apply(Math, absComponent))

  return Object.keys(v)[maxIndex];
}

export const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//Esta funcion devuelve el array de la diferencia entre dos arrays de objetos
 function splicedRubik(array1, array2){
    function comparer(otherArray){
      return (current) =>{
        return otherArray.filter((other) =>{
          return other.key === current.key
        }).length === 0;
      }
    }
    var onlyInA = array1.filter(comparer(array2));
    var onlyInB = array2.filter(comparer(array1));

    return onlyInA.concat(onlyInB)
  }