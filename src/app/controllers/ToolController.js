/* --------------------------------- IMPORTS ---------------------------------*/
/** Importa tudo de yup como Yup (dependencia nao tem export default) */

import * as Yup from 'yup';
import Tool from '../models/Tool';

/* --------------------------------- CONTENT ---------------------------------*/

/** ----- CADASTRO DA FERRAMENTA (POST) ----- */

class ToolController {
  /**
   * Metodo store com mesma face de um middleware no node.
   * Recebe dados do Ferramenta e cria novo registro dentro da base de dados.
   */
  async store(req, res) {
    /** Define schema to validate req.body prior to 'store()' data */
    const schema = Yup.object().shape({
      /** Attribute 'tool' is a required string */
      tool: Yup.string().required(),
      /** Attribute 'fit_type' is a required string */
      fit_type: Yup.string().required(),
      /** Attribute 'milling_cutter_type' is a required string */
      milling_cutter_type: Yup.string().required(),
      /** Attribute 'external_diameter' is a required number */
      external_diameter: Yup.number().required(),
      /** Attribute 'thickness' is a required number */
      thickness: Yup.number().required(),
      /** Attribute 'internal_diameter' is a required number */
      internal_diameter: Yup.number().required(),
    });
    /** If 'req.body' do not attend to the schema requirements (is not valid) */
    if (!(await schema.isValid(req.body))) {
      /** Return error status 400 with message 'Validation has failed' */
      return res.status(400).json({ error: 'Validation has failed' });
    }

    /**
     * Cria Ferramenta na base de dados usando resposta asincrona e retorna apenas
     * dados uteis.
     */
    const {
      id,
      tool,
      fit_type,
      milling_cutter_type,
      external_diameter,
      thickness,
      internal_diameter,
    } = await Tool.create(req.body);
    /** Retorna json apenas com dados uteis ao frontend */
    return res.json({
      id,
      tool,
      fit_type,
      milling_cutter_type,
      external_diameter,
      thickness,
      internal_diameter,
    });
  }
}
/* --------------------------------- EXPORTS ---------------------------------*/
export default new ToolController();
