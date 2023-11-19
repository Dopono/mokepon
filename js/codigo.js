const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("boton-reiniciar")
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonReiniciar = document.getElementById("boton-reiniciar")

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")

const spanMascotaJugador = document.getElementById("mascota-jugador")

const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataque-del-jugador")
const ataquesDelEnemigo = document.getElementById("ataque-del-enemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let inputLangostelvis
let inputTucapalma
let inputPydos
let mascotajugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botonAguaFuego
let botonAguaTierra
let botonTierraFuego
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasEnemigo = 3
let vidasJugador = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "assets/mokemap.jpg"
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 450

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)        
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )

    }
}

let Hipodoge = new Mokepon("Hipodoge", "assets/hipodoge.jpg", 5, "assets/hipodoge.png")

let Capipepo = new Mokepon("Capipepo","assets/capipepo.jpg", 5, "assets/capipepo.png" )

let Ratigueya = new Mokepon("Ratigueya","assets/ratigueya.jpg", 5, "assets/ratigueya.png")

let Langostelvis = new Mokepon("Langostelvis", "assets/langostelvis.jpg", 5, "assets/langostelvis.png")

let Tucapalma = new Mokepon("Tucapalma", "assets/tucapalma.jpg", 5, "assets/tucapalma.png")

let Pydos = new Mokepon("Pydos", "assets/pydos.jpg", 5, "assets/pydos.png")

const HIPODOGE_ATAQUES = [
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🌱", id: "boton-tierra"},
]
Hipodoge.ataques.push(...HIPODOGE_ATAQUES)

const CAPIPEPO_ATAQUES = [
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🌱", id: "boton-tierra"},
]
Capipepo.ataques.push(...CAPIPEPO_ATAQUES)

const RATIQUEYA_ATAQUES = [
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
]
Ratigueya.ataques.push(...RATIQUEYA_ATAQUES)


const LANGOSTELVIS_ATAQUES = [
    {nombre: "💧🔥", id: "boton-agua-fuego"},
    {nombre: "💧🔥", id: "boton-agua-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"},
]
Langostelvis.ataques.push(...LANGOSTELVIS_ATAQUES)

const TUCAPALMA_ATAQUES = [
    {nombre: "💧🌱", id: "boton-agua-tierra"},
    {nombre: "💧🌱", id: "boton-agua-tierra"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "💧", id: "boton-agua"},
]
Tucapalma.ataques.push(...TUCAPALMA_ATAQUES)

const PYDOS_ATAQUES = [
    {nombre:"🌱🔥", id: "boton-tierra-fuego"},
    {nombre:"🌱🔥", id: "boton-tierra-fuego"},
    {nombre:"🌱", id: "boton-tierra"},
    {nombre:"🔥", id: "boton-fuego"},
    {nombre:"🌱", id: "boton-tierra"},
]
Pydos.ataques.push(...PYDOS_ATAQUES)


