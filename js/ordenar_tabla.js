$(document).ready(() => {
    $('th').each(function(columna){
        $(this).click(function(){
            let registros = $('table').find('tbody > tr').get();

            registros.sort(function(a,b) {
                let valor1 = $(a).children('td').eq(columna).text().toLocaleUpperCase();
                let valor2 = $(b).children('td').eq(columna).text().toLocaleUpperCase(); 
                
                return valor1 < valor2 ? -1 : valor1 > valor2 ? 1 : 0;
            });
            $.each(registros, function(indice, elemento){
                $('tbody').append(elemento)
            })
        })
    })


});