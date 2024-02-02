import { User as UserModel } from '../../models/user';

declare global {
    namespace Express {
        interface User extends UserModel { }

        namespace Multer {
            interface File {
                location?: string;

            }
        }
    }


}

// declare namespace Express {
//     namespace Multer {
//         interface File {
//             location?: string;
//              
//         }
//     }
// }