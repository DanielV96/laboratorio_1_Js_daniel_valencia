/**
 * 2C = 2 de trebol (clubs)
 * 2D = 2 de diamante (diamant)
 * 2H = 2 de corazón (heart)
 * 2S = 2 de picas (spades)
 */

let baraja = []
const tipos = ['C', 'D', 'H', 'S']
const letras = ['J', 'Q', 'K', 'A']

let playerPoints = 0
let pcPoints = 0

// Referencias al Html
const btnPedir = document.querySelector('#btn-pedir')
// const smallPuntajeJugador = document.querySelector('small')
const btnDetener = document.querySelector('#btn-detener')
const btnNuevo = document.querySelector('#btn-nuevo')
const puntosHtml = document.querySelectorAll('small')
const divJugadorCartas = document.querySelector('#player-cards')
divComputadoraCartas = document.querySelector('#pc-cards')

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

// console.log(baraja)

//Esta función pide una carta
const pedirCarta = () => {
  const barajaTamanio = baraja.length
  if (barajaTamanio === 0) throw 'No hay cartas en la baraja'

  const index = Math.floor(Math.random() * barajaTamanio)
  // console.log({ index })

  const carta = baraja.splice(index, 1)[0]
  // console.log({ carta })
  // console.log({ baraja })
  return carta
}

pedirCarta()

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1)
  return isNaN(valor) ? (valor === 'A' ? 11 : 10) : Number(valor)
}
// console.log(valorCarta(pedirCarta()))

// Turno de la computadora
const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta()
    pcPoints += valorCarta(carta)
    puntosHtml[1].innerText = pcPoints

    const imgCarta = document.createElement('img')
    imgCarta.src = `assets/cartas/${carta}.png`
    imgCarta.classList.add('carta')
    divComputadoraCartas.append(imgCarta)
    if (puntosMinimos > 21) break
  } while (pcPoints <= puntosMinimos && puntosMinimos <= 21)

  setTimeout(() => {
    if (puntosMinimos === pcPoints) alert('Hubo empate')
    else if (puntosMinimos > 21) alert('Pc Win')
    else if (pcPoints > 21) alert('perfect! you Win')
    else alert('Pc Win')
  }, 100)
}

// Eventos
btnPedir.addEventListener('click', () => {
  const carta = pedirCarta()
  // console.log({ carta })
  playerPoints += valorCarta(carta)
  console.log({ playerPoints })
  // smallPuntajeJugador.innerText = playerPoints
  puntosHtml[0].innerText = playerPoints
  // <img class="carta" src="assets/cartas/7C.png" alt="" />
  const imgCarta = document.createElement('img')
  imgCarta.src = `assets/cartas/${carta}.png`
  imgCarta.classList.add('carta')
  divJugadorCartas.append(imgCarta)

  if (playerPoints > 21) {
    btnPedir.disabled = true
    btnDetener.disabled = true
    console.warn('Sorry you lost')
    turnoComputadora(playerPoints)
  } else if (playerPoints === 21) {
    btnPedir.disabled = true
    btnDetener.disabled = true
    console.log('21! You Won')
    turnoComputadora(playerPoints)
  }
})

btnDetener.addEventListener('click', () => {
  btnPedir.disabled = true
  btnDetener.disabled = true
  turnoComputadora(playerPoints)
})

btnNuevo.addEventListener('click', () => {
  playerPoints = 0
  pcPoints = 0
  btnPedir.disabled = false
  btnDetener.disabled = false
  puntosHtml[0].innerText = 0
  puntosHtml[1].innerText = 0
  divJugadorCartas.innerHTML = ''
  divComputadoraCartas.innerHTML = ''
  console.clear()
  crearBaraja()
})
