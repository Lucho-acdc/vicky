document.addEventListener('DOMContentLoaded', function () {
  const fases = ["introduccion", "miniJuego", "memotestContainer", "acertijoContainer", "propuesta"];
  let faseActual = 0;

  const preguntasMiniJuego = [
    {
      pregunta: "¿Cuál fue el día en que nos conocimos?",
      opciones: ["Opción 1", "Opción 2", "Opción 3"],
      respuestaCorrecta: "Opción 1"
    },
    {
      pregunta: "¿Cuál fue el día?",
      opciones: ["Opción 1", "Opción 2", "Opción 3"],
      respuestaCorrecta: "Opción 2"
    },
    // Agregar más preguntas aquí
  ];

  let preguntaActual = 0;

  const verificarRespuestaBtn = document.getElementById("verificarRespuesta");
  const avanzarMiniJuegoBtn = document.getElementById("avanzarMiniJuego");
  const avanzarMemotestBtn = document.getElementById("avanzarMemotest");
  const verificarAcertijoBtn = document.getElementById("verificarAcertijo");
  const avanzarPropuestaBtn = document.getElementById("avanzarPropuesta");

  function mostrarFase(fase) {
    ocultarTodasLasFases();
    const elementoFaseActual = document.getElementById(fase);
    if (elementoFaseActual) {
      elementoFaseActual.style.display = "block";
      if (fase === "memotestContainer") {
        iniciarDesafioMemotest();
      } else if (fase === "acertijoContainer") {
        // Agregar lógica para iniciar el acertijo si es necesario
      }
    } else {
      console.error(`Elemento con ID ${fase} no encontrado.`);
    }
  }

  function ocultarTodasLasFases() {
    fases.forEach(f => {
      const elementoFase = document.getElementById(f);
      if (elementoFase) {
        elementoFase.style.display = "none";
      }
    });
  }

  function avanzarFase() {
    faseActual++;
    if (faseActual < fases.length) {
        mostrarFase(fases[faseActual]);
        console.log(`Avanzando a fase: ${fases[faseActual]}`);
        if (fases[faseActual] === "memotestContainer") {
            iniciarDesafioMemotest();
        }
    }
}


  function mostrarPregunta() {
    const preguntaTexto = document.getElementById("pregunta");
    const opcionesContainer = document.getElementById("opcionesContainer");

    preguntaTexto.textContent = preguntasMiniJuego[preguntaActual].pregunta;
    opcionesContainer.innerHTML = "";

    preguntasMiniJuego[preguntaActual].opciones.forEach((opcion, index) => {
      const inputRadio = document.createElement("input");
      inputRadio.type = "radio";
      inputRadio.name = "opcion";
      inputRadio.value = opcion;
      opcionesContainer.appendChild(inputRadio);

      const label = document.createElement("label");
      label.textContent = opcion;
      opcionesContainer.appendChild(label);

      opcionesContainer.appendChild(document.createElement("br"));
    });

    mostrarBotones();
    console.log(`Mostrando pregunta: ${preguntaActual + 1}`);
  }

  function avanzarPregunta() {
    // Restablecer el estado de los botones
    const opciones = document.getElementsByName("opcion");
    opciones.forEach(opcion => {
      opcion.disabled = false;
    });

    if (preguntaActual < preguntasMiniJuego.length - 1) {
      preguntaActual++;
      mostrarPregunta();
      console.log(`Avanzando a pregunta: ${preguntaActual + 1}`);
    } else {
      avanzarFase();
      console.log("Avanzando a la siguiente fase");
    }
  }

  function verificarRespuesta() {
    const opciones = document.getElementsByName("opcion");
    let respuestaSeleccionada = null;
  
    for (const opcion of opciones) {
      if (opcion.checked) {
        respuestaSeleccionada = opcion.value;
        break;
      }
    }
  
    if (!respuestaSeleccionada) {
      // No se seleccionó ninguna respuesta
      alert("No hagas trampa, hay que responder todo.");
      return;
    }
  
    if (respuestaSeleccionada === preguntasMiniJuego[preguntaActual].respuestaCorrecta) {
      avanzarMiniJuegoBtn.style.display = "block";
      verificarRespuestaBtn.style.display = "none";
      console.log("Respuesta correcta");
  
      // Agregar el alert cuando la respuesta es correcta
      alert("¡Respuesta correcta!");
  
      avanzarPregunta(); // Avanzar a la siguiente pregunta si la respuesta es correcta
    } else {
      // Si la respuesta es incorrecta, muestra el mensaje de error
      mostrarErrorRespuesta();
    }
  }
  
  function mostrarBotones(esCorrecta) {
    if (esCorrecta) {
      verificarRespuestaBtn.style.display = "none";
      avanzarMiniJuegoBtn.style.display = "block";
    } else {
      verificarRespuestaBtn.style.display = "block";
      avanzarMiniJuegoBtn.style.display = "none";
    }
  }
  
  function mostrarErrorRespuesta() {
    const confirmacion = confirm("Respuesta incorrecta. ¿Queres volver a intentar la pregunta?");
  
    if (confirmacion) {
      reiniciarPregunta();
    } else {
      console.log("El usuario no quiere volver a intentar la pregunta");
    }
  }
  
  function reiniciarPregunta() {
    const opciones = document.getElementsByName("opcion");
    opciones.forEach(opcion => (opcion.checked = false));
    mostrarBotones(false); // Habilitar el botón de verificar respuesta
  }
  
  let juegoMemotestCompleto = false;
  let reiniciarMemotestBtn = document.getElementById("reiniciarMemotest");


  function iniciarDesafioMemotest() {
    let tarjetasDestapadas = 0;
    let tarjeta1 = null;
    let tarjeta2 = null;
    let primerResultado = null;
    let segundoResultado = null;
    let aciertos = 0;
  
    let avanzarMemotestBtn = document.getElementById("avanzarMemotest");

    let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  
    // Revolver el arreglo de números para los otros botones
    numeros = numeros.sort(() => {
      return Math.random() - 0.5;
    });
  
    function bloquearTarjetas() {
      for (let i = 1; i <= 16; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./img/${numeros[i]}.png">`;
        tarjetaBloqueada.disabled = true;
      }
    }

  
    function reiniciarJuego() {
      // Restablecer todas las variables y estado del juego
      tarjetasDestapadas = 0;
      tarjeta1 = null;
      tarjeta2 = null;
      primerResultado = null;
      segundoResultado = null;
      aciertos = 0;
    
      // Limpiar contenido y habilitar botones
      for (let i = 1; i <= 16; i++) {
        let tarjeta = document.getElementById(i);
        tarjeta.innerHTML = "";
        tarjeta.disabled = false;
        tarjeta.classList.remove('igualado');
      }
    
      // Revolver nuevamente los números para las tarjetas
      numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8].sort(() => {
        return Math.random() - 0.5;
      });
    
      setTimeout(() => {
        reiniciarMemotestBtn.style.display = "none";
        reiniciarMemotestBtn.innerHTML = "";
    
        // Mostrar el botón después de un breve retraso
        setTimeout(() => {
          reiniciarMemotestBtn.style.display = "block";
          reiniciarMemotestBtn.textContent = "Reiniciar";
        }, 10); // Ajusta el tiempo según tu preferencia
      }, 10); // Ajusta el tiempo según tu preferencia
    }
    
    function destapar(e) {
      const buttonId = e.target.id;
      
      if (buttonId && buttonId.length <= 2 && !isNaN(buttonId)) {
        let reiniciarMemotestBtn = document.getElementById("reiniciarMemotest");
        reiniciarMemotestBtn.style.display = "block";
        reiniciarMemotestBtn.textContent = "Reiniciar";
        tarjetasDestapadas++;

          if (tarjetasDestapadas === 1) {
            tarjeta1 = e.target;
            primerResultado = numeros[buttonId - 1];
            tarjeta1.innerHTML = `<img src="./img/${primerResultado}.png">`;
            tarjeta1.disabled = true;
          } else if (tarjetasDestapadas === 2) {
            tarjeta2 = e.target;
            segundoResultado = numeros[buttonId - 1];
            tarjeta2.innerHTML = `<img src="./img/${segundoResultado}.png">`;
            tarjeta2.disabled = true;
        
            if (primerResultado === segundoResultado) {
              tarjetasDestapadas = 0;
              aciertos++;
        
              // Marcamos las tarjetas como "igualado"
              tarjeta1.classList.add('igualado');
              tarjeta2.classList.add('igualado');
        
              if (aciertos === 8) {
                avanzarMemotestBtn.style.display = "block";
              }
            } else {
              setTimeout(() => {
                console.log("Destapando tarjetas...");
        
                // Modificamos esta parte para que solo se destapen las fichas que no son iguales
                if (!tarjeta1.classList.contains('igualado')) {
                  tarjeta1.innerHTML = "";
                  tarjeta1.disabled = false;
                }
                if (!tarjeta2.classList.contains('igualado')) {
                  tarjeta2.innerHTML = "";
                  tarjeta2.disabled = false;
                }
                tarjetasDestapadas = 0;
        
                console.log("Tarjetas destapadas:", tarjetasDestapadas);
              }, 500);
            }
          }
        }
    }
    
  
    // Agregar evento clic para reiniciar el juego
    reiniciarMemotestBtn.addEventListener('click', reiniciarJuego);
  
    const buttons = document.querySelectorAll('button');
  
    buttons.forEach(button => {
      button.addEventListener('click', destapar);
    });
  }
  
  
  
  

  function verificarAcertijo() {
    const respuestaAcertijo = document.getElementById("respuestaAcertijo").value.toLowerCase();
    const respuestaCorrecta = "anillo";
    
    if (respuestaAcertijo.trim() === "") {
      alert("No hagas trampa. La respuesta está vacía.");
    } else if (respuestaAcertijo === respuestaCorrecta) {
      avanzarFase();
      console.log("Respuesta correcta, avanzando a la siguiente fase");
    } else {
      alert("Respuesta incorrecta, inténtalo de nuevo");
      // Puedes agregar más lógica aquí según tus necesidades
    }
  }

  document.getElementById('comenzarBtn').addEventListener('click', function () {
    preguntaActual = 0;
    mostrarPregunta();
    avanzarFase();
  });

  document.getElementById('avanzarMiniJuego').addEventListener('click', avanzarPregunta);
  document.getElementById('verificarRespuesta').addEventListener('click', verificarRespuesta);
  document.getElementById('avanzarMemotest').addEventListener('click', avanzarFase);
  document.getElementById('verificarAcertijo').addEventListener('click', verificarAcertijo);
  document.getElementById('avanzarPropuesta').addEventListener('click', avanzarFase);

  mostrarFase(fases[faseActual]);
  mostrarPregunta();
});

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
  if (button.id.startsWith('opcionSi')) {
    button.addEventListener('click', mostrarAnimacionCelebracion);
  } else if (button.id === 'opcionNo') {
    button.addEventListener('click', mostrarGameOver);
  }
});

