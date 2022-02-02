import { Controller, Delete, Get, Patch, Post } from '@overnightjs/core';
import { RequestHandler } from 'express';

import { BaseController } from '.';

import { ExamsServices } from '@src/services/ExamsServices';
import { UnprocessableEntityError } from '@src/utils/errors/UnprocessableEntityError';
import { logger } from '@src/utils/logger';
import { CreateExamValidator } from '@src/utils/validations/CreateExamValidator';
import { UpdateExamValidator } from '@src/utils/validations/UpdateExamValidator';

@Controller('exams')
export class ExamsControllers extends BaseController {
  constructor(private readonly examsServices: ExamsServices) {
    super();
  }

  @Post('')
  create: RequestHandler = async (request, response) => {
    await CreateExamValidator.validate(request.body, {
      abortEarly: false,
    });

    const { name, type } = request.body;

    const newExam = await this.examsServices.create({
      name,
      type,
    });

    logger.debug(`Exam created: ${newExam.id}`);
    return response.status(201).json(newExam);
  };

  @Get('')
  findAll: RequestHandler = async (_, response) => {
    const exams = await this.examsServices.findAll();

    logger.debug(`Exams found: ${exams}`);
    return response.json(exams);
  };

  @Delete(':id')
  deleteById: RequestHandler = async (request, response) => {
    const { id } = request.params;

    if (!id) {
      throw new UnprocessableEntityError('Exam id is required to this action.');
    }

    const laboratory = await this.examsServices.deleteById(String(id));

    logger.debug(`Exam deleted: ${laboratory}`);
    return response.json(laboratory);
  };

  @Patch(':id')
  updateById: RequestHandler = async (request, response) => {
    await UpdateExamValidator.validate(request.body, {
      abortEarly: false,
    });

    const { id } = request.params;

    if (!id) {
      throw new UnprocessableEntityError('Exam id is required to this action.');
    }

    const { name, type, status } = request.body;

    const updatedExam = await this.examsServices.updateById({
      id: String(id),
      name,
      type,
      status,
    });

    logger.debug(`Exam updated: ${updatedExam}`);
    return response.json(updatedExam);
  };
}