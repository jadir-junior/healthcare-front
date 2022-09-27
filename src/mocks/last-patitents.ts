import { ResponseComposition, RestContext, RestRequest } from 'msw'

import { v4 as uuidv4 } from 'uuid'

const RESPOSE_LAST_PATIENTS = [
  {
    id: uuidv4(),
    name: 'Leslie Alexander',
    visitTime: new Date(),
    date: new Date(),
  },
  {
    id: uuidv4(),
    name: 'Ronald Richards',
    visitTime: new Date(),
    date: new Date(),
  },
  {
    id: uuidv4(),
    name: 'Jane Cooper',
    visitTime: new Date(),
    date: new Date(),
  },
  {
    id: uuidv4(),
    name: 'Robert Fox',
    visitTime: new Date(),
    date: new Date(),
  },
  {
    id: uuidv4(),
    name: 'Jenny Wilson',
    visitTime: new Date(),
    date: new Date(),
  },
]

export const getLastPatients = (
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext
) => {
  return res(ctx.status(200), ctx.json(RESPOSE_LAST_PATIENTS))
}
