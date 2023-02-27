// Nos traemos todos los elementos necesarios
const form = document.getElementById("registrar");
const nameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");

// Checkeamos nombre de usuario
const checkUsername = () => {
	//Input Valido por defecto false
	let valid = false;
	// Guardamos en dos variables el minimo y maximo de caracteres para el nombre de usuario
	const min =5;
	const max = 10;
	// Guardamos el valor del input (nameInput) en una variable
	const username = nameInput.value.trim();
	// Si el campo esta vacio muestramos error, llamando a la funcion showError
	if (isEmpty(username)) {
		showError(nameInput, "El nombre es obligatorio");
		// Si el nombre no cumple con los requisitos de longitud, llamamos a la funcion showError
	} else if (!isBetween(username.length, min, max)) {
		showError(
			nameInput,
			`El nombre debe tener entre ${min} y ${max} caracteres`
		);
		// Si todo sale bien validamos el formulario, llamando a la funcion showSuccess y cambiamos el estado valid a true
	} else {
		showSuccess(nameInput);
		valid = true;
	}
	return valid;
};
// Checkeamos la contraseña
const checkPassword = () => {
	// Input Valido por defecto false
	let valid = false;
	// Guardamos el valor del input en una variable
	const password = passInput.value.trim();
	// Si el campo esta vacio muestro error
	if (isEmpty(password)) {
		showError(passInput, "La contraseña es obligatoria");
		// Si la contraseña no cumple con los requisitos (Segun lo que devuelva la funcion isPassSecure, creada mas abajo) muestro error
	} else if (!isPassSecure(password)) {
		showError(
			passInput,
			"La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula y un simbolo"
		);
		// SI todo sale bien validamos el formulario, llamando a la funcion showSuccess y cambiamos el estado valid a true
	} else {
		showSuccess(passInput);
		valid = true;
	}
	return valid;
};
// Checkeamos el email
const checkMail = () => {
	// Input valido por defecto false
	let valid = false;
	// Guardamos el valor del input(emailInput) en una variable
	const emailValue = emailInput.value.trim();
	// Si el campo esta vacio muestramos error, llamando a la funcion showError
	if (isEmpty(emailInput)) {
		showError(emailInput, "El mail es obligatorio");
		// Si el email no es valido (Segun lo que devuelva nuestra funcion isEmailValid, creada mas abajo), llamamos a la funcion showError
	} else if (!isEmailValid(emailValue)) {
		showError(emailInput, "El mail no es válido");
	} else {
		// Si todo sale bien validamos el formulario, llamando a la funcion showSuccess y cambiamos el estado valid a true
		showSuccess(emailInput);
		valid = true;
	}
	return valid;
};
// Funcion para verificar si se requiere un campo
// Esta funcion devuelve true si el campo esta vacio

const isEmpty = (value) => value === "";

// Funcion para verificar si la longitud del campo esta entre min y max
const isBetween = (length, min, max) => {
	return length < min || length > max ? false : true;
};

// Funciones para checkear los campos con expresiones regulares

// Email valido
const isEmailValid = (email) => {
	const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
	// Testeamos
	return re.test(email);
};

// Checkeamos si las pass tiene 8 caracteres, minuscula, mayuscula y simbolo
const isPassSecure = (pass) => {
	const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
	// Testeamos
	return re.test(pass);
};
// Funcion para mostrar error
// Recibe el input y el mensaje de error
const showError = (input, message) => {
	const registrar = input.parentElement;
	registrar.classList.remove("success");
	registrar.classList.add("error");
	const error = registrar.querySelector("small");
	error.textContent = message;
};

// Funcion para mostrar exito
// Recibe el input
const showSuccess = (input) => {
	const registrar = input.parentElement;
	registrar.classList.remove("error");
	registrar.classList.add("success");
	const error = registrar.querySelector("small");
    const login= input.parentElement;
	login.classList.remove("error");
	login.classList.add("success");
	const errorr = login.querySelector("small");
	error.textContent = "";
};

