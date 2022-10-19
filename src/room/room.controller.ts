import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { GetCurrentUserRole } from '@src/auth/common/decorators';
import { RoomDto } from './dto';
import { RoomService } from './room.service';

@Controller('/v1/room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  getAllRoom(@GetCurrentUserRole() role: number): Promise<any> {
    return this.roomService.getAllRoom(role);
  }
  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  createRoom(
    @GetCurrentUserRole() role: number,
    @Body() roomDto: RoomDto,
  ): Promise<any> {
    return this.roomService.createRoom(role, roomDto);
  }
  @Post('/edit/:id')
  @HttpCode(HttpStatus.OK)
  editRoom(
    @GetCurrentUserRole() role: number,
    @Body() roomDto: RoomDto,
    @Param('id') id: number,
  ): Promise<any> {
    return this.roomService.editRoom(role, id, roomDto);
  }
  @Delete('/delete/:id')
  deleteRoom(
    @GetCurrentUserRole() role: number,
    @Param('id') id: number,
  ): Promise<any> {
    return this.roomService.deleteRoom(role,id);
  }
}
