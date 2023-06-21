const toggle = document.getElementById('toggleDark'); //Toggle me permte cambiar de estado haciendole un click y en js caonfigre para que cambiara el icono
const body = document.querySelector('body');
const form = document.querySelector('form');  //asi llame a la query de style para poder hacer los cambios traje a form y body 
const h1script = document.querySelector('h1script');
var classes = ["font1", "font2", "font3"]; //aqui estoy llamando a las 3 tipos diferentes de fuentes para poder cambiarlas en el formulario
var classIndex = 2;

toggle.addEventListener('click', function(){  //dandole la funcion click 
    this.classList.toggle('bi-moon'); //esto genera la animacion de la luna
    if(this.classList.toggle('bi-brightness-high-fill')){ 
        body.style.background = 'white';
        body.style.color = 'black';
        body.style.transition = '2s'; //esto genera una tansicion que se puede manipular en segundos para que el cambio no se vea tan brusco
        form.style.background = 'white';
        form.style.color = 'black';
        document.getElementById('h1text').innerHTML = 'Oscuro'; //me permite cambier el texto desde el archivo js
    



    }else{
        body.style.background = 'black'; 
        body.style.color = 'white';
        body.style.transition = '2s';
        form.style.background = 'darkgrey';
        form.style.color = 'white';
        document.getElementById('h1text').innerHTML = 'Claro';

    }
});

document.getElementById('aumentar').addEventListener('click', function() { //aqui estan ambos botones con sus funciones que permite hacer los cambios de fuentes recorriendo la lista que empieza en el indice 2
  let previousClass = classIndex;
  classIndex++;
  classIndex = (classIndex == classes.length) ? classes.length - 1 : classIndex;
  changeClass(previousClass, classIndex);
});

document.getElementById('disminuir').addEventListener('click', function() {
  let previousClass = classIndex;
  classIndex--;
  classIndex = (classIndex < 0) ? 0 : classIndex;
  changeClass(previousClass, classIndex);
});

