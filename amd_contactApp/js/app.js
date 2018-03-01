window.$on = function(target, type, cb) {
	target.addEventListener(type, cb, false);
}

define(["./js/core.js", "./js/contactForm.js", "./js/contactDirectory.js"], function(CORE, contactForm, contcatDirectory){

CORE.addModule(contactForm.id, contactForm);
CORE.addModule(contcatDirectory.id, contcatDirectory);

contactForm.init();
contcatDirectory.init();
})