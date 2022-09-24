import { RestRequest, ResponseComposition, RestContext } from 'msw'

export const login = (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
  return res(
    ctx.status(200),
    ctx.json({
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc0MGRkMTBhLTUxNDktNDIwYS05NWE4LWMyMzczMGFjM2ViOCIsIm5hbWUiOiJKb2huIERvZSJ9.eA_rwmjWuNj7NcWOc_fzDSluew8wCWUS6eXNF3-X8y4',
    })
  )
}
