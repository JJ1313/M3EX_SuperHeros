$(document).ready(function(){

  $('#btn-search').on('click', (event)=>{
    event.preventDefault();
    let id = $('#search-input').val();
    // Hacer validacion <---
    $.ajax({
      type:'GET',
      url:`https://www.superheroapi.com/api.php/3933154296912140/${id}`,
      dataType: 'json',
      success: function(superhero){
        console.log(superhero);
        $('#result').html(`
          <div class="card">
          <img src="${superhero.image.url}" class="card-img-top" alt="${superhero.name}">
          <div class="card-body">
            <h6 class="card-title">${superhero.name}</h6>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">${superhero.appearance.race}</li>
            <li class="list-group-item">${superhero.appearance.height[1]}</li>
            <li class="list-group-item">${superhero.appearance.weight[1]}</li>
          </ul>
        </div>
        `)
        
        var chart = new CanvasJS.Chart("graph", {
          animationEnabled: true,
          title:{
            text: "Estadisticas",
            horizontalAlign: "center"
          },
          data: [{
            type: "doughnut",
            startAngle: 60,
            indexLabelFontSize: 10,
            indexLabel: "{label}",
            toolTipContent: "<b>{label}:</b> {y}",
            dataPoints: [
              { y: superhero.powerstats.combat, label: "Combate" },
              { y: superhero.powerstats.durability, label: "Resistencia" },
              { y: superhero.powerstats.intelligence, label: "Inteligencia" },
              { y: superhero.powerstats.power, label: "Poder"},
              { y: superhero.powerstats.speed, label: "Velocidad"},
              { y: superhero.powerstats.strength, label: "Fuerza"}
            ]
          }]
        });
        chart.render();
        $('.canvasjs-chart-credit').html('');
      },
      error: function(error){
        console.log(`error: ${error.status}`);
      }
    });
  });

});