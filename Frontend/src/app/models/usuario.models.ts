export class Usuario{
    constructor(
        public nombreUsuario: string,
        public email: string,
        public password: string,
        public img?:string,
        public plan?: string,
        public google?: boolean,
        public _id?: string
    ){}
}