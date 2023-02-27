// Contenedor de productos
const products = document.querySelector(".products-container");
// Contenedor de productos del carrito
const productsCart = document.querySelector(".cart-container");
//El total en precio del carrito
const total = document.querySelector(".total");
// El contenedor de las categorías
const categories = document.querySelector(".categories");
// Un htmlCollection de botones de todas las categorías (mostrar el dataset)
const categoriesList = document.querySelectorAll(".category");
// Botón de ver más
const btnLoad = document.querySelector(".Btn-load");


/* ---------------------PARA MENU HAMBURGUESA --------------*/
// Botón para abrir y cerrar menú
const barsBtn = document.querySelector(".menu-label");
const barsMenu = document.querySelector(".navbar-list");
//  Overlay para tirar facha abajo del menú hamburguesa y el cart.
const overlay = document.querySelector(".overlay");
// Carrito
const cartMenu = document.querySelector(".cart");

const toggleMenu = () => {
	barsMenu.classList.toggle("open-menu");
	if (cartMenu.classList.contains("open-cart")) {
		cartMenu.classList.remove("open-cart");
		return;
	}
	overlay.classList.toggle("show-overlay");
};
const closeOnClick = (e) => {
	if (!e.target.classList.contains("navbar-link")) {
		return;
	}
	barsMenu.classList.remove("open-menu");
	overlay.classList.remove("show-overlay");
};
const closeOnScroll = () => {
	if (
		!barsMenu.classList.contains("open-menu") &&
		!cartMenu.classList.contains("open-cart")
	) {
		return;
	}
	barsMenu.classList.remove("open-menu");
	cartMenu.classList.remove("open-cart");
	overlay.classList.remove("show-overlay");
};
const closeOnOverlayClick = () => {
	barsMenu.classList.remove("open-menu");
	cartMenu.classList.remove("open-cart");
	overlay.classList.remove("show-overlay");
};



const renderProduct = (product) => {
	const {id, name, price, description, img } = product;
	return `
	<div class="product">
                    <img src="${img}" alt="productofacial" class="img-p">
                           <h3>${name}</h3>
                           <p>${description}</p> 
                              <span>$${price}</span>
                              <button class="btn-add",
			                  data-id="${id}"
			                  data-name="${name}"
			                  data-price="${price}
			                  "data-img="${img}"
							  data-description="${description}"
		                      >Comprar
			                  </button>
                           
                  </div>  
    `;
};

const renderDividedProducts = (index = 0) => {
	products.innerHTML += productsController.dividedProducts[index]
		.map(renderProduct)
		.join("");
};

const renderFilteredProducts = (category) => {
	const productsList = productsData.filter((product) => {
		return product.category === category;
	});
	products.innerHTML = productsList.map(renderProduct).join("");
};

const renderProducts = (index = 0, category = undefined) => {
	if (!category) {
		renderDividedProducts(index);
		return;
	}
	renderFilteredProducts(category);
};

const changeShowMoreBtnState = (category) => {
	if (!category) {
		btnLoad.classList.remove("hidden");
		return;
	}
	btnLoad.classList.add("hidden");
};

const changeBtnActiveState = (selectedCategory) => {
	const categories = [...categoriesList];
	categories.forEach((categoryBtn) => {
		if (categoryBtn.dataset.category !== selectedCategory) {
			categoryBtn.classList.remove("active");
			return;
		}
		categoryBtn.classList.add("active");
	});
};

const changeFilterState = (e) => {
	const selectedCategory = e.target.dataset.category;
	changeShowMoreBtnState(selectedCategory);
	changeBtnActiveState(selectedCategory);
};

const applyFilter = (e) => {
	if (!e.target.classList.contains("category")) {
		return;
	} else {
		changeFilterState(e);
	}
	if (!e.target.dataset.category) {
		products.innerHTML = "";
		renderProducts();
	} else {
		renderProducts(0, e.target.dataset.category);
		productsController.nextProductsIndex = 0;
	}
};

const isLastIndexOf = () => {
	return (
		productsController.nextProductsIndex === productsController.productsLimit
	);
};
const showMoreProducts = () => {
	renderProducts(productsController.nextProductsIndex);
	productsController.nextProductsIndex++;
	if (isLastIndexOf()) {
		btnLoad.classList.add("hidden");
	}
};



const init = () => {
    renderProducts ();
    categories.addEventListener("click",applyFilter);
    btnLoad.addEventListener ("click",showMoreProducts);
	barsBtn.addEventListener("click", toggleMenu);  /* SE AGREGO PARA MENU HAMBURGUESA*/
	barsMenu.addEventListener("click", closeOnClick); /* SE AGREGO PARA MENU HAMBURGUESA*/
	window.addEventListener("scroll", closeOnScroll); /* SE AGREGO PARA MENU HAMBURGUESA*/
	overlay.addEventListener("click", closeOnOverlayClick); /* SE AGREGO PARA MENU HAMBURGUESA*/

	cartBtn.addEventListener("click", toggleCart);
	document.addEventListener("DOMContentLoaded", renderCart);
	document.addEventListener("DOMContentLoaded", showTotal);
	products.addEventListener("click", addProduct);
	productsCart.addEventListener("click", handleQuantity);
	buyBtn.addEventListener("click", completeBuy);
	deleteBtn.addEventListener("click", deleteCart);
	disableBtn(buyBtn);
	disableBtn(deleteBtn);
	renderCartBubble();
};


