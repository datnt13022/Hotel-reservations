import { ApiProperty } from "@nestjs/swagger";

export class ByRangeDateDto{
    @ApiProperty()
    startDate :string
    @ApiProperty()
    endDate :string
}