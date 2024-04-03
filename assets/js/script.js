$(document).ready(function () {

    $('#boton').on('click', () => {

      $('#resultado').html("");


        let input = $('#nuestro-input').val()


        let expresionREGEX = /\d/gmi;

        if (input && expresionREGEX.test(input)) {

            $.ajax({
                dataType: "json",
                type: "get",
                url: `https://superheroapi.com/api.php/4905856019427443/${input}`,


                success: (resultado) => {


                    let tarjeta = `<div class="card mb-3" style="max-width: 540px;">
                <div class="row no-gutters">
                  <div class="col-md-4">
                    <img src="${resultado.image.url}" class="card-img" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">Nombre: ${resultado.name}</h5>
                      <p class="card-text">Conexiones: ${resultado.connections['group-affiliation']}</p>
                      <p class="card-text"><small class="text-muted"> ${resultado.biography.publisher}</small></p>
                    </div>
                  </div>
                </div>
              </div>`

                    $('#resultado').append(tarjeta)
                    
                    
                    
                    
                    let misDataPoint = [];

                    for (let llave in resultado.powerstats){
                      misDataPoint.push ({
                        label: llave,
                        y: resultado.powerstats[llave]
                      })
                    }

                    let options = {
                      tittle: {
                        text : `Estadisticas para ${resultado.name}`
                      },

                      data: [{
                        type: "pie",
                        startAngle: 45,
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabel: "{label} ({y})",
                        yValueFormatString:"#,##0.#"%"",
                        dataPoints: misDataPoint
                    }]

                      
                      
                    };
                    $("#chartContainer").CanvasJSChart(options);
                    
                },

                
                

            error: (error) => {
                alert("ocurrio un error")

                }

            })




        } else {
            alert("el input esta vacio")
        }

    })



})