import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from '@src/auth/common/decorators';
import { BookingService } from './booking.service';
import { BydateDto } from './dto';
import { BookRoomDto } from './dto/bookRoom.dto';
import { ByRangeDateDto } from './dto/getByRangeDate.dto';

@Controller('/v1/booking')
@ApiTags('v1/booking')

export class BookingController {
    constructor(private bookingService: BookingService) {}
    @Get('/:date')
    getAvailableRoomByDate(@Param('date') date:string):Promise<any>{
        return this.bookingService.getAvailableRoomByDate(date);
    }
    @Post('/range')
    getAvailableRoomByRange(@Body() byRangeDateDto:ByRangeDateDto){
        return this.bookingService.getAvailableRoomByRange(byRangeDateDto);
    }
    @Post('/cancel/:id')
    cancelBooking(
    @Param('id') idBooking:number
    ,@GetCurrentUserId() userId: number):Promise<any>{
        return this.bookingService.cancelBooking(idBooking,userId);
    }
    @Post('/book')
    bookRoom(@Body() bookRoomDto:BookRoomDto):Promise<any>{
        return this.bookingService.bookRoom(bookRoomDto);
    }
    @Post('/edit/:id')
    editBooking(    
    @Param('id') idBooking:number,
    @Body() bookRoomDto:BookRoomDto
    ,@GetCurrentUserId() userId: number):Promise<any>{
        return this.bookingService.editBooking(idBooking,userId,bookRoomDto);

    }
}
