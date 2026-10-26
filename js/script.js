// =====================================================
//  CALCULADORA DE MATERIALES - script.js
//  Todo el codigo esta explicado con comentarios
// =====================================================

// Variable para saber que espesor de muro esta elegido (20 o 30)
var espesorMuro = 30;


// ---------- FUNCIONES GENERALES ----------

// Muestra una pantalla y esconde las demas
function mostrarPantalla(id) {
  var pantallas = document.querySelectorAll(".pantalla");
  for (var i = 0; i < pantallas.length; i++) {
    pantallas[i].classList.add("oculta");
  }
  document.getElementById(id).classList.remove("oculta");
  window.scrollTo(0, 0);
}

// Lee un numero de un input (por su id)
function leer(id) {
  return parseFloat(document.getElementById(id).value);
}

// Revisa que todos los numeros sean validos (mayores a 0)
function sonValidos(lista) {
  for (var i = 0; i < lista.length; i++) {
    if (isNaN(lista[i]) || lista[i] <= 0) {
      alert("Escribe todos los datos con numeros mayores a 0");
      return false;
    }
  }
  return true;
}

// Muestra el cuadro verde con los resultados
// lineas es una lista de pares: [["Texto", "valor"], ["Texto", "valor"]]
function mostrarResultado(idCaja, lineas) {
  var html = "<h3>Resultado</h3>";
  for (var i = 0; i < lineas.length; i++) {
    html += "<p>" + lineas[i][0] + " <b>" + lineas[i][1] + "</b></p>";
  }
  var caja = document.getElementById(idCaja);
  caja.innerHTML = html;
  caja.classList.remove("oculta");
}


// ---------- USUARIOS (se guardan en el navegador con localStorage) ----------

// Trae la lista de usuarios guardados
function obtenerUsuarios() {
  var texto = localStorage.getItem("usuarios");
  if (texto == null) {
    return [];
  }
  return JSON.parse(texto);
}

// Guarda la lista de usuarios
function guardarUsuarios(lista) {
  localStorage.setItem("usuarios", JSON.stringify(lista));
}

// Buscar un usuario por su nombre de usuario (devuelve la posicion o -1)
function buscarUsuario(usuario) {
  var lista = obtenerUsuarios();
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].usuario == usuario) {
      return i;
    }
  }
  return -1;
}


// ---------- 1. LOGIN ----------
function iniciarSesion() {
  var usuario = document.getElementById("loginUsuario").value.trim();
  var clave = document.getElementById("loginClave").value;

  var posicion = buscarUsuario(usuario);

  if (posicion == -1 || obtenerUsuarios()[posicion].clave != clave) {
    alert("Usuario o contrasena incorrectos");
    return;
  }

  // Saludo con el primer nombre
  var nombreCompleto = obtenerUsuarios()[posicion].nombre;
  var primerNombre = nombreCompleto.split(" ")[0];
  document.getElementById("saludo").innerText = "Hola, " + primerNombre;

  document.getElementById("loginUsuario").value = "";
  document.getElementById("loginClave").value = "";
  mostrarPantalla("menu");
}


// ---------- 2. REGISTRO ----------
function registrarUsuario() {
  var nombre = document.getElementById("regNombre").value.trim();
  var usuario = document.getElementById("regUsuario").value.trim();
  var clave = document.getElementById("regClave").value;
  var clave2 = document.getElementById("regClave2").value;

  if (nombre == "" || usuario == "" || clave == "") {
    alert("Completa todos los campos");
    return;
  }
  if (clave.length < 6) {
    alert("La contrasena debe tener minimo 6 caracteres");
    return;
  }
  if (clave != clave2) {
    alert("Las contrasenas no coinciden");
    return;
  }
  if (buscarUsuario(usuario) != -1) {
    alert("Ese usuario ya existe, elige otro");
    return;
  }

  var lista = obtenerUsuarios();
  lista.push({ nombre: nombre, usuario: usuario, clave: clave });
  guardarUsuarios(lista);

  alert("Cuenta creada. Ya puedes iniciar sesion");
  document.getElementById("regNombre").value = "";
  document.getElementById("regUsuario").value = "";
  document.getElementById("regClave").value = "";
  document.getElementById("regClave2").value = "";
  mostrarPantalla("login");
}


