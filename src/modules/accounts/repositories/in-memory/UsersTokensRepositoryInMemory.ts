import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {

    usersTokens: UserTokens[] = [];

    async create({ user_id, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = new UserTokens();

    Object.assign(userToken, {
        user_id,
        expires_date,
        refresh_token
    });

    this.usersTokens.push(userToken);

    return userToken;
    
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
        const userToken = this.usersTokens.find((usertoken) => usertoken.user_id === user_id && usertoken.refresh_token === refresh_token);

        return userToken;
    }

    async deleteById(id: string): Promise<void> {
        const userToken = this.usersTokens.find((usertoken) => usertoken.id === id);

        this.usersTokens.splice(this.usersTokens.indexOf(userToken));
    }

    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        const userToken = this.usersTokens.find((usertoken) => usertoken.refresh_token === refresh_token);
        return userToken;
    }
}

export { UsersTokensRepositoryInMemory };