import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";

export class JwtConfig implements JwtOptionsFactory{
    createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
        return{
            secret : process.env.JwtSecret,
            signOptions : {expiresIn : "300000s"}
        }
    }

}