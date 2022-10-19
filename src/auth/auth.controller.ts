import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Token } from './types';
import { GetCurrentUser, GetCurrentUserId, GetCurrentUserRole, Public } from './common/decorators';
import {  RtGuard } from './common/guards';
import { AdminFnDto } from './dto';

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
    @Public()
    @Post('/admin/login')
    adminLogin(@Body() authDto: AuthDto): Promise<Token> {
       return this.authService.adminLogin(authDto);
    }
    @Post('/admin/logout')
    @HttpCode(HttpStatus.OK)
    adminLogout(@GetCurrentUserId() userId: number):Promise<any>{
        return this.authService.logOut(userId);
    }
    @Post('/admin/create')
    @HttpCode(HttpStatus.OK)
    adminCreate(
        @GetCurrentUserRole()role:number,
        @Body() adminFnDto:AdminFnDto):Promise<any>{
        return this.authService.adminCreate(role,adminFnDto);
    }
    @Post('/admin/delete/:id')
    @HttpCode(HttpStatus.OK)
    adminDeleteById(
        @GetCurrentUserRole()role:number,
        @Param('id') id:number):Promise<any>{
        return this.authService.adminDeleteById(role,id);
    }
    @Get('/admin/user/all')
    @HttpCode(HttpStatus.OK)
    adminGetAllUser(@GetCurrentUserRole()role:number):Promise<any>{
        return this.authService.adminGetAllUser(role);
    }
}
