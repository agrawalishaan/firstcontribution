import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const allRepoData = await prisma.repositoryLanguage.findMany();
  res.status(200).json(allRepoData);
}
