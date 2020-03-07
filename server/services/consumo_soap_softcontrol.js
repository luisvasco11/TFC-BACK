const soapRequest = require("easy-soap-request");

function crearXML(identificacion, tipoIdentificacion, codigoJustificacion, fechaInicio, fechaFin) {
	try {
		const xmlCreado = `<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
    <soap12:Body>
        <ImportarAusencia xmlns="http://www.softcontrol.com.co/">
          <token>s0ftc0ntr0lw3b</token>
          <identificacion>${identificacion}</identificacion>
          <tipo_identificacion_id>${tipoIdentificacion}</tipo_identificacion_id>
          <codigo_justificacion>${codigoJustificacion}</codigo_justificacion>
          <fecha_inicio>${fechaInicio}</fecha_inicio>
          <fecha_fin>${fechaFin}</fecha_fin>
          <codigo_usuario>prueba.web</codigo_usuario>
          <codigo_incapacidad></codigo_incapacidad>
          <codigo_diagnostico></codigo_diagnostico>
          <prorroga></prorroga>
          <codigo_tnl></codigo_tnl>
          <valor_pagado>0</valor_pagado>
          <observaciones></observaciones>
        </ImportarAusencia>
      </soap12:Body>
    </soap12:Envelope>`;
		return xmlCreado;
	} catch (error) {
		console.error(
			"Ha ocurrido un error durante la creacion del XML para el servicio SOAP de Softcontrol =>",
			error
		);
	}
}

async function registrarAusentimoSoftcontrol(
	identificacion,
	tipoIdentificacion,
	codigoJustificacion,
	fechaInicio,
	fechaFin
) {
	const url = "http://172.26.53.97:8080/WSReconocimientoBiometrico/integracion.asmx";

	const sampleHeaders = {
		"Content-Type": "text/xml;charset=UTF-8",
		"soapAction": "http://www.softcontrol.com.co/ImportarAusencia"
	};

	try {
		const xml = crearXML(
			identificacion,
			tipoIdentificacion,
			codigoJustificacion,
			fechaInicio,
			fechaFin
		);

		const { response } = await soapRequest({
			url: url,
			headers: sampleHeaders,
			xml: xml,
			timeout: 1000
		});

		const { headers, body, statusCode } = response;

		console.log(headers);
		console.log(body);
		console.log(statusCode);
	} catch (error) {
		console.error("Ha ocurrido un error durante el registro del ausentismo en Softcontrol =>", error);
	}
}

module.exports = registrarAusentimoSoftcontrol;
