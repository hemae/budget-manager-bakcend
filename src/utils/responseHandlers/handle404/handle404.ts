import {Response} from 'express'

export function handle404(res: Response, message: string = 'Not found') {
    return res.status(404).json({
        errors: [{message}],
        message: 'Query occurs 1 error',
    })
}
