function validateForm() {
    // Array om foutmeldingen op te slaan
    var errors = [];

    // Controleer lege velden
    checkEmptyField(document.getElementById('voornaam'), "Het veld voornaam is vereist.", errors);
    checkEmptyField(document.getElementById('naam'), "Het veld naam is vereist.", errors);
    checkEmptyField(document.getElementById('gebruikersnaam'), "Het veld gebruikersnaam is vereist.", errors);
    checkEmptyField(document.getElementById('adres'), "Het veld adres is vereist.", errors);
    checkEmptyField(document.getElementById('land'), "Het veld land is vereist.", errors);
    checkEmptyField(document.getElementById('provincie'), "Het veld provincie is vereist.", errors);

    // Controleer geldig e-mailadres
    var email = document.getElementById('email').value;
    if (!validateEmail(email)) {
        errors.push("E-mailadres is niet correct.");
    }

    // Controleer wachtwoorden
    var password = document.getElementById('wachtwoord').value;
    var confirmPassword = document.getElementById('herhaal_wachtwoord').value;

    if (password === "") {
        errors.push("Het veld wachtwoord is vereist.");
    }

    if (confirmPassword === "") {
        errors.push("Het veld herhaal wachtwoord is vereist.");
    }

    if (password.length < 7) {
        errors.push("Het wachtwoord moet minstens 7 karakters lang zijn.");
    }

    if (password !== confirmPassword) {
        errors.push("De wachtwoorden komen niet overeen.");
    }

    // Controleer gebruikersnaam en domein van e-mailadres met regex
    var usernameRegex = /^[a-zA-Z0-9_]+[a-zA-Z0-9_.-]*$/;
    var domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9.-]*$/;

    var username = document.getElementById('gebruikersnaam').value;
    var emailDomain = email.split('@')[1];

    if (!usernameRegex.test(username)) {
        errors.push("De gebruikersnaam voldoet niet aan de criteria.");
    }

    if (!domainRegex.test(emailDomain)) {
        errors.push("Het domein van het e-mailadres voldoet niet aan de criteria.");
    }

    // Controleer betalingswijze
    var paymentMethod = document.querySelector('input[name="betalingswijze"]:checked');
    if (!paymentMethod) {
        errors.push("Selecteer een betalingswijze.");
    }

    // Controleer postcode
    var postcode = document.getElementById('postcode').value;
    if (postcode === "") {
        errors.push("Het veld postcode is vereist.");
    } else {
        var postcodeValue = parseInt(postcode);
        if (isNaN(postcodeValue) || postcodeValue < 1000 || postcodeValue >= 10000) {
            errors.push("De waarde van postcode moet tussen 1000 en 9999 liggen.");
        }
    }

    // Controleer algemene voorwaarden
    var voorwaardenCheckbox = document.getElementById('voorwaarden');
    if (!voorwaardenCheckbox.checked) {
        errors.push("Algemene voorwaarden moeten worden geaccepteerd.");
    }

    // Toon ofwel de foutmeldingen ofwel de groene en blauwe alerts samen
    displayAlerts(errors);
}

function checkEmptyField(field, message, errors) {
    if (field.value.trim() == "") {
        errors.push(message);
    }
}

function validateEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function displayAlerts(errors) {
    var errorMessages = errors.join("<br>");
    document.getElementById('errorMessages').innerHTML = errorMessages;

    // Voeg hier code toe om de alerts weer te geven of te verbergen op basis van de errors-array
}
