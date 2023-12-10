import {Request, Response} from 'express'
import {ProjectModel} from '../../models/Project'
import {
    handle500, handleSuccess,
} from '../../utils/responseHandlers'
import {getPaginationOptionsFromQuery} from '../../utils/pagination'

export class ProjectController {

    static async get(req: Request, res: Response) {
        try {
            const {page: queryPage, pageSize: queryPageSize} = req.query
            const {page, pageSize} = getPaginationOptionsFromQuery({page: queryPage, pageSize: queryPageSize})

            const {userId} = req.body

            const projectsQuery = ProjectModel
                .find({assignedUserIds: {$in: [userId]}})
                .skip((page - 1) * pageSize)
                .limit(pageSize)

            let totalCount = await ProjectModel.countDocuments({assignedUserIds: {$in: [userId]}})

            handleSuccess(res, {
                meta: {
                    totalCount,
                    pageSize,
                    page,
                },
                results: await projectsQuery.exec()
            })
        } catch (e) {
            handle500(e, res)
        }
    }

    static async post(req: Request, res: Response) {
        try {
            const body = req.body
            const project = new ProjectModel({
                ...body,
                assignedUserIds: [body.founderUserId],
                adminUserIds: [body.founderUserId],
            })
            await project.save()
            handleSuccess(res, project)
        } catch (e) {
            handle500(e, res)
        }
    }
}
