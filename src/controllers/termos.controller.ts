import { Request, Response } from "express";

export class TermosController {

    async termos(req: Request, res: Response) {

        try {

            return res.status(200).send({
                ok: true,
                message: 'Termos do serviço'
            })
            
        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Instabilidade no servidor!',
                error: error.toString()
            })

        }

    }

}