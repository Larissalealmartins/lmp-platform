/* --------------------------------- IMPORTS ---------------------------------*/
import Notification from '../schemas/Notification';
import User from '../models/User';

/* --------------------------------- CONTENT ---------------------------------*/
class NotificationController {
  async index(req, res) {
    /**
     * Check if 'provider_id' is a provider
     */
    const checkIsProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    /** Se 'checkIsProvider' retornar false, será retornado um erro. */
    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'Only providers can load notifications' });
    }

    /** Cria objeto com lista de notificacoes... */
    const notifications = await Notification.find({
      /** ... em que 'user' for igual ao 'user' do usuario logado */
      user: req.userId,
    })
      /** ... ordenando notificacoes por data de criacao (da mais recente para mais antiga) */
      .sort({ createdAt: 'desc' })
      /** ... limitando a lista a 20 notificacoes */
      .limit(20);

    /** Retorna notificacoes */
    return res.json(notifications);
  }

  async update(req, res) {
    /**
     * Atualiza notificacao pelo id
     */

    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      /** Marca como lida */
      { read: true },
      /**
       * Depois que atualizar, retorna nova notificacao atualizada.
       * Sem essa opcao, notificacao é atualizada mas não retornada para
       * variável 'notification'
       */
      { new: true }
    );

    /**
     * Envia resposta com notificação atualizada
     */
    return res.json(notification);
  }
}

/* --------------------------------- EXPORTS ---------------------------------*/
export default new NotificationController();
