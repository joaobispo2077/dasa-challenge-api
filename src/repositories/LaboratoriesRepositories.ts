import { CreateLaboratoryDTO } from '@src/dtos/LaboratoriesDTOS';
import { Laboratory } from '@src/entities/Laboratory';

export interface LaboratoriesRepositories {
  create({ name, address, status }: CreateLaboratoryDTO): Promise<Laboratory>;
}