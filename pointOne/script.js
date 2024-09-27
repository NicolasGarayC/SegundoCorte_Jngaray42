// Expresión regular para validar un correo electrónico, incluyendo aquellos en formato <correo@dominio.com>
const emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/;

// Función arrow para validar los correos
const validateEmails = () => {
  const emailField = document.getElementById('emails');
  const invalidEmailsField = document.getElementById('invalidEmails');

  // Obtener el valor de los correos separados por ';' o ',' o saltos de línea, y limpiar espacios innecesarios
  const emails = emailField.value.split(/[\n;,]+/).map(email => email.trim());

  // Listas para correos válidos e inválidos
  let validEmails = [];
  let invalidEmails = [];

  // Validar cada correo
  emails.forEach(email => {
    // Extraer solo el correo si viene con formato nombre <correo@dominio.com>
    const extractedEmail = email.match(emailRegex) ? email.match(emailRegex)[0] : null;

    if (extractedEmail && emailRegex.test(extractedEmail)) {
      validEmails.push(extractedEmail);  // Si es válido, se agrega a la lista de válidos
    } else if (email) {  // Si es inválido y no está vacío
      invalidEmails.push(email);  // Se agrega a la lista de inválidos
    }
  });

  // Actualizar el campo de correos válidos (mostramos solo los correos válidos, separados por "; ")
  emailField.value = validEmails.join('; ');

  // Actualizar el campo de correos erróneos
  invalidEmailsField.value = invalidEmails.join('; ');

  // Cambiar el estilo del campo de correos erróneos según si hay o no errores
  if (invalidEmails.length > 0) {
    invalidEmailsField.classList.add('error');
  } else {
    invalidEmailsField.classList.remove('error');
  }
};

// Escucha el evento "blur" cuando el usuario salga del campo de correos
document.getElementById('emails').addEventListener('blur', validateEmails);
