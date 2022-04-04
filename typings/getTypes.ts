// vendors
import { ChangeEvent, FormEvent } from "react"

export type PostsProps = {
  author?: string
  date?: string
  text?: string
  titulo?: string
}

export type LoginProps = {
  email: string
  name: string
  password: string
  post?: PostsProps[]
}

export type FormProps = {
  formValues: Record<string, string>
  message?: string
  handleSubmit: (event: FormEvent) => void
  handleChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
}