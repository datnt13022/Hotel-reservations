import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Token } from './types';
import { GetCurrentUser, GetCurrentUserId, Public } from './common/decorators';
import { AtGuard, RtGuard } from './common/guards';

@Controller('v1/auth')
export class AuthController {
    constructor(private authService:AuthService){}
    @Public()
    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    signUp(@Body() authDto:AuthDto):Promise<Token>{
        return this.authService.signUp(authDto);
    }
    @Public()
    @Post('/signin')
    @HttpCode(HttpStatus.OK)
    signIn(@Body() authDto:AuthDto):Promise<Token>{
        return this.authService.signIn(authDto);
    }
    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    logOut(@GetCurrentUserId() userId: number):Promise<any>{
        return this.authService.logOut(userId);
    }
    @Public()
    @UseGuards(RtGuard)
    @Post('/refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(
        @GetCurrentUserId() userId: number,
        @GetCurrentUser('refreshToken') refreshToken: string,
      ): Promise<Token> {
        return this.authService.refreshToken(userId, refreshToken);
    }
}
