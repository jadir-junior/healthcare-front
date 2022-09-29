import { ResponseComposition, RestContext, RestRequest } from 'msw'

const ME = {
  name: 'John Doe',
  email: 'john.doe@gmail.com',
  photo:
    'https://userstock.io/data/wp-content/uploads/2020/06/robert-godwin-cdksyTqEXzo-1024x1024.jpg',
}

const USER = {
  ...ME,
  profileBackgroundImage:
    'https://images.unsplash.com/photo-1612521481292-29c419630420?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1464&q=80',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolore enim, nemo nihil non omnis temporibus? Blanditiis culpa labore velit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta, provident.',
  contact: {
    phone: '012659678',
    address: {
      number: 71,
      street: 'Pligrim Avenue Chevy Chase',
      state: 'MD',
      city: 'Midway',
    },
  },
  socialMedias: {
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
}

export const profile = (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
  return res(ctx.status(200), ctx.json(USER))
}

export const me = (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
  return res(ctx.status(200), ctx.json(ME))
}
