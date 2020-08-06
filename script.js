// Write your JavaScript code here!
window.addEventListener("load", function() {
   let form = document.querySelector("form");
   let pilotInput = document.querySelector("input[name=pilotName]");
   let copilotInput = document.querySelector("input[name=copilotName]");
   let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
   let cargoMassInput = document.querySelector("input[name=cargoMass]");
   
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json) {
         let div = document.getElementById("missionTarget");
         div.innerHTML = `
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[2].name}</li>
               <li>Diameter: ${json[2].diameter}</li>
               <li>Star: ${json[2].star}</li>
               <li>Distance from Earth: ${json[2].distance}</li>
               <li>Number of Moons: ${json[2].moons}</li>
            </ol>
            <img src="${json[2].image}">
         `;
      });
   });
   
   
   form.addEventListener("submit", function(event) {
      //Validate user inputs
      if(pilotInput.value === "" || copilotInput.value === "" || fuelLevelInput.value === "" || cargoMassInput === "") {
         alert("All fields required!");
      } else if (typeof(pilotInput.value) !== "string" || typeof(copilotInput.value) !== "string" || isNaN(Number(fuelLevelInput.value)) || isNaN(Number(cargoMassInput.value))) {
         alert("The pilot and co-pilot names should be strings and the fuel level and cargo mass should be numbers.");
      } else {
            //Update pilot and copilot names using template literal
            document.getElementById("pilotStatus").innerHTML = `${pilotInput.value} Ready`;
            document.getElementById("copilotStatus").innerHTML = `${copilotInput.value} Ready`; 
         if (fuelLevelInput.value < 10000) {
            //Make faulty items list visible
            document.getElementById("faultyItems").style.visibility = "visible";

            //Update Launch Status Color
            document.getElementById("launchStatus").style.color = "red";

            //Update Launch Status Text
            document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";

            //Update Fuel Status
            document.getElementById("fuelStatus").innerHTML = "Not enough fuel for the journey";
         };

         if (cargoMassInput.value > 10000) {
            //Make faulty items list visible
            document.getElementById("faultyItems").style.visibility = "visible";
            
            //Update Launch Status Color
            document.getElementById("launchStatus").style.color = "red";

            //Update Launch Status Text
            document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";

            //Update Cargo Status
            document.getElementById("cargoStatus").innerHTML = "Too much mass for the shuttle to take off";
         }; 
         
         if (cargoMassInput.value <= 10000 && fuelLevelInput.value >= 10000) {
            //Update Launch Status Color
            document.getElementById("launchStatus").style.color = "green";

            //Update Launch Status Text
            document.getElementById("launchStatus").innerHTML = "Shuttle ready for launch";

            document.getElementById("faultyItems").style.visibility = "visible";
         };
      };
      event.preventDefault();
   });
});