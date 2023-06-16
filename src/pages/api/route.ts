export enum PathAction {
    RESOLVE_ENS = '/api/ensResolver',
    DEFAULT_CHAT = '/api/chat',
    GET_UPLOADS = '/api/getUploads',
    CREATE_PRODUCT = 'create_product',
}

export const validatePathResolver = (action: PathAction) => {
    return Object.values(PathAction).includes(action) ? action : PathAction.DEFAULT_CHAT;
}