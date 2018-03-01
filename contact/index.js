window.$on = function(target, type, cb) {
	target.addEventListener(type, cb, false);
}


var CORE = (function() {
	"use strict";
	//pubsub pattern
	var modules= {};

	function addModule(module_id, module) {
		modules[module_id] = module;
	}


	function registerEvents(evt, module_id) {
		var theMod = modules[module_id];
		theMod.events = evt;
	}

	function triggerEvents(evt) {
		var mod;

		for(mod in modules){
			if (modules.hasOwnProperty(mod)) {
				mod = modules[mod];

				if (mod.events && mod.events[evt.type]) {
					mod.events[evt.type](evt.data)
				}
			}
		}
	}

	return {
		addModule : addModule,
		registerEvents: registerEvents,
		triggerEvents: triggerEvents
	}
})();

var sb = (function() {
	function listen(evt, module_id) {
		CORE.registerEvents(evt, module_id)
	}

	function notify(evt) {
		CORE.triggerEvents(evt)
	}

	return {
		listen:listen,
		notify: notify
	}
})();

//This is a tight-couple pattern of coding

var contactForm = (function() {
	var id, el, name, phone, submit;

	id = "addContacts";

	function init(){
		el = document.getElementById("add-contact");
		name = document.getElementsByClassName("contact-name")[0];
		phone = document.getElementsByClassName("phone-number")[0];
		submit = document.getElementsByClassName("submit")[0];

		$on(submit, "click", addContact);

		sb.listen({"displayForm":showForm}, id);
	}

	function addContact(e) {
		var details = {};
		details.name = name.value;
		details.phone = phone.value;

		sb.notify({type: "message", data:details});

		el.classList.toggle('module-active');

		e.preventDefault();
	}

	function showForm() {
		name.value = "";
		phone.value = "";

		el.classList.toggle("module-active");
	}

	return {
		id: id,
		init: init,
		addContact: addContact
	}


})();


var contcatDirectory = (function() {
	var id, contacts, addContact;

	id = "showContacts";

	function init() {
		contacts = document.getElementById("contacts");
		addContact = document.getElementsByClassName("add-contact")[0];

		sb.listen({"message": listContact}, id);

		$on(addContact, "click", showForm);

	}

	function listContact(info) {
		var ul = document.getElementById("contact-list");
		var li = document.createElement("li");

		var name = document.createElement("p");
		var nameNodeVal = document.createTextNode(info.name);
		name.appendChild(nameNodeVal);

		var phone = document.createElement("p");
		var phoneNodeVal = document.createTextNode(info.phone);
		phone.appendChild(phoneNodeVal);

		li.appendChild(name);
		li.appendChild(phone);

		ul.appendChild(li);

		contacts.classList.toggle("module-active");
	}

	function showForm(e) {
		sb.notify({type: "displayForm", data: null})

		contacts.classList.toggle("module-active");

		e.preventDefault();
	}

	return {
		id: id,
		init: init,
		listContact: listContact,
		showForm: showForm
	}

})()

CORE.addModule(contactForm.id, contactForm);
CORE.addModule(contcatDirectory.id, contcatDirectory);

contactForm.init();
contcatDirectory.init();