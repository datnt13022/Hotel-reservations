import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '@src/prisma/prisma.service';
import { RoomDto } from './dto';

@Injectable()
export class RoomService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}
  async getAllRoom(role: number): Promise<any> {
    if (role != 0) throw new ForbiddenException('Permission denied!');
    const room = await this.prisma.room.findMany();
    return room;
  }
  async createRoom(role: number, roomDto: RoomDto): Promise<any> {
    if (role != 0) throw new ForbiddenException('Permission denied!');
    const room = await this.prisma.room
      .create({
        data: {
          type: roomDto.type,
          description: roomDto.description,
          image: roomDto.image,
          quantity: roomDto.quantity,
          price: roomDto.price,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('error !');
          }
        }
        throw error;
      });
    return { message: 'Created !' };
  }
  async editRoom(role: number, id: number, roomDto: RoomDto): Promise<any> {
    if (role != 0) throw new ForbiddenException('Permission denied!');
    const updateRoom = await this.prisma.room
      .update({
        where: {
          id: Number(id),
        },
        data: {
          type: roomDto.type,
          description: roomDto.description,
          image: roomDto.image,
          quantity: roomDto.quantity,
          price: roomDto.price,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            throw new ForbiddenException('Id Not Found !');
          }
        }
        throw error;
      });
    return { message: 'Updated !' };
  }
  async deleteRoom(role: number, id: number): Promise<any> {
    if (role != 0) throw new ForbiddenException('Permission denied!');
    const deleteRoom = await this.prisma.room.delete({
      where: {
        id: Number(id),
      },
    }).catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
              if (error.code === 'P2025') {
            throw new ForbiddenException('Id Not Found !');
          }
        }
        throw error;
      });
    return { message: 'Deleted !' };
  }
  
}
