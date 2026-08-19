window.onload = function () {
  var fichas = document.querySelectorAll(".ficha");
  button = document.createElement("button");
  button.textContent = "mostrar solo heroes";
  document.body.appendChild(button);
  button.addEventListener("click", function () {
    for (var ficha of fichas) {
      if (ficha.getAttribute("data-tipo") == "villano") {
        ficha.style.display = "none";
      } else {
        ficha.classList.add("resaltado");
      }
    }
  });

  for (var ficha of fichas) {
    ficha.addEventListener("mouseover", function () {
      this.style.backgroundColor = "#63858F";
    });
    ficha.addEventListener("mouseout", function () {
      this.style.backgroundColor = "";
    });
  }

  var imagenes = document.querySelectorAll(".ficha img");
  for (var imagen of imagenes) {
    imagen.classList.add("borde-redondeado");
  }

  function cargarFraseDelDia(callback) {
    fetch("https://catfact.ninja/fact")
      .then(function (datos) {
        return datos.json();
      })
      .then(function (datos) {
        callback(datos.fact);
      })
      .catch(function (error) {
        console.log("Error al cargar la frase del dia: ", error);
      });
  }

  //crear el boton con la frase del dia
  var buttonFrase = document.createElement("button");
  buttonFrase.textContent = "Frase del día";
  document.body.appendChild(buttonFrase);
  buttonFrase.addEventListener("click", function () {
    cargarFraseDelDia(function (frase) {
      var p = document.createElement("p");
      p.textContent = frase;
      document.body.appendChild(p);
    });
  });

  //crear el boton *
  function guardarFavorito(nombre) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        if (nombre) {
          resolve(nombre + "guardado como favorito");
        } else {
          reject(nombre + "No se guardo en favoritos");
        }
      }, 1000);
    });
  }
  for (var ficha of fichas) {
    var buttonEstrella = document.createElement("button");
    buttonEstrella.textContent = " ⭐️ Favorito";
    ficha.appendChild(buttonEstrella);
    buttonEstrella.addEventListener("click", function () {
      var nombrePersonaje = this.parentElement.querySelector(".nombre");
      guardarFavorito(nombrePersonaje.textContent)
        .then(function (mensaje) {
          console.log(mensaje);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }
};
