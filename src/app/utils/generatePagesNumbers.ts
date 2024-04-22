
const generatePagesNumbers = (currentPage: number, totalPages: number) => {
  // si el total son 7 o menos los muestra todos sin los puntos ...
  if(totalPages <= 7){
    return Array.from({length: totalPages}, (_, i)=> i+1)
  }

  // mostrar las primeras 3 paginas ... las ultimas 2 paginas
  if(currentPage <= 3){
    return [1,2,3,'...', totalPages -1, totalPages]
  }

  // paginas actual esta entre las ultimas 3 paginas
  if(currentPage >= totalPages - 2){
    return [1,2, '...', totalPages -2, totalPages -1, totalPages]
  }

  // si la pagina está en otro lugar (medio)
  return [
    1, '...', currentPage -1, currentPage, currentPage +1, '...', totalPages
  ]
  
}

export default generatePagesNumbers