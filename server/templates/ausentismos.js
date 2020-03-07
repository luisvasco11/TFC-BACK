const formatearFecha = ( fecha ) => {
    const fecha2 = new Date(fecha)
    const anio = fecha2.getFullYear()
    let mes = ''
    const dia = fecha2.getDate()

    switch (fecha2.getMonth()) {
        case 0:
            mes = 'Enero'
            break;
        case 1:
            mes = 'Febrero'
            break;
        case 2:
            mes = 'Marzo'
            break;
        case 3:
            mes = 'Abril'
            break;
        case 4:
            mes = 'Mayo'
            break;
        case 5:
            mes = 'Junio'
            break;
        case 6:
            mes = 'Julio'
            break;
        case 7:
            mes = 'Agosto'
            break;
        case 8:
            mes = 'Septiembre'
            break;
        case 9:
            mes = 'Octubre'
            break;
        case 10:
            mes = 'Noviembre'
            break;
        case 11:
            mes = 'Diciembre'
            break;
        default:
            break;
    }

    return `${dia}-${mes}-${anio}`    
}

let templateAusentismos = (registro) => {

    let fechaIni = formatearFecha(registro.fechaInicio)
    let fechaFin = formatearFecha(registro.fechaFin)
    let template = ``

    if(registro.justificacionNegacion && registro.estado === 'SOLICITUD NEGADA') {
        template = `
        <div style="border:1px solid #ccc; width:50%; font-family: arial; box-shadow: 4px 5px 9px 5px #ccc">
            <div style="background-color:rgba(60, 141, 188,0.8); text-align:center; color:white; padding-bottom:10px;  padding-top:10px;">
                <img style="width:150px; display:inline;" src="https://pati.arus.com.co/dist/img/PATI-05.png" alt="Imagen">
                <h3 class="titulo">NOTIFICIÓN ESTADO DE SOLICITUD AUSENTISMO<strong> <span style="text-decoration:underline;"></span> </strong> PATI</h3>
            </div>
            <div style="padding: 20px;">
    
                <p>
                    Buen día.
                </p>
                <p>
                    La solicitud realizada del colaborador ${registro.nombreAnalista} por el concepto de Suspensión en las fechas ${registro.horaInicio} ${ fechaIni } / ${registro.horaFin} ${ fechaFin } ha quedado en estado ${registro.estado} Por favor recuerde informarle a su colaborador el estado final de la solicitud.
                </p>
                <p>
                    Esta solicitud no se cargará en SoftControl ya que el colaborador no se encuentra registrado en el aplicativo Saludos!
                </p>

                <p>
                    <span>Justificación: </span> <span style="color:red; font-weight: bold;">${registro.justificacionNegacion}</span>
                </p>
    
            </div>
            <div style="text-align:center; color:white; padding-bottom:10px;padding-top:10px; border-top:3px dotted rgba(60, 141, 188,0.8)">
                <img style="width:150px; display:inline;" src="https://www.arus.com.co/wp-content/themes/arus155/img/aruslogo.jpg" alt="Imagen">
            </div>
        </div>
        `
    }else{
        template = `
            <div style="border:1px solid #ccc; width:50%; font-family: arial; box-shadow: 4px 5px 9px 5px #ccc">
                <div style="background-color:rgba(60, 141, 188,0.8); text-align:center; color:white; padding-bottom:10px;  padding-top:10px;">
                    <img style="width:150px; display:inline;" src="https://pati.arus.com.co/dist/img/PATI-05.png" alt="Imagen">
                    <h3 class="titulo">NOTIFICIÓN ESTADO DE SOLICITUD AUSENTISMO<strong> <span style="text-decoration:underline;"></span> </strong> PATI</h3>
                </div>
                <div style="padding: 20px;">

                    <p>
                        Buen día.
                    </p>
                    <p>
                        La solicitud realizada del colaborador ${registro.nombreAnalista} por el concepto de Suspensión en las fechas ${registro.horaInicio} ${ fechaIni } / ${registro.horaFin} ${ fechaFin } ha quedado en estado ${registro.estado} Por favor recuerde informarle a su colaborador el estado final de la solicitud.
                    </p>
                    <p>
                        Esta solicitud no se cargará en SoftControl ya que el colaborador no se encuentra registrado en el aplicativo Saludos!
                    </p>

                    <p>
                        <span></span> <span style="color:green; font-weight: bold;">SOLICITUD APROBADA</span>
                    </p>

                </div>
                <div style="text-align:center; color:white; padding-bottom:10px;padding-top:10px; border-top:3px dotted rgba(60, 141, 188,0.8)">
                    <img style="width:150px; display:inline;" src="https://www.arus.com.co/wp-content/themes/arus155/img/aruslogo.jpg" alt="Imagen">
                </div>
            </div>
            `
    }

    return template
}

module.exports = templateAusentismos