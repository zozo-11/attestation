import { z } from 'zod'

export const hebergeantSchema = z.object({
  nom: z.string().min(1, 'Nom requis'),
})

export const hebergeSchema = z.object({
  nom: z.string().min(1, 'Nom requis'),
})

export const logementSchema = z.object({
  adresse: z.string().min(1, 'Adresse requise'),
})
