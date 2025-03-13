import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {UserService} from "../../user/service/user.service";
import {ChatSimpleUser} from "../type/chat.simple.user";

@Injectable()
export class VideoChatService {
    constructor(private readonly userService: UserService) {
    }

    async getUserLoginAndAvatar(userId: number): Promise<ChatSimpleUser>{
        let user = await this.userService.getUserById(userId);
        if (!user) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
        return  {
            id: user.id,
            login: user.login,
            avatarPath: user.avatarPath
        }

    }

}