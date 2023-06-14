export enum PathAction {
    RESOLVE_ENS = '/api/ensResolver',
    DEFAULT_CHAT = '/api/chat',
    CREATE_USER = 'create_user',
    CREATE_PRODUCT = 'create_product',
}

// export const pathResolver = (action: PathAction) => {
//     switch (action) {
//         case PathAction.RESOLVE_ENS:
//             return '/api/ensResolver';
//         case PathAction.DEFAULT_CHAT:
//             return '/api/chat';
//         case PathAction.CREATE_USER:
//             return '/api/createUser';
//         case PathAction.CREATE_PRODUCT:
//             return '/api/createProduct';
//         default:
//             return '/api/chat';
//     }
// }