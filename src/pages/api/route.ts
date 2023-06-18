export enum PathAction {
    RESOLVE_ENS = '/api/ensResolver',
    DEFAULT_CHAT = '/api/chat',
    GENERATE_CAR = 'http://localhost:3333/api/generateCar',
    GET_UPLOADS = '/api/getUploads',
    UPLOAD_FILE = '/api/uploadFile',
    VIEW_FILES = 'http://localhost:3333/api/viewFiles',
    MAKE_DEAL_PROPOSAL = '/api/makeDealProposal',
    FETCH_PROPOSAL_ID = '/api/fetchProposalId',
    PLAY_MEDIA = '/api/playMedia',
}

export const validatePathResolver = (action: PathAction) => {
    return Object.values(PathAction).includes(action) ? action : PathAction.DEFAULT_CHAT;
}

export const isValidFunctionPath = (action: PathAction) => {
    return Object.values(PathAction).includes(action);
}