import { Exception } from '@adonisjs/core/exceptions'
import app from '@adonisjs/core/services/app'
import { MarkdownFile } from '@dimerapp/markdown'
import fs from 'node:fs/promises'

export default class MovieService {
  // Your code here
  static getSlugUrl(slug: string) {
    if (!slug.endsWith('.md')) {
      slug += '.md'
    }
    return app.makeURL(`resources/movies/${slug}`)
  }

  static async getSlug() {
    const url = app.makeURL('resources/movies')
    const files = await fs.readdir(url)
    return files.map((file) => {
      // console.log(file)
      return file.replace('.md', '')
    })
  }

  static async read(slug: string) {
    try {
      const url = MovieService.getSlugUrl(slug)
      const file = await fs.readFile(url, 'utf-8')
      const md = new MarkdownFile(file)
      md.process()
      return md
    } catch (error) {
      throw new Exception(`movie not found ${slug}`, {
        code: 'MOVIE_NOT_FOUND',
        status: 404,
      })
    }
  }
}
