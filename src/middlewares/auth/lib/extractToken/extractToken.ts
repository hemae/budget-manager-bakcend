export function extractToken(authorization: string | undefined) {
    return authorization?.split(' ')?.[1] || null
}
