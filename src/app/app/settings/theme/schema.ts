import { z } from 'zod'

export const themeFormSchema = z.object({
  theme: z.enum(['light', 'dark'], {
    required_error: 'Please select a theme.',
  }),
})

export type themeFormSchema = z.infer<typeof themeFormSchema>
