import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PillService } from './pill.service';
import { CreatePillDto, SearchPillDto, UpdatePillDto } from './dtos';
import { Protected, Roles } from 'src/decorator';
import { UserRoles } from '../enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('pills')
export class PillController {
  constructor(private readonly pillService: PillService) {}

  @ApiBearerAuth()
  @Get()
  @Protected(true)
  @Roles([UserRoles.ADMIN])
  async getAll() {
    return await this.pillService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @Protected(true)
  @Roles([UserRoles.ADMIN])
  async getById(@Param('id') id: number) {
    return await this.pillService.findOne({ id });
  }

  @ApiBearerAuth()
  @Post()
  @Protected(true)
  @Roles([UserRoles.ADMIN])
  async createPill(@Body() payload: CreatePillDto) {
    return await this.pillService.create(payload);
  }

  @ApiBearerAuth()
  @Put(':id')
  @Protected(true)
  @Roles([UserRoles.ADMIN])
  async updatePill(@Param('id') id: number, @Body() payload: UpdatePillDto) {
    return await this.pillService.update({ id, payload });
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Protected(true)
  @Roles([UserRoles.ADMIN])
  async deletePill(@Param('id') id: number) {
    return await this.pillService.delete({ id });
  }

  @ApiBearerAuth()
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get("search")
  @Protected(false)
  async searchPill(@Query() payload: SearchPillDto) {
    console.log('payload', payload);
    
    return await this.pillService.searchPill(payload);
  }
}
