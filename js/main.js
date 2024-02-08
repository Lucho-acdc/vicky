document.addEventListener("DOMContentLoaded", function () {
  // Espera a que el documento esté listo

  // Oculta la fase de trivia inicialmente
  let faseTrivia = document.getElementById("faseTrivia");

  // Maneja el clic en el botón de comenzar
  let comenzarBtn = document.getElementById("comenzarBtn");
  comenzarBtn.addEventListener("click", function () {
    // Oculta la fase de introducción
    let faseIntroduccion = document.getElementById("faseIntroduccion");
    faseIntroduccion.style.display = "none";

    // Muestra la fase de trivia
    faseTrivia.style.display = "block";
    faseTrivia.classList.add("mostrar");
  });

  // Resto de tu código para cargar preguntas y verificar respuestas
  let preguntas = [
    {
      pregunta: "¿Fecha de nuestro primer beso?",
      opciones: ["12/02/21", "13/02/21", "14/02/21"],
      respuestaCorrecta: "13/02/21",
    },
    {
      pregunta: "¿Cuál fue la primera canción que me dedicaste?",
      opciones: [
        "Vámonos de viaje",
        "A la vez",
        "Adonde quieras",
      ],
      respuestaCorrecta: "Adonde quieras",
    },
    {
      pregunta: "¿Cuál es mi recuerdo favorito de nuestra primera cita?",
      opciones: [
        "Cuando me tendiste la mano",
        "Como disfrutaste la hamburguesa",
        "Pasear hasta el amanecer",
        "Nuestro primer beso",
        "Todas son correctas",
      ],
      respuestaCorrecta: "Todas son correctas",
    },
  ];

  let preguntaActual = 0;

  function cargarPregunta() {
    let preguntaElement = document.getElementById("pregunta");
    preguntaElement.textContent = preguntas[preguntaActual].pregunta;
  
    let opcionesElement = document.getElementById("opciones");
    opcionesElement.innerHTML = "";
  
    preguntas[preguntaActual].opciones.forEach(function (opcion, index) {
      let listItem = document.createElement("li");
  
      let radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.id = "opcion" + index;
      radioInput.name = "selector";
      radioInput.value = opcion;
  
      let label = document.createElement("label");
      label.htmlFor = "opcion" + index;
      label.textContent = opcion;
  
      let check = document.createElement("div");
      check.classList.add("check");
  
      listItem.appendChild(radioInput);
      listItem.appendChild(check);
      listItem.appendChild(label);
  
      opcionesElement.appendChild(listItem);
    });
  }
  

  let verificarRespuestaBtn = document.getElementById("verificarRespuesta");
  verificarRespuestaBtn.addEventListener("click", function () {
    let errorContainer = document.getElementById("errorContainer");
    errorContainer.style.display = "none";

    let respuestaSeleccionada = document.querySelector("input[name='selector']:checked");

    if (!respuestaSeleccionada) {
      errorContainer.textContent = "¡No hagas trampa! Selecciona una respuesta.";
      errorContainer.style.display = "block";
      return;
    }

    if (
      respuestaSeleccionada.value === preguntas[preguntaActual].respuestaCorrecta
    ) {
      preguntaActual++;

      if (preguntaActual < preguntas.length) {
        cargarPregunta();
      } else {
        faseTrivia.classList.remove("mostrar");
        faseTrivia.style.display = "none";
        document.getElementById("faseMemotest").style.display = "block";
      }
    } else {
      errorContainer.textContent = "Respuesta incorrecta. Inténtalo de nuevo.";
      errorContainer.style.display = "block";
    }
  });

  cargarPregunta();
});


