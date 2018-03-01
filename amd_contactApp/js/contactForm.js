define(["./sb.js"], function(sb){
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


})