// ---------- 3. RECUPERAR USUARIO ----------
function recuperarCuenta() {
  var usuario = document.getElementById("recUsuario").value.trim();
  var nombre = document.getElementById("recNombre").value.trim();
  var claveNueva = document.getElementById("recClave").value;

  var posicion = buscarUsuario(usuario);

  if (posicion == -1) {
    alert("Ese usuario no existe");
    return;
  }

  var lista = obtenerUsuarios();

  // Verificamos que el nombre completo coincida (sin importar mayusculas)
  if (lista[posicion].nombre.toLowerCase() != nombre.toLowerCase()) {
    alert("El nombre completo no coincide con el usuario");
    return;
  }
  if (claveNueva.length < 6) {
    alert("La contrasena debe tener minimo 6 caracteres");
    return;
  }

  lista[posicion].clave = claveNueva;
  guardarUsuarios(lista);

  alert("Contrasena cambiada. Ya puedes iniciar sesion");
  document.getElementById("recUsuario").value = "";
  document.getElementById("recNombre").value = "";
  document.getElementById("recClave").value = "";
  mostrarPantalla("login");
}


// ---------- 4. MENU: SALIR ----------
function cerrarSesion() {
  mostrarPantalla("login");
}


// ---------- 5. MURO DE LADRILLO ----------
// Cambia el boton activo de 20 cm / 30 cm
function elegirEspesor(cm) {
  espesorMuro = cm;
  document.getElementById("btn20").classList.remove("activo");
  document.getElementById("btn30").classList.remove("activo");
  document.getElementById("btn20").innerHTML = "20 cm";
  document.getElementById("btn30").innerHTML = "30 cm";

  document.getElementById("btn" + cm).classList.add("activo");
  document.getElementById("btn" + cm).innerHTML = cm + " cm &#10003;";
}

function calcularMuro() {
  var largo = leer("muroLargo");
  var alto = leer("muroAlto");
  if (!sonValidos([largo, alto])) return;

  var superficie = largo * alto; // m2

  // Cantidades por cada m2 de muro
  var cementoPorM2, arenaPorM2, ladrillosPorM2;
  if (espesorMuro == 30) {
    cementoPorM2 = 15.2;
    arenaPorM2 = 0.1147;
    ladrillosPorM2 = 120;
  } else {
    cementoPorM2 = 10.13;
    arenaPorM2 = 0.0765;
    ladrillosPorM2 = 80;
  }

  mostrarResultado("resMuro", [
    ["Superficie", superficie.toFixed(2) + " m2"],
    ["Cemento necesario", (superficie * cementoPorM2).toFixed(2) + " kg"],
    ["Arena necesaria", (superficie * arenaPorM2).toFixed(2) + " m3"],
    ["Ladrillos", Math.ceil(superficie * ladrillosPorM2) + " unid."]
  ]);
}


// ---------- 6. VIGA DE HORMIGON ----------
// Hormigon: por cada m3 se usan 350 kg de cemento, 0.5 m3 de arena y 0.8 m3 de piedra
function calcularViga() {
  var largo = leer("vigaLargo");
  var ancho = leer("vigaAncho") / 100; // de cm a metros
  var alto = leer("vigaAlto") / 100;   // de cm a metros
  var cantidad = leer("vigaCantidad");
  if (!sonValidos([largo, ancho, alto, cantidad])) return;

  var volumen = largo * ancho * alto * cantidad; // m3

  mostrarResultado("resViga", [
    ["Volumen de hormigon", volumen.toFixed(2) + " m3"],
    ["Cemento necesario", (volumen * 350).toFixed(2) + " kg"],
    ["Arena necesaria", (volumen * 0.5).toFixed(2) + " m3"],
    ["Piedra necesaria", (volumen * 0.8).toFixed(2) + " m3"]
  ]);
}


