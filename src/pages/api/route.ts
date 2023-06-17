export enum PathAction {
    RESOLVE_ENS = '/api/ensResolver',
    DEFAULT_CHAT = '/api/chat',
    GENERATE_CAR = 'http://localhost:3333/api/generateCar',
    GET_UPLOADS = '/api/getUploads',
    VIEW_FILES = 'http://localhost:3333/api/viewFiles',
}

export const validatePathResolver = (action: PathAction) => {
    return Object.values(PathAction).includes(action) ? action : PathAction.DEFAULT_CHAT;
}