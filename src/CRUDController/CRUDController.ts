import {Request, Response} from 'express'
import {getPaginationOptionsFromQuery} from '../utils/pagination'
import {combinePagedList} from '../utils/combinePagedList'
import {handle404, handle500, handleSuccess} from '../utils/responseHandlers'
import {Model} from 'mongoose'

export class CRUDController {

    static get(model: Model<any>) {
        return async function(req: Request, res: Response) {
            try {
                const {page: queryPage, pageSize: queryPageSize, ...otherQuery} = req.query
                const {page, pageSize} = getPaginationOptionsFromQuery({page: queryPage, pageSize: queryPageSize})
                const responseBody = await combinePagedList(model, page, pageSize, {otherQuery})
                handleSuccess(res, responseBody)
            } catch (e) {
                handle500(e, res)
            }
        }
    }

    static getById(model: Model<any>, modelName: string) {
        return async function(req: Request, res: Response) {
            try {
                const {id} = req.params
                const entity = await model.findById(id)
                if (!entity) return handle404(res, `${modelName} with id: ${id} does not exist`)
                handleSuccess(res, entity)
            } catch (e) {
                handle500(e, res)
            }
        }
    }

    static post(model: Model<any>) {
        return async function(req: Request, res: Response) {
            try {
                const entity = new model(req.body)
                await entity.save()
                handleSuccess(res, entity)
            } catch (e) {
                handle500(e, res)
            }
        }
    }

    static put(model: Model<any>, modelName: string) {
        return async function (req: Request, res: Response) {
            try {
                const {id} = req.params
                const entity = await model.findById(id)
                if (!entity) return handle404(res, `${modelName} with id: ${id} does not exist`)
                await model.findByIdAndUpdate(id, req.body)
                const updatedEntity = await model.findById(id)
                if (!updatedEntity) return handle404(res, `${modelName} with id: ${id} does not exist`)
                handleSuccess(res, updatedEntity)
            } catch (e) {
                handle500(e, res)
            }
        }
    }

    static delete(model: Model<any>, modelName: string) {
        return async function(req: Request, res: Response) {
            try {
                const {id} = req.params
                const entity = await model.findById(id)
                if (!entity) return handle404(res, `${modelName} with id: ${id} does not exist`)
                await model.findByIdAndDelete(id)
                handleSuccess(res, {id})
            } catch (e) {
                handle500(e, res)
            }
        }
    }
}