// ---------- 7. COLUMNAS DE HORMIGON ----------
function calcularColumnas() {
  var cantidad = leer("colCantidad");
  var alto = leer("colAlto");
  var lado1 = leer("colLado1") / 100;
  var lado2 = leer("colLado2") / 100;
  if (!sonValidos([cantidad, alto, lado1, lado2])) return;

  var volumen = cantidad * alto * lado1 * lado2; // m3

  mostrarResultado("resColumnas", [
    ["Volumen de hormigon", volumen.toFixed(2) + " m3"],
    ["Cemento necesario", (volumen * 350).toFixed(2) + " kg"],
    ["Arena necesaria", (volumen * 0.5).toFixed(2) + " m3"],
    ["Piedra necesaria", (volumen * 0.8).toFixed(2) + " m3"]
  ]);
}


// ---------- 8. CONTRAPISO ----------
// Por cada m3: 300 kg de cemento, 0.55 m3 de arena y 0.85 m3 de piedra
function calcularContrapiso() {
  var largo = leer("conLargo");
  var ancho = leer("conAncho");
  var espesor = leer("conEspesor") / 100;
  if (!sonValidos([largo, ancho, espesor])) return;

  var superficie = largo * ancho;
  var volumen = superficie * espesor;

  mostrarResultado("resContrapiso", [
    ["Superficie", superficie.toFixed(2) + " m2"],
    ["Volumen", volumen.toFixed(2) + " m3"],
    ["Cemento necesario", (volumen * 300).toFixed(2) + " kg"],
    ["Arena necesaria", (volumen * 0.55).toFixed(2) + " m3"],
    ["Piedra necesaria", (volumen * 0.85).toFixed(2) + " m3"]
  ]);
}


// ---------- 9. TECHO ----------
// El techo inclinado es 15% mas grande que el piso (por eso multiplicamos por 1.15)
// Usamos 12 tejas por m2 y 3 metros de listones por m2
function calcularTecho() {
  var largo = leer("techoLargo");
  var ancho = leer("techoAncho");
  if (!sonValidos([largo, ancho])) return;

  var superficie = largo * ancho * 1.15;

  mostrarResultado("resTecho", [
    ["Superficie del techo", superficie.toFixed(2) + " m2"],
    ["Tejas necesarias", Math.ceil(superficie * 12) + " unid."],
    ["Listones de madera", (superficie * 3).toFixed(2) + " m"]
  ]);
}


// ---------- 10. PISOS ----------
// Se suma 10% de baldosas extra por si se rompen
// Pegamento: 5 kg por m2
function calcularPisos() {
  var largo = leer("pisoLargo");
  var ancho = leer("pisoAncho");
  var lado = leer("pisoBaldosa") / 100;
  if (!sonValidos([largo, ancho, lado])) return;

  var superficie = largo * ancho;
  var areaBaldosa = lado * lado;
  var baldosas = Math.ceil((superficie / areaBaldosa) * 1.1);

  mostrarResultado("resPisos", [
    ["Superficie", superficie.toFixed(2) + " m2"],
    ["Baldosas (con 10% extra)", baldosas + " unid."],
    ["Pegamento necesario", (superficie * 5).toFixed(2) + " kg"]
  ]);
}


// ---------- 11. PINTURA ----------
// Un litro de pintura rinde 12 m2 por mano. Un galon tiene 3.78 litros
function calcularPintura() {
  var largo = leer("pinLargo");
  var alto = leer("pinAlto");
  var manos = leer("pinManos");
  if (!sonValidos([largo, alto, manos])) return;

  var superficie = largo * alto;
  var litros = (superficie * manos) / 12;

  mostrarResultado("resPintura", [
    ["Superficie a pintar", superficie.toFixed(2) + " m2"],
    ["Pintura necesaria", litros.toFixed(2) + " litros"],
    ["Galones", Math.ceil(litros / 3.78) + " galon(es)"]
  ]);
}