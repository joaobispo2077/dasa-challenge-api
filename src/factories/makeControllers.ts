import { PrismaClient } from '@prisma/client';

import { BaseController } from '@src/controllers';
import { ExamsControllers } from '@src/controllers/ExamsController';
import { LaboratoriesControllers } from '@src/controllers/LaboratoriesControllers';
import { LotsExamsController } from '@src/controllers/LotsExamsController';
import { PrismaExamsRepositories } from '@src/repositories/implementations/PrismaExamsRepositories';
import { PrismaLaboratoriesExamsRepositories } from '@src/repositories/implementations/PrismaLaboratoriesExamsRepositories';
import { PrismaLaboratoriesRepositories } from '@src/repositories/implementations/PrismaLaboratoriesRepositories';
import { ExamsServices } from '@src/services/ExamsServices';
import { LaboratoriesExamsServices } from '@src/services/LaboratoriesExamsServices';
import { LaboratoriesServices } from '@src/services/LaboratoriesServices';

export const makeLotsExamsController = (
  prisma: PrismaClient,
): BaseController => {
  const examsRepositories = new PrismaExamsRepositories(prisma);
  const examsServices = new ExamsServices(examsRepositories);

  const lotsExamsController = new LotsExamsController(examsServices);
  return lotsExamsController;
};
export const makeExamController = (prisma: PrismaClient): BaseController => {
  const examsRepositories = new PrismaExamsRepositories(prisma);
  const examsServices = new ExamsServices(examsRepositories);
  const examsController = new ExamsControllers(examsServices);

  return examsController;
};

export const makeLaboratoriesController = (
  prisma: PrismaClient,
): BaseController => {
  const laboratoriesRepositories = new PrismaLaboratoriesRepositories(prisma);
  const laboratoriesServices = new LaboratoriesServices(
    laboratoriesRepositories,
  );

  const examsRepositories = new PrismaExamsRepositories(prisma);
  const laboratoriesExamsRepositories = new PrismaLaboratoriesExamsRepositories(
    prisma,
  );
  const laboratoriesExamsServices = new LaboratoriesExamsServices(
    laboratoriesExamsRepositories,
    laboratoriesRepositories,
    examsRepositories,
  );

  const laboratoriesController = new LaboratoriesControllers(
    laboratoriesServices,
    laboratoriesExamsServices,
  );

  return laboratoriesController;
};

export const makeControllers = (prisma: PrismaClient): BaseController[] => {
  return [
    makeLaboratoriesController(prisma),
    makeExamController(prisma),
    makeLotsExamsController(prisma),
  ];
};
