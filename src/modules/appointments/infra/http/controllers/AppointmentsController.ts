import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
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
  }
}
