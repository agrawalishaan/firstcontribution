import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/db/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const allRepoData = await prisma.repositoryLanguage.findMany();
  res.status(200).json(allRepoData);
}
