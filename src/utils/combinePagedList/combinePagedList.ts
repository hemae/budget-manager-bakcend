import {Request} from 'express'

interface CombinePagedListOptions {
    otherQuery?: Request['query']
}

export async function combinePagedList(Model: any, page: number, pageSize: number, options: CombinePagedListOptions = {}) {

    // @ts-ignore
    const {otherQuery: {validated, ...withoutValidated}} = options

    const query = Model
        .find(withoutValidated)
        .skip((page - 1) * pageSize)
        .limit(pageSize)

    let totalCount = await Model.countDocuments(withoutValidated)

    return {
        meta: {
            totalCount,
            pageSize,
            page,
        },
        results: await query.exec()
    }
}
