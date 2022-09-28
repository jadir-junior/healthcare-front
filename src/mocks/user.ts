import { ResponseComposition, RestContext, RestRequest } from 'msw'

const USER = {
  name: 'John Doe',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolore enim, nemo nihil non omnis temporibus? Blanditiis culpa labore velit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta, provident.',
  contact: {
    phone: '012659678',
    address: {
      number: '71',
      street: 'Pligrim Avenue Chevy Chase',
      state: 'MD',
      city: 'Midway',
    },
    socialMedia: {
      facebook: 'https://facebook.com.br/john-doe',
      instagram: 'https://instagram.com/john-doe',
      linkedin: 'https://linkedin.com/john-doe',
      twitter: 'https://twitter.com/john-doe ',
    },
    events: [
      {
        title: 'Medication',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur nam nisi veniam.',
        date: new Date(),
      },
      {
        title: 'Examination',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur nam nisi veniam.',
        date: new Date(),
      },
    ],
    healthProblems: ['rhinitis', 'sinusitis'],
  },
}

export const profile = (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
  return res(ctx.status(200), ctx.json(USER))
}