mokepones.push(Hipodoge, Capipepo, Ratigueya, Langostelvis, Tucapalma, Pydos)
function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = "none" 
    sectionReiniciar.style.display = "none"
    sectionVerMapa.style.display = "none"

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto} alt=${mokepon.nombre}>
            </label>        
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones
    
    inputHipodoge = document.getElementById("Hipodoge")
    inputCapipepo = document.getElementById("Capipepo")
    inputRatigueya = document.getElementById("Ratigueya")
    inputLangostelvis = document.getElementById("Langostelvis")
    inputTucapalma = document.getElementById("Tucapalma")
    inputPydos = document.getElementById("Pydos")
    })
    
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)
    botonReiniciar.addEventListener("click", reiniciarJuego)
    
    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://192.168.1.93:8080/unirse")
    .then(function (res){
        console.log(res)
        if (res.ok) {
            res.text()
                .then(function (respuesta) {
                    console.log(respuesta)
                    jugadorId = respuesta
                })
        }
    })
}
function seleccionarMascotaJugador() {
    
    
    if (inputHipodoge.checked){
        spanMascotaJugador.innerHTML= inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked){
        spanMascotaJugador.innerHTML= inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked){
        spanMascotaJugador.innerHTML= inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else if (inputLangostelvis.checked){
        spanMascotaJugador.innerHTML= inputLangostelvis.id
        mascotaJugador = inputLangostelvis.id
    } else if (inputTucapalma.checked){
        spanMascotaJugador.innerHTML= inputTucapalma.id
        mascotaJugador = inputTucapalma.id
    } else if (inputPydos.checked){
        spanMascotaJugador.innerHTML= inputPydos.id
        mascotaJugador = inputPydos.id
    } else {
        alert("No hay mascota seleccionada, vuelve a intentarlo.")
        return
    }


    sectionSeleccionarMascota.style.display = "none"

    seleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display ="flex"
    iniciarMapa()
    
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://192.168.1.93:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}
function extraerAtaques(mascotaJugador) {
    let ataques 
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
        ataques = mokepones[i].ataques
    }
    }
    mostrarAtaques(ataques)
}
function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })
    
    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")
    botonAguaFuego = document.getElementById("boton-agua-fuego")
    botonAguaTierra = document.getElementById("boton-agua-tierra")
    botonTierraFuego = document.getElementById("boton-tierra-fuego")
    botones = document.querySelectorAll(".BAtaque")
}
function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                ataqueJugador.push("FUEGO")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else if (e.target.textContent === "💧") {
                ataqueJugador.push("AGUA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else if (e.target.textContent === "🌱") {
                ataqueJugador.push("TIERRA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else if (e.target.textContent === "💧🔥") {
                ataqueJugador.push("AGUAFUEGO")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else if (e.target.textContent === "💧🌱") {
                ataqueJugador.push("AGUATIERRA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else if (e.target.textContent === "🌱🔥") {
                ataqueJugador.push("TIERRAFUEGO")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            }
            if (ataqueJugador.length === 5) {
                enviarAtaques()
            }
           
        })
    })
}

