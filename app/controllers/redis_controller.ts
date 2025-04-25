import cache from '#services/cache_service'
import type { HttpContext } from '@adonisjs/core/http'
import { waitForDebugger } from 'inspector'

export default class RedisController {

    public async destroy({response, params}: HttpContext ){

        await cache.delete(params.slug)
        return response.redirect().back()
9    }

    public async flush({response}: HttpContext ){

        await cache.flushDb()
        return response.redirect().back()
    }
}