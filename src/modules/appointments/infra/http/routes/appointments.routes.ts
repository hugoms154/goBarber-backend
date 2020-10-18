import { Router } from 'express';
import { parseISO } from 'date-fns';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { container } from 'tsyringe';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const createAppointmentRepository = container.resolve(
    CreateAppointmentService,
  );
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);

  const appointment = await createAppointmentRepository.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
