import { ResponseComposition, RestContext, RestRequest } from 'msw'

import { v4 as uuidv4 } from 'uuid'

const RESPOSE_LAST_PAYMENTS = [
  {
    id: uuidv4(),
    recipient: 'Leslie Alexander',
    amount: 988,
    date: new Date(),
  },
  {
    id: uuidv4(),
    recipient: 'Ronald Richards',
    amount: 778,
    date: new Date(),
  },
  {
    id: uuidv4(),
    recipient: 'Jane Cooper',
    amount: 779,
    date: new Date(),
  },
  {
    id: uuidv4(),
    recipient: 'Robert Fox',
    amount: 293,
    date: new Date(),
  },
  {
    id: uuidv4(),
    recipient: 'Jenny Wilson',
    amount: 739,
    date: new Date(),
  },
]

export const getLastPayments = (
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext
) => {
  return res(ctx.status(200), ctx.json(RESPOSE_LAST_PAYMENTS))
}
