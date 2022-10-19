import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
    imports: [JwtModule.register({})], 
    controllers: [RoomController],
    providers: [RoomService]
})
export class RoomModule {}
