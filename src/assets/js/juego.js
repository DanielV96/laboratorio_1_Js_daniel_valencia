/**
 * 2C = 2 de trebol (clubs)
 * 2D = 2 de diamante (diamant)
 * 2H = 2 de corazón (heart)
 * 2S = 2 de picas (spades)
 */

let baraja = []
const tipos = ['C', 'D', 'H', 'S']
const letras = ['J', 'Q', 'K', 'A']

const crearBaraja = () => {
  //Se puebla el arreglo con los números y tipos de la baraja
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      baraja.push(i + tipo)
    }
  }
  // Se puebla el arreglo con letras y tipos de la baraja
  for (let letra of letras) {
    for (let tipo of tipos) {
      baraja.push(letra + tipo)
    }
  }

  baraja = _.shuffle(baraja)
}

crearBaraja()

console, console.log(baraja)

//Esta función pide una carta
const pedirCarta = () => {
  if (baraja.length === 0) throw 'No hay cartas en la baraja'

  const index = Math.floor(Math.random() * 51)
  console.log({ index })

  const carta = baraja.splice(index, 1)[0]
  console.log({ carta })
  console.log({ baraja })
  return carta
}

pedirCarta()

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1)
  return isNaN(valor) ? (valor === 'A' ? 11 : 10) : Number(valor)
}

console.log(valorCarta(pedirCarta()))
