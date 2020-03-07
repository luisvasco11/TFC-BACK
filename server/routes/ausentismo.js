const express = require("express");
const conexion = require("../db/conexion");
const app = express();
const Ausentismo = require("../models/ausentismo");
const Analista = require("../models/analista");
const { enviarCorreoAusentismo } = require("../mail/mailer");
const verificarCedulaSoftcontrol = require("../db/conexion_vista_ausentismos");
const registrarAusentimoSoftcontrol = require("../services/consumo_soap_softcontrol");

app.post("/", async (req, res) => {
	const ausentismo = new Ausentismo({ ...req.body.ausentismo });

	try {
		const ausentismoGuardado = await ausentismo.save();

		const analista = await Analista.findById(ausentismoGuardado.analista);

		try {
			const verificacion = await verificarCedulaSoftcontrol(
				analista.cedula
			);
			console.log(verificacion, "verificacion", "1")

			const fechaInicial = obtenerFechaFormateada(ausentismoGuardado.fechaInicio, ausentismoGuardado.horaInicio);
			const fechaFinal = obtenerFechaFormateada(ausentismoGuardado.fechaFin, ausentismoGuardado.horaFin)
			const codigoSoftControl = ausentismoGuardado.codigoSoftControl;

			console.log(fechaInicial, "Fecha inicial", "2")
			console.log(fechaFinal, "Fecha final", "3")

			registrarAusentimoSoftcontrol(analista.cedula, 1, codigoSoftControl, fechaInicial, fechaFinal);
		} catch (error) {
			console.error(error);
		}

		const correoEnviado = await enviarCorreoAusentismo(req.body.ausentismo);

		res.send({ OK: true, ausentismoGuardado });
	} catch (error) {
		res.send({ error, OK: false });
	}
});

app.get("/analista", async (req, res) => {
	let cedula = "1036658046";
	let sql = "SELECT * FROM VAUSENTISMOSPATI WHERE cedula=:nombre";
	const data = await conexion.open(sql, [cedula], false, "response");
	res.status(200).json(data);
});

app.get("/analista/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const misAnalistas = await Analista.find({ lider: id });
		const analistasIds = formatearIds(misAnalistas);

		if (analistasIds.length === 0) {
			return res.status(400).json({
				OK: true,
				error: "No tienes analistas asignado en PATI"
			});
		}

		const solicitudes = await Ausentismo.find({
			$and: [{ $or: analistasIds }, { estado: "SOLICITUD CREADA" }]
		}).populate("analista", "nombre");

		res.status(200).send({ OK: true, solicitudesPendientes: solicitudes });
	} catch (error) {
		res.status(400).send({ OK: false, error });
	}
});

app.get("/", (req, res) => {
	Ausentismo.find()
		.then(ausentismos => {
			res.status(200).json({ OK: true, ausentismos });
		})
		.catch(err => {
			res.status(400).json({ OK: false, err });
		});
});

app.get("/:id", (req, res) => {
	const { _id } = req.params;
	Ausentismo.findById(_id)
		.then(ausentismo => {
			res.status(200).json({ OK: true, ausentismo });
		})
		.catch(err => {
			res.status(400).json({ OK: false, err });
		});
});

app.patch("/:id", async (req, res) => {
	const { id } = req.params;
	const { ausentismo } = req.body;
	delete ausentismo.cancelado;
	delete ausentismo.denegar;

	try {
		const ausentismoActualizar = await Ausentismo.findByIdAndUpdate(
			id,
			ausentismo,
			{ runValidators: true, new: true }
		);
		if (!ausentismoActualizar) {
			return res.status(404).send({ OK: false });
		}

		const analista = await Analista.findById(ausentismoActualizar.analista);
		const lider = await obtenerLider(analista.cedula);
		ausentismo.correoSolicitante = analista.email;
		ausentismo.nombreAnalista = analista.nombre;
		ausentismo.correoLiderProduccion =
			lider.result[lider.result.length - 1][24];
		ausentismo.correoLider = "angel.goez@arus.com.co"; //Eliminar cuando salga a producción cambiarlo por la linea de arriba 86
		await enviarCorreoAusentismo(ausentismo);

		res.status(200).send({ OK: true, ausentismo: ausentismoActualizar });
	} catch (error) {
		res.status(400).send({ OK: false, error });
	}
});

const formatearIds = analistas => {
	return analistas.map(analista => ({ analista: analista._id }));
};

const obtenerLider = cedula => {
	console.log(cedula);
	let sql = "SELECT * FROM VAUSENTISMOSPATI WHERE cedula=:nombre";
	return conexion.open(sql, [cedula], false, "response");
};

const obtenerFechaFormateada = (fecha, horas) => {
	fecha = fecha.replace('00:00:00.000Z', '');
	var separarAmPm = horas.split(' ');
	var separarMinutoHora = separarAmPm[0].split(':');
	var hora = separarMinutoHora[0];
	var minuto = separarMinutoHora[1];
	var tipoAmPm = separarAmPm[1];

	if (tipoAmPm == 'PM') {
		if (hora != 12) {
			hora = hora * 1 + 12;
		}
	} else if (tipoAmPm == 'AM' && hora == '12') {
		hora = hora - 12;
		return `${fecha}0${hora}:${minuto}:00`;
	} else {
		hora = hora;
	}

	return `${fecha}${hora}:${minuto}:00`;
}
module.exports = app;
