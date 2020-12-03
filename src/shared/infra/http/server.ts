import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import '@shared/infra/typeorm';
import '@shared/container';
import routes from '@shared/infra/http/routes';

import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';

const server = express();

server.use(cors());
server.use(express.json());
server.use('/files', express.static(uploadConfig.tmpFolder));
server.use(routes);

server.use(errors());

server.use(
  (err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

server.listen(3333, () => {
  console.log('sucesso bicho');
});