document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("start");
  const stopButton = document.getElementById("stop");
  const avanzarMemotestButton = document.getElementById("avanzarMemotestButton");
  const gameContainer = document.querySelector(".game-container");
  const result = document.getElementById("result");
  const controls = document.querySelector(".controls-container");
  let cards;
  let interval;
  let firstCard = false;
  let secondCard = false;
  let firstCardValue;

  //Items array
  const items = [
    { name: "1", image: "./img/1.png" },
    { name: "2", image: "./img/2.png" },
    { name: "3", image: "./img/3.png" },
    { name: "4", image: "./img/4.png" },
    { name: "5", image: "./img/5.png" },
    { name: "6", image: "./img/6.png" },
    { name: "7", image: "./img/7.png" },
    { name: "8", image: "./img/8.png" },
  ];

  //Initial Time
  let seconds = 0,
    minutes = 0;

  //Initial moves and win count
  let movesCount = 0,
    winCount = 0;

  //For timer
  const timeGenerator = () => {
    seconds += 1;
    //minutes logic
    if (seconds >= 60) {
      minutes += 1;
      seconds = 0;
    }
    //format time before displaying
    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  };

  //For calculating moves
  const movesCounter = () => {
    movesCount += 1;
  };

  //Pick random objects from the items array
  const generateRandom = (size = 4) => {
    //temporary array
    let tempArray = [...items];
    //initializes cardValues array
    let cardValues = [];
    //size should be double (4*4 matrix)/2 since pairs of objects would exist
    size = (size * size) / 2;
    //Random object selection
    for (let i = 0; i < size; i++) {
      const randomIndex = Math.floor(Math.random() * tempArray.length);
      cardValues.push(tempArray[randomIndex]);
      //once selected remove the object from temp array
      tempArray.splice(randomIndex, 1);
    }
    return cardValues;
  };

  const matrixGenerator = (cardValues, size = 4) => {
    gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    //simple shuffle
    cardValues.sort(() => Math.random() - 0.5);
    for (let i = 0; i < size * size; i++) {
      gameContainer.innerHTML += `
       <div class="card-container" data-card-value="${cardValues[i].name}">
          <div class="card-before">?</div>
          <div class="card-after">
          <img src="${cardValues[i].image}" class="image"/></div>
       </div>
       `;
    }
    gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;
    cards = document.querySelectorAll(".card-container");

    // Aplicar estilos a las imágenes para ajustar su tamaño
    document.querySelectorAll(".image").forEach((img) => {
      img.style.maxWidth = "100%";
      img.style.maxHeight = "100%";
    });

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        //If selected card is not matched yet then only run (i.e already matched card when clicked would be ignored)
        if (!card.classList.contains("matched")) {
          //flip the cliked card
          card.classList.add("flipped");
          //if it is the firstcard (!firstCard since firstCard is initially false)
          if (!firstCard) {
            //so current card will become firstCard
            firstCard = card;
            //current cards value becomes firstCardValue
            firstCardValue = card.getAttribute("data-card-value");
          } else {
            //increment moves since user selected second card
            movesCounter();
            //secondCard and value
            secondCard = card;
            let secondCardValue = card.getAttribute("data-card-value");
            if (firstCardValue == secondCardValue) {
              //if both cards match add matched class so these cards would beignored next time
              firstCard.classList.add("matched");
              secondCard.classList.add("matched");
              //set firstCard to false since next card would be first now
              firstCard = false;
              //winCount increment as user found a correct match
              winCount += 1;
              //check if winCount ==half of cardValues
              if (winCount == Math.floor(cardValues.length / 2)) {
                stopButton.style.display = "none";
                avanzarMemotestButton.style.display = "block";
              }
            } else {
              //if the cards dont match
              //flip the cards back to normal
              let [tempFirst, tempSecond] = [firstCard, secondCard];
              firstCard = false;
              secondCard = false;
              let delay = setTimeout(() => {
                tempFirst.classList.remove("flipped");
                tempSecond.classList.remove("flipped");
              }, 900);
            }
          }
        }
      });
    });
  };

  //Start game
  startButton.addEventListener("click", () => {
    movesCount = 0;
    seconds = 0;
    minutes = 0;
    //controls amd buttons visibility
    controls.classList.add("hide");
    stopButton.classList.remove("hide");
    startButton.classList.add("hide");
    initializer();
  });

  //Stop game
  stopButton.addEventListener("click", () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  });

  //Initialize values and func calls
  const initializer = () => {
    result.innerText = "";
    winCount = 0;
    let cardValues = generateRandom();
    console.log(cardValues);
    matrixGenerator(cardValues);
  };

  document.getElementById("avanzarMemotestButton").addEventListener("click", avanzarMemotest);

  function avanzarMemotest() {
    console.log("Avanzando al siguiente paso...");
    document.getElementById("faseMemotest").style.display = "none";
    document.getElementById("fasePreAcertijo").style.display = "block";
  }

});

document.getElementById("avanzarPreAcertijo").addEventListener("click", avanzarPreAcertijo);

function avanzarPreAcertijo() {
  console.log("Avanzando al siguiente paso...");
  document.getElementById("fasePreAcertijo").style.display = "none";
  document.getElementById("faseAcertijo").style.display = "block";
}
    
document.getElementById("verificarAcertijo").addEventListener("click", verificarAcertijo);

