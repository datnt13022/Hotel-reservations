import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '@src/prisma/prisma.service';
import { encodePassword, isMatches } from '@src/utils/password';
import { AdminFnDto, AuthDto } from './dto';
import { JwtPayload, Token } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(authDto: AuthDto): Promise<Token> {
    const hash = await encodePassword(authDto.password);
    const user = await this.prisma.user
      .create({
        data: {
          email: authDto.email,
          hash,
          role: 1,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Email is exist !');
          }
        }
        throw error;
      });
    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }
  async signIn(authDto: AuthDto): Promise<Token> {
    const user = await this.prisma.user.findUnique({
        where: {
          email: authDto.email,
        },
      });
      if (!user) throw new ForbiddenException('User Not Found!');
      const passwordMatches = isMatches(authDto.password,user.hash);
      if (!passwordMatches) throw new ForbiddenException('Wrong Password!');
      const tokens = await this.getTokens(user.id, user.email,user.role);
      await this.updateRtHash(user.id, tokens.refresh_token);
      return tokens;
  }
  async logOut(userId: number): Promise<any> {
    await this.prisma.user.updateMany({
        where: {
          id: userId,
          rt_hash: {
            not: null,
          },
        },
        data: {
            rt_hash: null,
        },
      });
      return {message:"Logout Success",isLogout:true};
  }
  async refreshToken(userId: number, rt: string): Promise<Token> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.rt_hash) throw new ForbiddenException('Access Denied');
    const rtMatches = await isMatches(rt,user.rt_hash);
    if (!rtMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.email,user.role);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }
  async adminLogin(authDto: AuthDto): Promise<Token> {
    const user = await this.prisma.user.findUnique({
        where: {
          email: authDto.email,
        },
      });
      if (user?.role!=0) throw new ForbiddenException('Permission denied!');
      if (!user) throw new ForbiddenException('User Not Found!');
      const passwordMatches = isMatches(authDto.password,user.hash);
      if (!passwordMatches) throw new ForbiddenException('Wrong Password!');
      const tokens = await this.getTokens(user.id, user.email,user.role);
      await this.updateRtHash(user.id, tokens.refresh_token);
      return tokens;
  }
  async adminCreate(role:number,adminFnDto:AdminFnDto):Promise<any>{
    if (role!=0) throw new ForbiddenException('Permission denied!');
    const hash = await encodePassword(adminFnDto.password);
    const user = await this.prisma.user
      .create({
        data: {
          email: adminFnDto.email,
          hash,
          role: adminFnDto.role,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Email is exist !');
          }
        }
        throw error;
      });
    return {message:"Create Success!"};
  }
  async adminDeleteById(role:number,id:number):Promise<any>{
    if (role!=0) throw new ForbiddenException('Permission denied!');
    const deleteUser = await this.prisma.user.delete({
      where: {
        id: Number(id),
      },
    }).catch((error) => {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new ForbiddenException('User to delete does not exist !');
        }
      }
      throw error;
    });
    return {message:"Delete Success!"};
  }
  async adminGetAllUser(role:number){
    if (role!=0) throw new ForbiddenException('Permission denied!');
    const users = await this.prisma.user.findMany(
      {  select: {
           hash: false,
           rt_hash: false,
           id: true,
           createAt: true,
           updateAt: true,
           email: true,
           role: true
          }});

    return users;
  }
  async getTokens(userId: number, email: string, role: number): Promise<Token> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
      role: role,
    };
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('JWT_SECRET'),
        expiresIn: this.config.get<string>('EXPIRES_TIME'),
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.config.get<string>('EXPIRES_TIME_R'),
      }),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }
  async updateRtHash(userId: number, rt: string): Promise<void> {
    const hash = await encodePassword(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        rt_hash: hash,
      },
    });
  }
}
