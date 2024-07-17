export class UserLogin{
    constructor(
        public _id: string,
        public userName: string,
        public password: string,
        public profile_code?: string,
        public admin?: boolean
    ){}
}