function verificarAcertijo() {
  // Obtén la respuesta ingresada por el jugador
  const respuestaIngresada = document.getElementById("respuestaAcertijo").value.trim().toLowerCase();
  
  // Obtén el contenedor de errores
  const errorAcertijo = document.getElementById("errorAcertijo");
  // Limpia el contenido del contenedor de errores
  errorAcertijo.innerHTML = "";

  // Verifica si la respuesta ingresada está vacía
  if (respuestaIngresada === "") {
    // Respuesta vacía, muestra un mensaje de error y no avanza a la siguiente fase
    mostrarError("¡No hagas trampa! Ingresa una respuesta.");
    setTimeout(() => {
      errorAcertijo.innerHTML = "";
    }, 2000); // 5 segundos
    return;
  }

  // Verifica la respuesta (cambia "respuestaCorrecta" por la respuesta real)
  const respuestaCorrecta = "anillo";

  if (respuestaIngresada === respuestaCorrecta) {
    // Respuesta correcta, avanza a la siguiente fase
    document.getElementById("faseAcertijo").style.display = "none";
    document.getElementById("fasePropuesta").style.display = "block";
  } else {
    // Respuesta incorrecta, muestra un mensaje de error y limpia el input después de 15 segundos
    mostrarError("Respuesta incorrecta. Intenta de nuevo.");
    setTimeout(() => {
      document.getElementById("respuestaAcertijo").value = "";
      errorAcertijo.innerHTML = "";
    }, 2000); // 5 segundos
  }

  // Función para mostrar mensajes de error
  function mostrarError(mensaje) {
    errorAcertijo.textContent = mensaje;
    errorAcertijo.style.display = "block";
  }
}



// Event listeners para los botones en la fase de propuesta
document.getElementById("opcionSi1").addEventListener("click", function () {
    document.getElementById("fasePropuesta").style.display = "none";
    mostrarAnimacionCelebracion();
    document.getElementById("faseRespuestaPositiva").style.display = "block";
});
  
document.getElementById("opcionSi2").addEventListener("click", function () {
    document.getElementById("fasePropuesta").style.display = "none";
    mostrarAnimacionCelebracion();
    document.getElementById("faseRespuestaPositiva").style.display = "block";
});
  
document.getElementById("opcionSi3").addEventListener("click", function () {
    document.getElementById("fasePropuesta").style.display = "none";
    mostrarAnimacionCelebracion();
    document.getElementById("faseRespuestaPositiva").style.display = "block";
});
  
document.getElementById("opcionSi4").addEventListener("click", function () {
    document.getElementById("fasePropuesta").style.display = "none";
    mostrarAnimacionCelebracion();
    document.getElementById("faseRespuestaPositiva").style.display = "block";
});
  
document.getElementById("opcionNo").addEventListener("click", function () {
    document.getElementById("fasePropuesta").style.display = "none";
    document.getElementById("faseErrorRespuesta").style.display = "block";
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
      ctx.font = "30px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
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

      mostrarMensaje(); // Llama a la función para mostrar el mensaje "Te amo" en el centro

      window.requestAnimationFrame(draw);
  }

  function mostrarMensaje() {
      ctx.font = '30px "Segoe UI", Tahoma, Geneva, Verdana, sans-serif';
      ctx.fillStyle = 'white';
      ctx.fillText('Te amo', canvas.width / 2 - 60, canvas.height / 2);
  }

  window.addEventListener('resize', function () {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
  });

  init();
  draw();
}

// function gameOver() {
//   gameOverDiv = document.createElement('div');
//   gameOverDiv.id = 'gameOverDiv';

//   let canvas = document.createElement('canvas');
//   document.getElementsByTagName('body')[0].appendChild(canvas);
//   canvas.style.position = 'absolute';
//   canvas.style.width = '100%';
//   canvas.style.height = '100%';

//   canvas.width = canvas.clientWidth;
//   canvas.height = canvas.clientHeight;

//   let ctx = canvas.getContext('2d');

//   function rndNum(num) {
//       return Math.random() * num + 1;
//   }

//   function drawText(text, x, y) {
//       ctx.font = '15px "Segoe UI", Tahoma, Geneva, Verdana, sans-serif';
//       ctx.fillStyle = 'white';
//       ctx.fillText(text, x, y);
//   }

//   function draw() {
//       ctx.fillStyle = 'rgba(0,0,0,0.1)';
//       ctx.fillRect(0, 0, canvas.width, canvas.height);
//   }

//   function createRandomText() {
//       drawText('¡404 Error... Todo es bronca y dolor!', rndNum(canvas.width / 2), rndNum(canvas.height / 2));
//   }

//   function loop() {
//       requestAnimationFrame(loop);
//       draw();
//   }

//   loop();

//   setInterval(createRandomText, 1000);
// }

