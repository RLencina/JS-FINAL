const productsData = [
    {
		id: 1,
		name: "ULTRA FACIAL CREAM",
		price:8900,
		category: "FACIAL",
        description: "Hidratante facial formulado exclusivamente para todo tipo de piel.",
		img: "./img/producto 1.jpg",
	},
	{
		id: 2,
		name: "CREMA MULTI-CORRECTIVE",
		price:5400,
		category: "FACIAL",
        description: "7 beneficios en 1 para una piel visiblemente más suave, firme y joven.",
		img: "./img/producto 2.jpg",
	},
    {
		id: 3,
		name: "CREMA NOCTURNA",
		price:9000,
		category: "FACIAL",
        description:"Una Crema Nocturna con 98.6% ingredientes de origen natural que rellena y restaura la piel.",
		img: "./img/producto 3.jpg",
	},
    {
		id: 4,
		name: "ACEITE FACIAL NOCTURNO",
		price:10900,
		category: "FACIAL",
        description:"Restaura visiblemente la piel mientras dormís. Elaborado con ingredientes naturales.",
		img: "./img/producto 4.jpg",
	},
    {
		id: 5,
		name: "CREMA CORPORAL",
		price:3500,
		category: "CORPORAL",
        description:"Un hidratante corporal rico y nutritivo de textura ligera.",
		img: "./img/producto 5.jpg",
	},
    {
		id: 6,
		name: "CREMA HIDRATANTE",
		price:12900,
		category: "CORPORAL",
        description: "Hidratante apta para pieles sensibles, con Suero Concentrado de Caléndula.",
		img: "./img/producto 6.jpg",
	},
    {
		id: 7,
		name: "CREMA PARA MANOS",
		price:6990,
		category: "CORPORAL",
        description: "Para todo tipo de pieles.",
		img: "./img/producto 7.jpg",
	},
    {
		id: 8,
		name: "ACEITE CORPORAL",
		price:4490,
		category: "CORPORAL",
        description:"Favorece la circulación, para todo tipo de pieles.",
		img: "./img/producto88.jpg",
	},
    {
		id: 9,
		name: "CEPILLO CAPILAR",
		price:7400,
		category: "CAPILAR",
        description:"Promueve su crecimiento y se relajan los músculos.",
		img: "./img/producto 9.webp"
	},
    {
		id: 10,
		name: "KIT ORGANICO",
		price:12600,
		category: "CAPILAR",
        description:"Para todo tipo de cabellos.",
		img: "./img/producto 10.jpg"
	},
    {
		id: 11,
		name: "KIT CORPORAL",
		price:16990,
		category: "CORPORAL",
        description:"Cremas veganas y sin maldad animal.",
		img: "./img/producto 11 kit.avif"
	},
    {
		id: 12,
		name: "KIT CAPILAR",
		price:10000,
		category: "CAPILAR",
        description:"Formula desengrasante.",
		img: "./img/kitcapilar.jpg"
	},
]

const splitProducts = (size) => {
	let dividedProducts = [];

	for (let i = 0; i < productsData.length; i += size) {
		dividedProducts.push(productsData.slice(i, i + size));
	}
	return dividedProducts;
};

const productsController = {
	dividedProducts: splitProducts(6),
	nextProductsIndex: 1,
	productsLimit: splitProducts(6).length,
};

