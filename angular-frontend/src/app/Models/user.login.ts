export class UserLogin{
    constructor(
        public userName: string,
        public password: string,
        public profile_code?: String,
        public admin?: boolean
    ){}
}