/*--------------------- carro -------------------*/

// Botón de comprar
const buyBtn = document.querySelector(".btn-buy");
// Botón para abrir y cerrar carrito
//Burbuja de cantidad de productos en el carrito
const cartBubble = document.querySelector(".cart-bubble");
const cartBtn = document.querySelector(".cart-label");
//  Modal de agregado al carrito.
const successModal = document.querySelector(".add-modal");
//  Modal de agregado al carrito.
const deleteBtn = document.querySelector(".btn-delete");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveLocalStorage = (cartList) => {
	localStorage.setItem("cart", JSON.stringify(cartList));
};

const toggleCart = () => {
	cartMenu.classList.toggle("open-cart");
	if (barsMenu.classList.contains("open-menu")) {
		barsMenu.classList.remove("open-menu");
		return;
	}
	overlay.classList.toggle("show-overlay");
};
const renderCardProduct = (cartProduct) => {
	const {id, name, img, quantity, price} = cartProduct;
	return `
	<div class="cart-item">
            <img src="${img}"alt="">
            <div class="cart-info">
                <h3>${name}</h3>
                <p>$${price}</p>
            </div>
            <div class="item-handler">
			<span class="quantity-handler down" data-id=${id}>-</span>
			<span class="item-quantity">${quantity}</span>
			<span class="quantity-handler up" data-id=${id}>+</span>
		</div>
           </div>

	`;
};
const renderCart = () => {
	if (!cart.length) {
		productsCart.innerHTML = `<p class="empty-msg">No hay productos en el carrito.</p>`;
		return;
	}
	productsCart.innerHTML = cart.map(renderCardProduct).join("");
};

const getCartTotal = () => {
	return cart.reduce((acc, cur) => {
		return acc + Number(cur.price) * cur.quantity;
	}, 0);
};

const showTotal = () => {
	total.innerHTML = `${getCartTotal().toFixed(2)} $`;
};
const renderCartBubble = () => {
	cartBubble.textContent = cart.reduce((acc, cur) => {
		return acc + cur.quantity;
	}, 0);
};

const disableBtn = (btn) => {
	if (!cart.length) {
		btn.classList.add("disabled");
	} else {
		btn.classList.remove("disabled");
	}
};

const checkCartState = () => {
	saveLocalStorage(cart);
	renderCart();
	showTotal();
	disableBtn(buyBtn);
	disableBtn(deleteBtn);
	renderCartBubble();
};
const addProduct = (e) => {
	if (!e.target.classList.contains("btn-add")) {
		return;
	}
	const { id, name, price, description, img } = e.target.dataset;

	const product = productData(id, name, price, description, img);

	if (isExistingCartProduct(product)) {
		addUnitToProduct(product);
		showSuccessModal("Se agregó un producto al carrito");
	} else {
		createCartProduct(product);
		showSuccessModal("El producto se ha agregado al carrito");
	}

	checkCartState();
};
const productData = (id, name, price, description, img) => {
	return { id, name, price, description, img };
};

const isExistingCartProduct = (product) => {
	return cart.find((item) => {
		return item.id === product.id;
	});
};

const addUnitToProduct = (product) => {
	cart = cart.map((cartProduct) => {
		return cartProduct.id === product.id
			? { ...cartProduct, quantity: cartProduct.quantity + 1 }
			: cartProduct;
	});
};
const showSuccessModal = (msg) => {
	successModal.classList.add("active-modal");
	successModal.textContent = msg;
	setTimeout(() => {
		successModal.classList.remove("active-modal");
	}, 1500);
};

const createCartProduct = (product) => {
	cart = [
		...cart,
		{
			...product,
			quantity: 1,
		},
	];
};

const handleMinusBtnEvent = (id) => {
	const existingCartProduct = cart.find((item) => {
		return item.id === id;
	});

	if (existingCartProduct.quantity === 1) {
		if (window.confirm("¿Desea eliminar el producto del carrito?")) {
			removeProductFromCart(existingCartProduct);
		}
		return;
	}

	substractProductUnit(existingCartProduct);
};
const handlePlusBtnEvent = (id) => {
	const existingCartProduct = cart.find((item) => {
		return item.id === id;
	});

	addUnitToProduct(existingCartProduct);
};

const removeProductFromCart = (existingProduct) => {
	cart = cart.filter((product) => product.id !== existingProduct.id);
	checkCartState();
};

const substractProductUnit = (existingProduct) => {
	cart = cart.map((product) => {
		return product.id === existingProduct.id
			? { ...product, quantity: Number(product.quantity) - 1 }
			: product;
	});
};

const handleQuantity = (e) => {
	if (e.target.classList.contains("down")) {
		handleMinusBtnEvent(e.target.dataset.id);
	} else if (e.target.classList.contains("up")) {
		handlePlusBtnEvent(e.target.dataset.id);
	}
	checkCartState();
};

const resetCartItems = () => {
	cart = [];
	checkCartState();
};

const completeCartAction = (confirmMsg, successMsg) => {
	if (!cart.length) return;
	if (window.confirm(confirmMsg)) {
		resetCartItems();
		alert(successMsg);
	}
};

const completeBuy = () => {
	completeCartAction("¿Desea completar su compra?", "¡Gracias por su compra!");
};

const deleteCart = () => {
	completeCartAction("¿Desea vaciar su carrito?", "Carrito eliminado");
};


init()