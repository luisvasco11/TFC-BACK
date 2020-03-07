let templateCorreoEvento = (evento) => {
    
    return template = `
    <div style="border:1px solid #ccc; width:50%; font-family: arial; box-shadow: 4px 5px 9px 5px #ccc">
        <div style="background-color:rgba(60, 141, 188,0.8); text-align:center; color:white; padding-bottom:10px;  padding-top:10px;">
            <img style="width:150px; display:inline;" src="https://pati.arus.com.co/dist/img/PATI-05.png" alt="Imagen">
            <h3 class="titulo">NOTIFICACIÓN CREACIÓN DEL EVENTO <strong> <span style="text-decoration:underline;">${evento.numero}</span> </strong> PATI</h3>
        </div>
        <div style="padding: 20px;">
            <table class="table" style="width: 100%;">
            <tr>
                <td>
                <span><strong>HOST</strong></span>
                </td>
                <td>
                <span>${evento.nombreHost} [ ${evento.ipHost} ]</span>
                </td>
            </tr>
            <tr>
                <td>
                <span><strong>CONTRATO</strong></span>
                </td>
                <td>
                <span>${evento.nombreContrato.toUpperCase()}</span>
                </td>
            </tr>
            <tr>
                <td>
                <span><strong>SERVICIO AFECTADO</strong></span>
                </td>
                <td>
                <span>${evento.affectedService.name}</span>
                </td>
            </tr>
            <tr>
                <td>
                <span><strong>TIPO EVENTO</strong></span>
                </td>
                <td>
                <span>${evento.eventType}</span>
                </td>
            </tr>
            <tr>
                <td>
                <span><strong>CAUSA EVENTO</strong></span>
                </td>
                <td>
                <span>${evento.eventCause}</span>
                </td>
            </tr>
            <tr>
                <td>
                <span><strong>MINUTOS ACTIVIDAD</strong></span>
                </td>
                <td>
                <span>${evento.time} MIN</span>
                </td>
            </tr>
            <tr>
                <td>
                <span><strong>TIPO ACTIVIDAD</strong></span>
                </td>
                <td>
                <span>${evento.activityType}</span>
                </td>
            </tr>
            <tr>
                <td>
                <span><strong>PERSONA QUE REPORTA</strong></span>
                </td>
                <td>
                <span>${evento.reporterOne.name}</span>
                </td>
            </tr>
            <tr>
                <td>
                <span><strong>RESPONSABLE</strong></span>
                </td>
                <td>
                <span>${evento.responsableOne.name}</span>
                </td>
            </tr>
            <tr>
                <td>
                <span><strong>FECHA Y HORA</span>
                </td>
                <td>
                <span>${evento.fecha}</span>
                </td>
            </tr>
            <tr>
                <td>
                <span><strong>OBSERVACIONES</strong></span>
                </td>
                <td>
                <span>${evento.notes}</span>
                </td>
            </tr>
            </table>
        </div>
        <div style="text-align:center; color:white; padding-bottom:10px;padding-top:10px; border-top:3px dotted rgba(60, 141, 188,0.8)">
            <img style="width:150px; display:inline;" src="https://www.arus.com.co/wp-content/themes/arus155/img/aruslogo.jpg" alt="Imagen">
        </div>
    </div>
    `
}

module.exports = templateCorreoEvento