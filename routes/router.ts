import { Router, Request, Response } from "express";
import { GraficaData } from '../clases/grafica';
import Server from '../clases/server';

const router = Router();

const grafica = new GraficaData();

router.get("/grafica", (req: Request, resp: Response) => {
  resp.json(grafica.getDataGrafica());
});

router.post("/grafica", (req: Request, resp: Response) => {
  const mes = req.body.mes;
  const unidades = Number(req.body.unidades);

  grafica.incrementarValor(mes, unidades);
  
  const server = Server.instance;
  server.io.emit('cambio-grafica', grafica.getDataGrafica());



  resp.json(grafica.getDataGrafica());

});


export default router;