function enviarAtaques() {
    fetch(`http://192.168.1.93:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://192.168.1.93:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function({ ataques }){
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}
function seleccionarMascotaEnemigo(enemigo){
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}
function ataqueAleatorioEnemigo(){
    console.log("Ataques enemigo", ataquesMokeponEnemigo);
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length -1)
    
        if(ataqueAleatorio == 0){
        ataqueEnemigo.push("FUEGO")
        } else if (ataqueAleatorio == 1){
            ataqueEnemigo.push("AGUA")
        } else if (ataqueAleatorio == 2){
            ataqueEnemigo.push("TIERRA")
        } else if (ataqueAleatorio == 3){
            ataqueEnemigo.push("AGUAFUEGO") 
        } else if (ataqueAleatorio == 4){
            ataqueEnemigo.push("AGUATIERRA")
        } else {
            ataqueEnemigo.push("TIERRAFUEGO")
        }
        console.log(ataqueEnemigo)
        iniciarPelea()
}
function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}
function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}
function combate() {
    clearInterval(intervalo)

        for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje(" EMPATE ") 

        } else if (ataqueJugador[index] === "FUEGO" && ataqueEnemigo[index] === "TIERRA") {
        indexAmbosOponentes(index, index)
        crearMensaje(" GANASTE")
        victoriasJugador++
        spanVidasJugador.innerHTML = victoriasJugador
        
        } else if(ataqueJugador[index] === "AGUA" && ataqueEnemigo[index] === "FUEGO") {
            indexAmbosOponentes(index, index)
            crearMensaje(" GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador

        } else if(ataqueJugador[index] === "TIERRA" && ataqueEnemigo[index] === "AGUA") {
            indexAmbosOponentes(index, index)
            crearMensaje(" GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador

        } else if(ataqueJugador[index] === "AGUA" && ataqueEnemigo[index] === "TIERRAFUEGO") {
            indexAmbosOponentes(index, index)
            crearMensaje(" GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador    

        } else if(ataqueJugador[index] === "AGUAFUEGO" && ataqueEnemigo[index] === "TIERRAFUEGO") {
            indexAmbosOponentes(index, index)
            crearMensaje(" GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador

        } else if(ataqueJugador[index] === "AGUAFUEGO" && ataqueEnemigo[index] === "AGUATIERRA") {
            indexAmbosOponentes(index, index)
            crearMensaje(" GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador

        } else if(ataqueJugador[index] === "AGUATIERRA" && ataqueEnemigo[index] === "TIERRAFUEGO") {
            indexAmbosOponentes(index, index)
            crearMensaje(" GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador    

        } else if(ataqueJugador[index] === "TIERRAFUEGO" && ataqueEnemigo[index] === "TIERRA") {
            indexAmbosOponentes(index, index)
            crearMensaje(" GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador     
            
        } else {
            indexAmbosOponentes(index, index)
            crearMensaje(" PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
            
        }
    }  
    revisarVidas()
}
function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("HAN EMPATADO")
    } else if(victoriasJugador > victoriasEnemigo ) {
        crearMensajeFinal(" FELICITACIONES! Ganaste 👌")
    } else {
        crearMensajeFinal(" Lo siento, perdiste 😢")
      }  
}
function crearMensaje(resultado) {
    
    const nuevoAtaqueDelJugador = document.createElement("p")
    const nuevoAtaqueDelEnemigo = document.createElement("p")
    
    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo
    
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}
function crearMensajeFinal(resultadoFinal) {
    
    sectionMensajes.innerHTML = resultadoFinal    
    sectionReiniciar.style.display = "block"
}
function reiniciarJuego() {
    location.reload()

}
function aleatorio(min, max){
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
function pintarCanvas(){

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width, 
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
    }


function enviarPosicion(x, y) {
    fetch(`http://192.168.1.93:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })    
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({enemigos}) {
                        console.log(enemigos)
                        mokeponesEnemigos = enemigos.map(function (enemigo) {
                            let mokeponEnemigo = null
                            const mokeponNombre = enemigo.mokepon.nombre || ""
                            if (mokeponNombre === "Hipodoge") {
                                mokeponEnemigo = new Mokepon("Hipodoge", "assets/hipodoge.jpg", 5, "assets/hipodoge.png" , enemigo.id )
                            } else if (mokeponNombre === "Capipepo") {
                                mokeponEnemigo = new Mokepon("Capipepo","assets/capipepo.jpg", 5, "assets/capipepo.png", enemigo.id)
                            } else if (mokeponNombre === "Ratigueya") {
                                mokeponEnemigo = new Mokepon("Ratigueya","assets/ratigueya.jpg", 5, "assets/ratigueya.png", enemigo.id)
                            } else if (mokeponNombre === "Langostelvis") {
                                mokeponEnemigo = new Mokepon("Langostelvis", "assets/langostelvis.jpg", 5, "assets/langostelvis.png", enemigo.id)
                            } else if (mokeponNombre === "Tucapalma") {
                                mokeponEnemigo = new Mokepon("Tucapalma", "assets/tucapalma.jpg", 5, "assets/tucapalma.png", enemigo.id)
                            } else if (mokeponNombre === "Pydos") {
                                mokeponEnemigo = new Mokepon("Pydos", "assets/pydos.jpg", 5, "assets/pydos.png", enemigo.id)
                            }

                            

                            mokeponEnemigo.x = enemigo.x
                            mokeponEnemigo.y = enemigo.y

                            return mokeponEnemigo
                        })                          
                    })
            }
        })
    
}
function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}
function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}
function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}
function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}
function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}
function sePresionoUnaTecla(event) {
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break
        case "ArrowDown":
            moverAbajo()
            break
        case "ArrowLeft":
            moverIzquierda()
            break
        case "ArrowRight":
            moverDerecha()
            break
        default:
            break                
    }
}
function iniciarMapa() {
    
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotajugador)
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener("keydown", sePresionoUnaTecla)

    window.addEventListener("keyup", detenerMovimiento)
}
function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
        return mokepones[i]
    }
    }
    mostrarAtaques(ataques)
}
function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x 

    const arribaMascota = 
        mascotaJugadorObjeto.y
    const abajoMascota = 
        mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = 
        mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = 
        mascotaJugadorObjeto.x 

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }
    
    detenerMovimiento()
    clearInterval(intervalo)
    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = "flex"
    sectionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)
    
}

window.addEventListener("load", iniciarJuego)