function mostrarAnimacionCelebracion() {
  var rnd = Math.random,
    flr = Math.floor;

  let canvas = document.createElement('canvas');
  document.getElementsByTagName('body')[0].appendChild(canvas);
  canvas.style.position = 'absolute';
  canvas.style.width = '100%';
  canvas.style.height = '100%';

  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  let ctx = canvas.getContext('2d');

  function rndNum(num) {
    return rnd() * num + 1;
  }

  function vector(x, y) {
    this.x = x;
    this.y = y;

    this.add = function (vec2) {
      this.x = this.x + vec2.x;
      this.y = this.y + vec2.y;
    }
  }

  function particle(pos, vel) {
    this.pos = new vector(pos.x, pos.y);
    this.vel = vel;
    this.dead = false;
    this.start = 0;

    this.update = function (time) {
      let timeSpan = time - this.start;

      if (timeSpan > 500) {
        this.dead = true;
      }

      if (!this.dead) {
        this.pos.add(this.vel);
        this.vel.y = this.vel.y + gravity;
      }
    };

    this.draw = function () {
      if (!this.dead) {
        drawDot(this.pos.x, this.pos.y, 1);
      }
    }
  }

  function firework(x, y) {
    this.pos = new vector(x, y);
    this.vel = new vector(0, -rndNum(10) - 3);
    this.color = 'hsl(' + rndNum(360) + ', 100%, 50%)'
    this.size = 4;
    this.dead = false;
    this.start = 0;
    let exParticles = [],
      exPLen = 100;

    let rootShow = true;

    this.update = function (time) {
      if (this.dead) {
        return;
      }

      rootShow = this.vel.y < 0;

      if (rootShow) {
        this.pos.add(this.vel);
        this.vel.y = this.vel.y + gravity;
      } else {
        if (exParticles.length === 0) {
          flash = true;
          for (let i = 0; i < exPLen; i++) {
            exParticles.push(new particle(this.pos, new vector(-rndNum(10) + 5, -rndNum(10) + 5)));
            exParticles[exParticles.length - 1].start = time;
          }
        }
        let numOfDead = 0;
        for (let i = 0; i < exPLen; i++) {
          let p = exParticles[i];
          p.update(time);
          if (p.dead) {
            numOfDead++;
          }
        }

        if (numOfDead === exPLen) {
          this.dead = true;
        }
      }
    }

    this.draw = function () {
      if (this.dead) {
        return;
      }

      ctx.fillStyle = this.color;
      if (rootShow) {
        drawDot(this.pos.x, this.pos.y, this.size);
      } else {
        for (let i = 0; i < exPLen; i++) {
          let p = exParticles[i];
          p.draw();
        }
      }
    }
  }

  function drawDot(x, y, size) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  var fireworks = [],
    gravity = 0.2,
    snapTime = 0,
    flash = false;

  function init() {
    let numOfFireworks = 20;
    for (let i = 0; i < numOfFireworks; i++) {
      fireworks.push(new firework(rndNum(canvas.width), canvas.height));
    }
  }

  function update(time) {
    for (let i = 0, len = fireworks.length; i < len; i++) {
      let p = fireworks[i];
      p.update(time);
    }
  }

  function draw(time) {
    update(time);

    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    if (flash) {
      flash = false;
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.font = "30px Arial";
    let newTime = time - snapTime;
    snapTime = time;

    ctx.fillStyle = 'blue';
    for (let i = 0, len = fireworks.length; i < len; i++) {
      let p = fireworks[i];
      if (p.dead) {
        fireworks[i] = new firework(rndNum(canvas.width), canvas.height);
        p = fireworks[i];
        p.start = time;
      }
      p.draw();
    }

    window.requestAnimationFrame(draw);
  }

  window.addEventListener('resize', function () {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  });

  init();
  draw();

  // Agregar un texto "TE AMO" en el centro
  let textoTeAmo = document.createElement('div');
  textoTeAmo.innerText = 'TE AMO';
  textoTeAmo.style.position = 'absolute';
  textoTeAmo.style.top = '50%';
  textoTeAmo.style.left = '50%';
  textoTeAmo.style.transform = 'translate(-50%, -50%)';
  textoTeAmo.style.fontSize = '24px';
  document.body.appendChild(textoTeAmo);

}

function ocultarAnimacionCelebracion() {
  // Aquí puedes agregar lógica para detener o limpiar la animación si es necesario.
  let canvas = document.querySelector('canvas');
  if (canvas) {
    canvas.parentNode.removeChild(canvas);
  }
}

function mostrarGameOver() {

  let propuesta = document.getElementById('propuesta');
  propuesta.style.display = 'none';

  let errorRespuesta = document.getElementById('errorRespuesta');
  errorRespuesta.style.display = 'block';

  console.log("Mostrar Game Over");
  // Resto de la lógica
}

function reiniciarJuego() {
  ocultarAnimacionCelebracion();
  ocultarBotones()
  // Resto de la lógica para reiniciar el juego...
  console.log("Reiniciando el juego");
  window.location.reload();
}


function volverARespuestas() {
  ocultarBotones(); // Ocultar los botones al volver a las propuestas
  ocultarAnimacionCelebracion();
  // Resto de la lógica...
  console.log("Volviendo a las respuestas");
  let propuesta = document.getElementById('propuesta');
  if (propuesta) {
    propuesta.style.display = 'block';
  } else {
    console.error("Elemento con ID 'propuesta' no encontrado.");
  }
  let reiniciarBtnExistente = document.getElementById('reiniciarBtn');
  if (reiniciarBtnExistente) {
    reiniciarBtnExistente.remove();
  }
}

function ocultarBotones() {
  let reiniciarBtn = document.getElementById('reiniciarBtn');
  let volverRespuestasBtn = document.getElementById('volverRespuestasBtn');

  if (reiniciarBtn) {
    reiniciarBtn.style.display = 'none';
  }

  if (volverRespuestasBtn) {
    volverRespuestasBtn.style.display = 'none';
  }
}


// Asigna el evento clic al botón "Volver a las Respuestas"
document.getElementById('reiniciarBtn').addEventListener('click', reiniciarJuego);
document.getElementById('volverRespuestasBtn').addEventListener('click', volverARespuestas);