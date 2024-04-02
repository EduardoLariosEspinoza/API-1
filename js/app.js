const select = document.querySelector("select");
const resultadoDiv = document.querySelector("#resultado");

async function llamada() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();

    data.forEach((element) => {
      const option = document.createElement("option");
      option.value = element.cca2;
      option.textContent = element.name.common;
      select.appendChild(option);
    });
  } catch (error) {
    console.error(error);
  }
}

async function obtenerPais(code) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${code}`
    );
    const data = await response.json();

    return data[0];
  } catch (error) {
    console.error(error);
  }
}

function imprimirInfo(infoPais) {
  const nombrePais = document.createElement("h1");
  const dinero = document.createElement("p");
  const coordenadas = document.createElement("p");

  nombrePais.textContent = infoPais.name.common;

  for (let i = 0; i < Object.keys(infoPais.currencies).length; i++) {
    dinero.innerHTML += `Moneda: ${
      infoPais.currencies[Object.keys(infoPais.currencies)[0]].name
    }, Símbolo: ${Object.keys(infoPais.currencies)[i]} <br>`;
  }

  coordenadas.innerHTML = `Latitud: ${infoPais.latlng[0]}, Longitud: ${infoPais.latlng[1]}`;

  resultadoDiv.innerHTML = "";
  resultadoDiv.appendChild(nombrePais);
  resultadoDiv.appendChild(dinero);
  resultadoDiv.appendChild(coordenadas);
}

document.addEventListener("DOMContentLoaded", () => {
  llamada();
});

select.addEventListener("change", async () => {
  const infoPais = await obtenerPais(select.value);
  imprimirInfo(infoPais);
});
