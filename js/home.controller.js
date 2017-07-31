function login(){

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var userData= JSON.parse(httpRequest.responseText);
                if(userData.result == "invalid"){
                    var errorText = document.getElementById("errorText");
                    errorText.innerHTML= "Incorrect username or password";
                }
                else if(userData.result == "valid"){
                    localStorage.setItem("sudoku", userData.userName + " " + userData.timestamp);
                    window.location.href = "./game.html"
                }
                else {
                    var errorText = document.getElementById("errorText");
                    errorText.innerHTML= "The server has returned an invalid response";
                }
                console.log(userData);

            }
        }
    };

    httpRequest.open("POST", "http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php", true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpRequest.send("userName="+username+"&password="+password);


}