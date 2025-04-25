import Movie from '#models/movie'
import cache from '#services/cache_service'
import MovieService from '#services/movie_service'
import type { HttpContext } from '@adonisjs/core/http'
import { toHtml } from '@dimerapp/markdown/utils'

export default class MoviesController {
  async index({ view }: HttpContext) {
    const movies = await Movie.getSlugs()

    return view.render('pages/home', { movies })
  }

  async show({ view, params }: HttpContext) {
    const movie = await Movie.find(params.slug)
    // const movie = cache.get(params.slug)

    return view.render('pages/movies/show', { movie })
  }
}
