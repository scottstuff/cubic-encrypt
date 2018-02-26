/* Text Encrption */
( () => {

	/* variables */
	var encryptionMethodSelected = '';

	/* Selectors */
	var menuMenuDisplay = document.getElementById('main-menu-container');
	var exitProgramDisplay = document.getElementById('exit-program-container');
	var menuChoiceEncrypt = document.getElementById('main-menu-encrypt-option');
	var menuChoiceExit = document.getElementById('main-menu-exit-option');
	var encryptionButtonDisplay = document.getElementById('encrypt-button-container');
	var encryptionMethodButton = document.getElementsByClassName('encrypt-method');
	var encryptionForm = document.getElementById('encrypt-form');
	var encryptionActionButton = document.getElementById('encrypt-text-button');
	var encryptionInputText = document.getElementById('encrypt-text');
	var encryptionHeader = document.getElementById("encrypt-form-header");
	var encryptFormDisplay = document.getElementById('encrypt-form-container');
	var encryptionResultDisplay = document.getElementById('encryption-result-container');
	var encyptionResultParagraph = document.getElementById('encyption-result-paragraph');
	var encyptionResultError = document.getElementById('encyption-result-error');


	/* Handlers */
	function menuEncryptHandler() {
		displaySection(encryptionButtonDisplay, true);
	}

	function menuExitHandler() {
		displaySection(exitProgramDisplay, true);
		removeText(encyptionResultParagraph);
		removeText(encyptionResultError);
	}

	function encryptionMethodSelectedHandler(methodType) {
		displaySection(encryptFormDisplay, true);
		removeText(encyptionResultParagraph);
		removeText(encyptionResultError);
	}

	function encryptionMethodHandler(encryptionMethod) {
		encryptionMethodSelected = encryptionMethod;
		displaySection(encryptFormDisplay, true);
		addHeading(encryptionMethod);
		displaySection(encryptionHeader, false);
	}

	function encryptTextHandler() {
		var textToEncrpt = encryptionInputText.value;
		var errorContainerExists = document.getElementById('error-empty-container');

		if(textToEncrpt.length === 0) {
			if (errorContainerExists !== null) {
				errorContainerExists.remove();
			}
			returnError('Please enter text to encrypt.');
			return false;
		}

		if (errorContainerExists !== null) {
			errorContainerExists.remove();
		}

		errorContainerExists = document.getElementById('error-empty-container');
		var encryptionMethod = encryptionInputText.value;
		var pattern = /^[a-zA-Z0-9~`!@#$%^&*()_+-={}|:;<>,.?\/']+$/;
        if((!textToEncrpt.match(pattern)))
        {
			if (errorContainerExists !== null) {
				errorContainerExists.remove();
			}
			returnError('Only keyboard characters are allowed.');
			return false;
        }

        var encrypedText = encryptIt(textToEncrpt, encryptionMethodSelected);
        var isValidDisplayValues = true;

        if((!encrypedText.match(pattern))) {
        	isValidDisplayValues = false;
        }

        displayEncreptedText(encrypedText, textToEncrpt, isValidDisplayValues);
	}

	/* Actions */
	var encryptIt = (function() {
		var encryptedText = '';
		function encryptIt(text, encryptMethod) {
			if (encryptMethod === "A") {
				encryptedText = encryptA(text);
			} else if (encryptMethod === "B") {
				encryptedText = encryptBC(text, 1);
			} else  {
				encryptedText = encryptBC(text, 3);
			}
			return encryptedText;
		}
		encryptA = function(enteredText) {
			return 'X'.repeat(enteredText.length);
		}
		encryptBC = function(enteredText, offSet) {
			var encryptedString = '';
			for (var i = 0; i < enteredText.length; i++) {
				encryptedString += String.fromCharCode(enteredText.slice(i, i + 1).charCodeAt(0) + offSet);
			}

			return encryptedString;
		}
		return encryptIt;
	}());

	/* Helpers */
	function displaySection(sectionToDisplay, executeDisplayNone) {

		if (executeDisplayNone) {
			menuMenuDisplay.style.display = "none";
			menuMenuDisplay.style.display = "none";
			encryptionButtonDisplay.style.display = "none";
			encryptFormDisplay.style.display = "none";
			encryptionResultDisplay.style.display = "none";
			encryptionHeader.style.display = "none";
		}
		sectionToDisplay.style.display = "block";
	}


	function addHeading(encryptionMethod) {

		removeText(encryptionHeader);
		var h2_tag = document.createElement("H2");
		var headerText = document.createTextNode("Encryption Method " + encryptionMethod);
		h2_tag.appendChild(headerText);
		encryptionHeader.appendChild(h2_tag);
		encryptionHeader.className = 'center-it';
	}

	function removeText(displayNode) {
		displayNode.textContent = '';
	}

	function returnError(errorText) {

		var errorContainer = document.createElement('div');
		errorContainer.id = 'error-empty-container'; 
		var formSpace = document.createElement('div');
		formSpace.className = 'row row-spacing'; 
		var errorDiv = document.createElement('div');
		errorDiv.className = 'emptyText';
		var h4_tag = document.createElement("H4");
		h4_tag.className = 'center-it';
		var errorTextNode = document.createTextNode(errorText);
		h4_tag.appendChild(errorTextNode);
		errorDiv.appendChild(h4_tag);
		errorContainer.appendChild(formSpace);
		errorContainer.appendChild(errorDiv);
		encryptFormDisplay.appendChild(errorContainer);

	}

	Element.prototype.remove = function() {
    	this.parentElement.removeChild(this);
	}

	function displayEncreptedText(encryptedText, originalText, isValidDisplayValues) {

		var encryptionResult = 'Encrypted String: ' + encryptedText  + ' Oringinal String: ' + originalText;
		var resultTextNode = document.createTextNode(encryptionResult);       // Create a text node

		removeText(encyptionResultParagraph);
		removeText(encyptionResultError);
		encyptionResultParagraph.appendChild(resultTextNode);
		if (!isValidDisplayValues) {
			var resultErrorText = 'Please Note: Some encrypted values may not display properly as they are not valid keyboard characters.';
			var resultErrorNode = document.createTextNode(resultErrorText);       // Create a text node
			encyptionResultError.appendChild(resultErrorNode);
		}
		displaySection(menuMenuDisplay, true);
		displaySection(encryptionResultDisplay, false);
		encryptionInputText.value = '';

	}

	/* Listners */
	menuChoiceEncrypt.addEventListener('click', menuEncryptHandler, false);
	menuChoiceExit.addEventListener('click', menuExitHandler, false);
	Array.from(encryptionMethodButton).forEach(function(element) {
	    	element.addEventListener('click', function() {
			encryptionMethodHandler(this.getAttribute("data-method"));
		}, false);
    });
	encryptionActionButton.addEventListener('click', encryptTextHandler, false);

})();
