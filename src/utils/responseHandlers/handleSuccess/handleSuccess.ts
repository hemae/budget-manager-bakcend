import {Response} from 'express'

export function handleSuccess(res: Response, json?: Record<string, any>, code = 200) {
    if (json) return res.status(code).json(json)
    return res.status(code)
}
