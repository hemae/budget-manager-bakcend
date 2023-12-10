import {Response} from 'express'

export function handle500(e: any, res: Response) {
    console.log(e)
    return res.status(500).json({
        errors: [{message: e.reason?.message}],
        message: 'Something went wrong'
    })
}
