import { BaseKeyword } from './keyword'

export interface BaseArticle {
  _id: string
  title: string
  description: string
  thumbnail: string
  keywords: BaseKeyword[]
  updatedAt: string
}

export interface DetailedArticle extends BaseArticle {
  content: string
}