/*----------------------------------------------------------*/
const debounce = (fn, delay = 500) => {
	let timeoutId;

	return (...args) => {
		// Cancelamos el timer anterior
		if (timeoutId) clearTimeout(timeoutId);

		// Seteamos un nuevo timer
		timeoutId = setTimeout(() => {
			fn.apply(null, args);
		}, delay);
	};
};
// Event Listener para enviar y checkear que todo sea valido.
form.addEventListener("submit", (e) => {
	// Prevenimos por defecto el comportamiento al enviar el form
	e.preventDefault();

	// Guardamos el estado de los inputs en variables
	let isUsernameValid = checkUsername();
	let isEmailValid = checkMail();
	let isPasswordValid = checkPassword();


	// Guardamos todos los estados de los inputs en una variable
	let isregistrarValid =
		isUsernameValid && isEmailValid && isPasswordValid;

	// Si todos los campos son validos, mostramos un mensaje de exito ( en este caso "enviamos el formulario")
	if (isregistrarValid) {
		console.log("Enviamos el formulario");
		form.submit();
	}
});
    form.addEventListener(
	"input",
	debounce((e) => {
		switch (e.target.id) {
			case "username":
				checkUsername();
				break;
			case "email":
				checkMail();
				break;
			case "password":
				checkPassword();
				break;
		}
	})
);

/*----------------------INGRESAR -----------------------------*/
const form2 = document.getElementById ("login")
const inputname = document.getElementById("usuario");
const inputpass = document.getElementById("contraseña");

// Checkeamos nombre de usuario
const checkUsuario = () => {
	//Input Valido por defecto false
	let valid = false;
	// Guardamos en dos variables el minimo y maximo de caracteres para el nombre de usuario
	const min =5;
	const max = 10;
	// Guardamos el valor del input (nameInput) en una variable
	const usuario = inputname.value.trim();
	// Si el campo esta vacio muestramos error, llamando a la funcion showError
	if (isEmpty(usuario)) {
		showDaño(inputname, "El nombre es obligatorio");
		// Si el nombre no cumple con los requisitos de longitud, llamamos a la funcion showError
	} else if (!isBetween(usuario.length, min, max)) {
		showDaño(
			inputname,
			`El nombre debe tener entre ${min} y ${max} caracteres`
		);
		// Si todo sale bien validamos el formulario, llamando a la funcion showSuccess y cambiamos el estado valid a true
	} else {
		Success(inputname);
		valid = true;
	}
	return valid;
};
// Checkeamos la contraseña
const checkContraseña = () => {
	// Input Valido por defecto false
	let valid = false;
	// Guardamos el valor del input en una variable
	const contraseña = inputpass.value.trim();
	// Si el campo esta vacio muestro error
	if (isEmpty(contraseña)) {
		showDaño(inputpass, "La contraseña es obligatoria");
		// Si la contraseña no cumple con los requisitos (Segun lo que devuelva la funcion isPassSecure, creada mas abajo) muestro error
	} else if (!isPassSecure(contraseña)) {
		showDaño(
			inputpass,
			"La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula y un simbolo"
		);
		// SI todo sale bien validamos el formulario, llamando a la funcion showSuccess y cambiamos el estado valid a true
	} else {
		Success(inputpass);
		valid = true;
	}
	return valid;
};


// Funcion para mostrar error
// Recibe el input y el mensaje de error
const showDaño = (input, message) => {
	const login = input.parentElement;
	login.classList.remove("success");
	login.classList.add("error");
	const error = login.querySelector("small");
	error.textContent = message;
};

// Funcion para mostrar exito
// Recibe el input
const Success = (input) => {
	const login= input.parentElement;
	login.classList.remove("error");
	login.classList.add("success");
	const error = login.querySelector("small");
	error.textContent = "";
};

/*----------------------------------------------------------*/

// Event Listener para enviar y checkear que todo sea valido.
form2.addEventListener("submit", (e) => {
	// Prevenimos por defecto el comportamiento al enviar el form
	e.preventDefault();

	// Guardamos el estado de los inputs en variables
	let isUsuarioValid = checkUsuario();
	let isContraseñaValid = checkContraseña();


	// Guardamos todos los estados de los inputs en una variable
	let isloginValid =
		isUsuarioValid  && isContraseñaValid;

	// Si todos los campos son validos, mostramos un mensaje de exito ( en este caso "enviamos el formulario")
	if (isloginValid) {
		console.log("Enviamos el formulario");
		form2.submit();
	}
});
    form2.addEventListener(
	"input",
	debounce((e) => {
		switch (e.target.id) {
			case "usuario":
				checkUsuario();
				break;
			
			case "contraseña":
				checkContraseña();
				break;
		}
	})
);

/*---------------------------------------------------------*/
