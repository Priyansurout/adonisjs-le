import redis from '@adonisjs/redis/services/main'
import { resolve } from 'path'


class CacheService {

    #store: Record<string , any> = {}

    async has(...keys: string[]){

        return redis.exists(keys)
    }

    async get(key: string){
        
        const value = await redis.get(key)
        return value && JSON.parse(value)
    }

    async set(key: string, value: any){
        
        return redis.set(key, JSON.stringify(value))
    }

    async delete(...keys: string[]){
        return redis.del(keys)}

    async flushDb(){
        return redis.flushdb()
    }
}

const cache = new CacheService()

export default cache


// class CacheService {

//     #store: Record<string , any> = {}

//     has(key: string){

//         return key in this.#store
//     }

//     get(key: string){
//         return this.#store[key]
//     }

//     set(key: string, value: any){
//         this.#store[key] = value
//     }

//     delete(key: string){
//         delete this.#store[key]
//     }
// }

// const cache = new CacheService()

// export default cache

