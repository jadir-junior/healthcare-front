import { ResponseComposition, RestContext, RestRequest } from 'msw'

const RESPOSE_LAST_PAYMENTS = [
  {
    id: '1',
    recipient: 'Leslie Alexander',
    amount: 988,
    date: new Date(),
  },
  {
    id: '2',
    recipient: 'Ronald Richards',
    amount: 778,
    date: new Date(),
  },
  {
    id: '3',
    recipient: 'Jane Cooper',
    amount: 779,
    date: new Date(),
  },
  {
    id: '4',
    recipient: 'Robert Fox',
    amount: 293,
    date: new Date(),
  },
  {
    id: '5',
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
