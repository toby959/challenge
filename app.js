document.addEventListener('DOMContentLoaded', function () {
  const currentDate = new Date();
  const options = { year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('es-AR', options);

  const currentDateElement = document.getElementById('currentDate');
  if (currentDateElement) {
    currentDateElement.textContent = formattedDate;
  }
});
/////////////////////////fecha-footer////////////////////////////////////////////////////  
// encriptar el texto
function encriptarTexto(texto) {
  let textoEncriptado = texto.replace(/e/g, "enter");
  textoEncriptado = textoEncriptado.replace(/i/g, "imes");
  textoEncriptado = textoEncriptado.replace(/a/g, "ai");
  textoEncriptado = textoEncriptado.replace(/o/g, "ober");
  textoEncriptado = textoEncriptado.replace(/u/g, "ufat");
  return textoEncriptado;
}
// desencriptar el texto
function desencriptarTexto(textoEncriptado) {
  let textoDesencriptado = textoEncriptado.replace(/enter/g, "e");
  textoDesencriptado = textoDesencriptado.replace(/imes/g, "i");
  textoDesencriptado = textoDesencriptado.replace(/ai/g, "a");
  textoDesencriptado = textoDesencriptado.replace(/ober/g, "o");
  textoDesencriptado = textoDesencriptado.replace(/ufat/g, "u");
  return textoDesencriptado;
}
// borrar el texto del textarea
function borrarTexto() {
  const textareaOrigen = document.querySelector('.textarea-container textarea');
  textareaOrigen.value = '';
}
document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.querySelector('.textarea-container textarea');
  const encryptButton = document.querySelector('.buttons .btn[href="about.html"]');
  const message = document.querySelector('.message');

  function borrarTexto(event) {
    event.preventDefault();
    textarea.value = '';
    message.style.display = 'none';
  }
  function enviarTexto(event) {
    event.preventDefault(); // Evita la redirección por defecto
    const texto = textarea.value;
    const regex = /^[a-z\s]*$/;
    if (regex.test(texto)) {
      const textoEncriptado = encriptarTexto(texto);
      localStorage.setItem('textoEncriptar', textoEncriptado);
      // mostrar mensaje
      alert("Debes presionar el botón 'Copiar' para luego desencriptar");
      // redirige 'about.html' y limpi el textarea
      textarea.value = '';
      window.location.href = 'about.html';
    } else {
      // mostrar mensaje de advertencia y limpiar
      message.style.display = 'block';
      alert('No se aceptan mayúsculas, caracteres especiales o acentos.');
      textarea.value = '';
    }
  }
  if (encryptButton) {
    encryptButton.addEventListener('click', enviarTexto);
  }

  const borrarBtn = document.querySelector('.buttons .btn:not([href="about.html"])');
  if (borrarBtn) {
    borrarBtn.addEventListener('click', borrarTexto);
  }
});
// cargar el texto en el textarea derecho de about.html
function cargarTexto() {
  const textoEncriptado = localStorage.getItem('textoEncriptar');
  if (textoEncriptado) {
    const textareaDestino = document.querySelector('.sidebar-2 textarea');
    if (textareaDestino) {
      textareaDestino.value = textoEncriptado;
    }
  }
}
// para copiar texto boton 'copiar'
function copiarTexto() {
  const textareaDestino = document.querySelector('.sidebar-2 textarea');
  if (textareaDestino) {
    textareaDestino.select();
    document.execCommand('copy');
    alert('Texto copiado, ahora debe precionar el boton "desencriptar". ');
    textareaDestino.value = '';  // Limpiar el textarea derecho
  }
}
// pegar el texto en el textarea izquierdo en about.html
function pegarTexto() {
  const textareaOrigen = document.querySelector('.textarea-container textarea');
  navigator.clipboard.readText().then((clipText) => {
    const textoDesencriptado = desencriptarTexto(clipText);
    textareaOrigen.value = textoDesencriptado;
  }).catch(err => {
    console.error('Failed to read clipboard contents: ', err);
  });
}
// verificar si el cliente esta en la pagina 'about.hmtl' 
// asigar las funciones alos botones 
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.endsWith('about.html')) {
    cargarTexto();
    const copiarBtn = document.getElementById('copiarBtn');
    if (copiarBtn) {
      copiarBtn.addEventListener('click', copiarTexto);
    }
    const pegarBtn = document.getElementById('desenBtn');
    if (pegarBtn) {
      pegarBtn.addEventListener('click', pegarTexto);
    }
    const borrarBtn = document.getElementById('borrarBtn');
    if (borrarBtn) {
      borrarBtn.addEventListener('click', borrarTexto);
    }
  }
});
/////////////////////////////  BOTONES  /////////////////////////////////
let copiado = false;
let borrado = false;
document.addEventListener('DOMContentLoaded', function () {
  // seleccionar los elementos
  const copiarBtn = document.querySelector('#copiarBtn');
  const desenBtn = document.querySelector('#desenBtn');
  const borrarBtn = document.querySelector('#borrarBtn');
  const volverBtn = document.querySelector('#volverBtn');
  // agregar el event listener al elemento copiarBtn
  if (copiarBtn !== null) {
    copiarBtn.addEventListener('click', (event) => {
      event.preventDefault();
      if (!copiado && !borrado) {
        if (desenBtn !== null) desenBtn.classList.remove('disabled');
        copiarBtn.classList.add('disabled');
        if (borrarBtn !== null) borrarBtn.classList.add('disabled');
        if (volverBtn !== null) volverBtn.classList.add('disabled');
        copiado = true;
      }
    });
  }
});
document.addEventListener('DOMContentLoaded', function () {
  // seleccionar los elementos
  const desenBtn = document.querySelector('#desenBtn');
  const copiarBtn = document.querySelector('#copiarBtn');
  const borrarBtn = document.querySelector('#borrarBtn');
  const volverBtn = document.querySelector('#volverBtn');
  // agregar el event listener al elemento desenBtn
  if (desenBtn !== null) {
    desenBtn.addEventListener('click', (event) => {
      event.preventDefault();
      if (copiado && !borrado) {
        desenBtn.classList.add('disabled');
        if (copiarBtn !== null) copiarBtn.classList.add('disabled');
        if (borrarBtn !== null) borrarBtn.classList.remove('disabled');
        if (volverBtn !== null) volverBtn.classList.remove('disabled');
      }
    });
  }
});
document.addEventListener('DOMContentLoaded', function () {
  // seleccionar los elementos
  const borrarBtn = document.querySelector('#borrarBtn');
  const volverBtn = document.querySelector('#volverBtn');
  // agregar el event listener al elemento borrarBtn
  if (borrarBtn !== null) {
    borrarBtn.addEventListener('click', (event) => {
      event.preventDefault();
      if (!borrado) {
        borrarBtn.classList.add('disabled');
        const copiarBtn = document.querySelector('#copiarBtn');
        if (copiarBtn !== null) copiarBtn.classList.add('disabled');
        const desenBtn = document.querySelector('#desenBtn');
        if (desenBtn !== null) desenBtn.classList.add('disabled');
        if (volverBtn !== null) volverBtn.classList.remove('disabled');
        borrado = true;
      }
    });
  }
  // agregar el event listener al elemento volverBtn
  if (volverBtn !== null) {
    volverBtn.addEventListener('click', (event) => {
      event.preventDefault();
      window.location.href = 'index.html';
    });
  }
});
///////////////////////////////////////////////