function changeClass(previous, next) {
  if (previous != next) {
    var htmlElement = document.querySelector('form')
    htmlElement.classList.remove(classes[previous]);
    htmlElement.classList.add(classes[next]);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var formulario = document.getElementById('formulario');
  var datos = []; // Array para almacenar los datos del formulario
  var tablaContenedor = document.getElementById('tabla-contenedor');

  // Cargar datos del almacenamiento local
  var datosAlmacenados = localStorage.getItem('datos');
  if (datosAlmacenados) {
    datos = JSON.parse(datosAlmacenados);
  }

  formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    var nombre = document.getElementById('nombre');
    var apellido = document.getElementById('apellido');
    var correo = document.getElementById('correo');
    var contrasena = document.getElementById('contrasena');
    var edad = document.getElementById('edad');
    var genero = document.querySelector('input[name="genero"]:checked');
    var cumpleanos = document.getElementById('cumpleanos');
    var aceptoCheckbox = document.getElementById('acepto');

    // Validaciones de campos obligatorios
    if (!nombre.value.trim()) {
      nombre.classList.add('invalid');
    } else {
      nombre.classList.remove('invalid');
    }

    if (!apellido.value.trim()) {
      apellido.classList.add('invalid');
    } else {
      apellido.classList.remove('invalid');
    }

    if (!correo.value.trim()) {
      correo.classList.add('invalid');
    } else {
      correo.classList.remove('invalid');
    }

    if (!contrasena.value.trim()) {
      contrasena.classList.add('invalid');
    } else {
      contrasena.classList.remove('invalid');
    }

    if (!edad.value.trim()) {
      edad.classList.add('invalid');
    } else {
      edad.classList.remove('invalid');
    }

    if (!genero) {
      var generoRadios = document.querySelectorAll('input[name="genero"]');
      generoRadios.forEach(function(radio) {
        radio.classList.add('invalid');
      });
    } else {
      var generoRadios = document.querySelectorAll('input[name="genero"]');
      generoRadios.forEach(function(radio) {
        radio.classList.remove('invalid');
      });
    }

    if (!cumpleanos.value.trim()) {
      cumpleanos.classList.add('invalid');
    } else {
      cumpleanos.classList.remove('invalid');
    }

    // Validaciones de campos individuales
    var correoRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    if (correo.value.trim() && !correoRegex.test(correo.value.trim())) {
      correo.classList.add('invalid');
    } else {
      correo.classList.remove('invalid');
    }

    if (contrasena.value.trim() && contrasena.value.trim().length < 6) {
      contrasena.classList.add('invalid');
    } else {
      contrasena.classList.remove('invalid');
    }

    // Verificar si hay algún campo inválido
    var camposInvalidos = formulario.querySelectorAll('.invalid');
    if (camposInvalidos.length > 0) {
      console.log('Por favor, complete todos los campos correctamente.');
      return;
    }

    // Todos los campos son válidos, guardar los datos en el objeto
    var nuevoRegistro = {
      nombre: nombre.value.trim(),
      apellido: apellido.value.trim(),
      correo: correo.value.trim(),
      contrasena: contrasena.value.trim(),
      edad: edad.value.trim(),
      genero: genero.value,
      cumpleanos: cumpleanos.value.trim(),
      acepto: aceptoCheckbox.checked // Agregar el campo "acepto" al nuevo registro
    };

    // Si hay un registro seleccionado, reemplazarlo en el array de datos
    var indiceSeleccionado = formulario.dataset.indiceSeleccionado;
    if (indiceSeleccionado !== undefined) {
      datos[indiceSeleccionado] = nuevoRegistro;
    } else {
      // Agregar el nuevo registro al array de datos
      datos.push(nuevoRegistro);
    }

    // Validar el checkbox de aceptación
    if (!aceptoCheckbox.checked) {
      console.log('Debes aceptar los términos y condiciones.');
      return;
    }

    // Generar la tabla nuevamente con los datos actualizados
    generarTabla(datos);

    // Limpiar los campos del formulario
    nombre.value = '';
    apellido.value = '';
    correo.value = '';
    contrasena.value = '';
    edad.value = '';
    genero.checked = false;
    cumpleanos.value = '';
    aceptoCheckbox.checked = false;
    formulario.removeAttribute('data-indice-seleccionado');

    // Guardar datos en el almacenamiento local
    localStorage.setItem('datos', JSON.stringify(datos));

    console.log('Registro insertado/editado:', nuevoRegistro);
  });

  function generarTabla(data) {
    // Limpiar contenido previo de la tabla
    tablaContenedor.innerHTML = '';

    // Crear tabla
    var tabla = document.createElement('table');
    tabla.classList.add('table-registros');

    // Crear encabezado de la tabla
    var thead = document.createElement('thead');
    var encabezado = document.createElement('tr');
    for (var campo in data[0]) {
      var th = document.createElement('th');
      th.textContent = campo.charAt(0).toUpperCase() + campo.slice(1); // Capitalizar primer letra del campo
      encabezado.appendChild(th);
    }
    encabezado.innerHTML += '<th>Acciones</th>'; // Agregar columna para acciones
    thead.appendChild(encabezado);
    tabla.appendChild(thead);

    // Crear filas de la tabla con los registros
    var tbody = document.createElement('tbody');
    data.forEach(function(registro, index) {
      var fila = document.createElement('tr');
      for (var campo in registro) {
        var td = document.createElement('td');
        if (campo === 'contrasena') {
          var span = document.createElement('span');
          span.textContent = '•••••';
          span.setAttribute('data-contrasena', registro[campo]);
          span.classList.add('contrasena-oculta');
          td.appendChild(span);
        } else {
          td.textContent = registro[campo];
        }
        fila.appendChild(td);
      }
      var acciones = document.createElement('td');
      var botonEditar = document.createElement('button');
      botonEditar.textContent = 'Editar';
      botonEditar.classList.add('boton-editar');
      botonEditar.addEventListener('click', function() {
        editarRegistro(index);
      });
      acciones.appendChild(botonEditar);
      var botonEliminar = document.createElement('button');
      botonEliminar.textContent = 'Eliminar';
      botonEliminar.classList.add('boton-eliminar');
      botonEliminar.addEventListener('click', function() {
        eliminarRegistro(index);
      });
      acciones.appendChild(botonEliminar);
      fila.appendChild(acciones);
      tbody.appendChild(fila);
    });
    tabla.appendChild(tbody);

    // Agregar la tabla al contenedor
    tablaContenedor.appendChild(tabla);
  }

  function editarRegistro(index) {
    // Obtener el registro correspondiente al índice dado
    var registro = datos[index];

    // Asignar los valores del registro a los campos del formulario
    document.getElementById('nombre').value = registro.nombre;
    document.getElementById('apellido').value = registro.apellido;
    document.getElementById('correo').value = registro.correo;
    document.getElementById('contrasena').value = registro.contrasena;
    document.getElementById('edad').value = registro.edad;
    document.querySelector('input[value="' + registro.genero + '"]').checked = true;
    document.getElementById('cumpleanos').value = registro.cumpleanos;
    document.getElementById('acepto').checked = registro.acepto;

    // Establecer el índice seleccionado en el formulario
    formulario.dataset.indiceSeleccionado = index;
  }

  function eliminarRegistro(index) {
    // Eliminar el registro del array de datos
    datos.splice(index, 1);

    // Generar la tabla nuevamente con los datos actualizados
    generarTabla(datos);

    // Guardar datos en el almacenamiento local
    localStorage.setItem('datos', JSON.stringify(datos));

    console.log('Registro eliminado en el índice', index);
  }

  // Generar la tabla inicialmente con los datos cargados
  generarTabla(datos);
});
