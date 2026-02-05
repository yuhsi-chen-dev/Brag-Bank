import { BadRequestException } from '@nestjs/common';

export const validateDateRange = (from?: string, to?: string) => {
  if (!from || !to) {
    return;
  }

  const fromDate = new Date(from);
  const toDate = new Date(to);

  if (Number.isNaN(fromDate.getTime()) || Number.isNaN(toDate.getTime())) {
    throw new BadRequestException('Invalid date range.');
  }

  if (fromDate > toDate) {
    throw new BadRequestException('Invalid date range: from is after to.');
  }
};
