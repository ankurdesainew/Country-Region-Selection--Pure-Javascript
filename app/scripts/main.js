"use strict";
(function() {
  window.onload = getdata;

  function getdata() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET','../Country-Region-Data/countrystates.json', true);
    httpRequest.send(null);
    httpRequest.onreadystatechange = readyChanged;

    function readyChanged() {
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
          var response = JSON.parse(httpRequest.responseText);

          for (var i = 0; i < response.length; i++) {



            var country = document.createElement("option");
            country.className = "targetcountry";
            document.getElementById("country").appendChild(country);
            document.getElementsByClassName("targetcountry")[i].innerText = response[i].country;
            document.getElementById("country").onchange = createRespectiveState;
            var parentOfStateEls = document.getElementById("state");
            var stateEls = document.getElementsByClassName("targetstate");
            var createRespectiveState = function() {
              var countryEls = document.getElementsByClassName("targetcountry");
              var countryOptionIndex = document.getElementById("country").selectedIndex - 1;
              console.log(countryOptionIndex);
              /*-------------Clearing created Option---------------*/
              if (countryOptionIndex > 0 || countryOptionIndex == -1) {
                var emptyState = document.getElementById("state");
                while (emptyState.firstChild) {
                  emptyState.removeChild(emptyState.firstChild);
                }
              }
               if(countryOptionIndex == -1) {
                return;
              }
              else if (countryEls[countryOptionIndex].innerText === response[countryOptionIndex].country) {
                for (var j = 0; j < response[countryOptionIndex].state.length; j++) {
                  var state = document.createElement("option");
                  state.className = "targetstate";
                  document.getElementById("state").appendChild(state);
                  document.getElementsByClassName("targetstate")[j].innerText = response[countryOptionIndex].state[j];
                }
              }
            }
          }
        }
      }
    }
  }
})();
