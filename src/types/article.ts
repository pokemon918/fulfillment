export interface BaseArticle {
  _id: string
  title: string
  description: string
  thumbnail: string
  updatedAt: string
}

export interface DetailedArticle extends BaseArticle {
  content: string
}
