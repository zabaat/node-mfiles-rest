"use strict";

let getToken = function (username, password, vault) {

    // Request an encrypted token with the login information.
    $.ajax({
        url: "http://example.org/REST/server/authenticationtokens.aspx",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ Username: username, Password: password, VaultGuid: vault }),
        success: processToken
    });
};

let processToken = function (token) {
    // Set the header.
    $.ajaxSetup({ headers: { "X-Authentication" : token.Value } });
};


module.exports = {
    getToken: getToken,
    processToken:processToken
}

