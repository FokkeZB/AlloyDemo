// Private variable containing model definitions
var translations = [
	{translation: "Hallo Wereld"},
	{translation: "Hallo Welt"},
	{translation: "Bonjour le Monde"},
	{translation: "Olá mundo"},
	{translation: "Zdravo svet"},
	{translation: "привет мир"},
	{translation: "kaixo mundua"},
	{translation: "Hola món"},
	{translation: "saluton mondo"}
];

// Exposed method to get private variable in hello controller
exports.getTranslations = function () {
	return translations;
};