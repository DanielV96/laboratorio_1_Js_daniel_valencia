const juego = (() => {
  /**
   * 2C = 2 de trebol (clubs)
   * 2D = 2 de diamante (diamant)
   * 2H = 2 de corazón (heart)
   * 2S = 2 de picas (spades)
   */

  let baraja = []
  const tipos = ['C', 'D', 'H', 'S'],
    letras = ['J', 'Q', 'K', 'A']

  let playerPoints = [] //El últmo jugador siempre es la Pc

  // Referencias al Html
  const btnPedir = document.querySelector('#btn-pedir'),
    btnDetener = document.querySelector('#btn-detener'),
    btnNuevo = document.querySelector('#btn-nuevo'),
    puntosHtml = document.querySelectorAll('small'),
    divCartasJugadores = document.querySelectorAll('.divCartas')

  const inicializarJuego = (numJugadores = 2) => {
    console.clear()
    baraja = crearBaraja()
    playerPoints = []

    for (let i = 0; i < numJugadores; i++) {
      playerPoints.push(0)
    }

    puntosHtml.forEach((elem) => (elem.innerText = 0))
    divCartasJugadores.forEach((elem) => (elem.innerHTML = ''))

    btnPedir.disabled = false
    btnDetener.disabled = true
  }

  const crearBaraja = () => {
    //Se reinicializa la baraja
    baraja = []

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
    return _.shuffle(baraja)
  }

  const pedirCarta = () => {
    const barajaTamanio = baraja.length
    if (barajaTamanio === 0) throw 'No hay cartas en la baraja'

    return baraja.splice(Math.floor(Math.random() * barajaTamanio), 1)[0]
  }

  // pedirCarta()

  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1)
    return isNaN(valor) ? (valor === 'A' ? 11 : 10) : Number(valor)
  }

  const acomularPuntos = (carta, turno) => {
    playerPoints[turno] += valorCarta(carta)
    puntosHtml[turno].innerText = playerPoints[turno]
    return playerPoints[turno]
  }

  const crearCarta = (carta, turno) => {
    const imgCarta = document.createElement('img')
    imgCarta.src = `assets/cartas/${carta}.png`
    imgCarta.classList.add('carta')
    divCartasJugadores[turno].append(imgCarta)
  }

  const determinarGanador = () => {
    const [puntosMinimos, pcPoints] = playerPoints

    setTimeout(() => {
      if (puntosMinimos === pcPoints) alert('Tied')
      else if (puntosMinimos > 21) alert('Pc Win')
      else if (pcPoints > 21) alert('perfect! you Win')
      else alert('Pc Win')
    }, 100)
  }

  // Turno de la computadora
  const turnoComputadora = (puntosMinimos) => {
    let pcPoints = 0
    do {
      const carta = pedirCarta()
      const turnoComputadora = playerPoints.length - 1

      pcPoints = acomularPuntos(carta, turnoComputadora)
      crearCarta(carta, turnoComputadora)

      if (puntosMinimos > 21) break
    } while (pcPoints <= puntosMinimos && puntosMinimos <= 21)

    determinarGanador()
  }

  // Eventos
  btnPedir.addEventListener('click', () => {
    btnDetener.disabled = false
    const carta = pedirCarta()
    const playerPoints = acomularPuntos(carta, 0)
    crearCarta(carta, 0)

    if (playerPoints > 21) {
      btnPedir.disabled = true
      btnDetener.disabled = true
      turnoComputadora(playerPoints)
    } else if (playerPoints === 21) {
      btnPedir.disabled = true
      btnDetener.disabled = true
      turnoComputadora(playerPoints)
    }
  })

  btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true
    btnDetener.disabled = true
    turnoComputadora(playerPoints[0])
  })

  btnNuevo.addEventListener('click', () => {
    inicializarJuego()
    console.clear()
  })

  return { nuevoJuego: inicializarJuego }
})()
