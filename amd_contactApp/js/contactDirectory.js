define(["./sb.js"], function(sb) {

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
})