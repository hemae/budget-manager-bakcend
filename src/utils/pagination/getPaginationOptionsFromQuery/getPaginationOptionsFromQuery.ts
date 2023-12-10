import {Request} from 'express'
import {PaginationOptions} from './interfaces'
import {INITIAL_PAGE, INITIAL_PAGE_SIZE} from './lib'

/**
 * returns pagination options from query
 * receive page and pageSize as numeric string | undefined after validator middleware
 * */
export function getPaginationOptionsFromQuery(query?: Request['query']): PaginationOptions {
    if (!query) return {page: INITIAL_PAGE, pageSize: INITIAL_PAGE_SIZE}
    const {page, pageSize} = query
    return {
        page: typeof page === 'string' && page ? +page : INITIAL_PAGE,
        pageSize: typeof pageSize === 'string' && pageSize ? +pageSize : INITIAL_PAGE_SIZE,
    }
}
