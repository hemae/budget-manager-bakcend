import {Response} from 'express'

export function handleClientError(res: Response, json: Record<string, any>, code = 400) {
    return res.status(code).json(json)
}
