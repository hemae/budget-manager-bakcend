import {Router} from 'express'
import {CRUDController} from '../../CRUDController'
import {ProjectController} from './project.controller'
import {ProjectModel} from '../../models/Project'
import {validate} from '../../middlewares/validate'
import {auth} from '../../middlewares/auth'
import {validatePaginationQuery} from '../../middlewares/validatePaginationQuery'
import {
    projectPostValidationRules,
    projectPutValidationRules,
} from './validationRules'

const router = Router()

router.get(
    '/project',
    auth({pushUserIdToBody: true}),
    validatePaginationQuery,
    ProjectController.get,
)

router.post(
    '/project',
    auth({pushUserIdToBody: true, userIdFieldName: 'founderUserId'}),
    validate('body', projectPostValidationRules),
    ProjectController.post,
)

router.put(
    '/project/:id',
    auth({pushUserIdToBody: true, userIdFieldName: 'founderUserId'}),
    validate('body', projectPutValidationRules),
    CRUDController.put(ProjectModel, 'Project'),
)

router.delete(
    '/project/:id',
    auth(),
    CRUDController.delete(ProjectModel, 'Project'),
)

module.exports = router
