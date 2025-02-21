import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email("Correo inválido").min(1,"Este campo es obligatorio"),
  password: z.string().min(8,"La contraseña debe tener 8 caracteres")
}).superRefine(({password},ctx) => {
  if (!/[A-Z]/.test(password)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Debe contener al menos una letra mayúscula",
    });
  }

  if (!/[a-z]/.test(password)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Debe contener al menos una letra minúscula",
    });
  }

  if (!/[0-9]/.test(password)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Debe contener al menos un número",
    });
  }

  if (!/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(password)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Debe contener al menos un carácter especial",
    });
  }
});

export type LoginValues = z.infer<typeof loginSchema>;