// con https://www.perplexity.ai/ // (refactorizado) /////////////////

// let copiado = false;
// let borrado = false;

// document.addEventListener('DOMContentLoaded', function () {
//   // Seleccionar los elementos
//   const copiarBtn = document.querySelector('#copiarBtn');
//   const desenBtn = document.querySelector('#desenBtn');
//   const borrarBtn = document.querySelector('#borrarBtn');
//   const volverBtn = document.querySelector('#volverBtn');

//   // Agregar el event listener al elemento copiarBtn
//   if (copiarBtn !== null) {
//     copiarBtn.addEventListener('click', handleCopiarClick);
//   }

//   // Agregar el event listener al elemento desenBtn
//   if (desenBtn !== null) {
//     desenBtn.addEventListener('click', handleDesenClick);
//   }

//   // Agregar el event listener al elemento borrarBtn
//   if (borrarBtn !== null) {
//     borrarBtn.addEventListener('click', handleBorrarClick);
//   }

//   // Agregar el event listener al elemento volverBtn
//   if (volverBtn !== null) {
//     volverBtn.addEventListener('click', handleVolverClick);
//   }
// });

// function handleCopiarClick(event) {
//   event.preventDefault();
//   if (!copiado && !borrado) {
//     enableDesenBtn();
//     disableButtons([copiarBtn, borrarBtn, volverBtn]);
//     copiado = true;
//   }
// }

// function handleDesenClick(event) {
//   event.preventDefault();
//   if (copiado && !borrado) {
//     disableDesenBtn();
//     enableButtons([borrarBtn, volverBtn]);
//   }
// }

// function handleBorrarClick(event) {
//   event.preventDefault();
//   if (!borrado) {
//     disableButtons([copiarBtn, desenBtn, borrarBtn]);
//     enableVolverBtn();
//     borrado = true;
//   }
// }

// function handleVolverClick(event) {
//   event.preventDefault();
//   window.location.href = 'index.html';
// }

// function enableDesenBtn() {
//   const desenBtn = document.querySelector('#desenBtn');
//   if (desenBtn !== null) {
//     desenBtn.classList.remove('disabled');
//   }
// }

// function disableDesenBtn() {
//   const desenBtn = document.querySelector('#desenBtn');
//   if (desenBtn !== null) {
//     desenBtn.classList.add('disabled');
//   }
// }

// function disableButtons(buttons) {
//   buttons.forEach((btn) => {
//     if (btn !== null) {
//       btn.classList.add('disabled');
//     }
//   });
// }

// function enableButtons(buttons) {
//   buttons.forEach((btn) => {
//     if (btn !== null) {
//       btn.classList.remove('disabled');
//     }
//   });
// }

// function enableVolverBtn() {
//   const volverBtn = document.querySelector('#volverBtn');
//   if (volverBtn !== null) {
//     volverBtn.classList.remove('disabled');
//   }
// }
