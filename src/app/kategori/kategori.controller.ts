import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { KategoriService } from './kategori.service';
import {
  CreateKategorArrayDto,
  CreateKategoriDto,
  UpdateKategoriDto,
  findAllKategori,
} from './kategori.dto';
import { JwtGuard } from '../auth/auth.guard';
import { Pagination } from 'src/utils/decorator/pagination.dto';
import { InjectCreatedBy } from 'src/utils/decorator/inject-created_by.decorator';
import { UpdateBookDto } from 'src/book/book.dto';
import { InjectUpdatedBy } from 'src/utils/decorator/inject-updated_by.decorator';

@UseGuards(JwtGuard) //  implementasikan global guard pada semua endpont kategori memerlukan authentikasi saat request
@Controller('kategori')
export class KategoriController {
  constructor(private kategoriService: KategoriService) {}

  @Post('create')
  async create(@InjectCreatedBy() payload: CreateKategoriDto) {
    return this.kategoriService.create(payload);
  }

  @Post('create-bulk')
  async createBulk(@Body() payload: CreateKategorArrayDto) {
    return this.kategoriService.createBulk(payload);
  }

  @Get('list')
  async getAllCategory(@Pagination() query: findAllKategori) {
    //gunakan custom decorator yang pernah kita buat
    return this.kategoriService.getAllCategory(query);
  }

  @Get('detail/:id')
  getDetailKategori(@Param('id') id: string) {
    return this.kategoriService.getDetail(Number(id));
  }

  @Put('update/:id')
  updateKategori(
    @Param('id') id: string,
    @InjectUpdatedBy() updateKategoriDto: UpdateKategoriDto,
  ) {
    return this.kategoriService.updateKategori(Number(id), updateKategoriDto);
  }

  @Delete('delete/:id')
  deleteKategori(@Param('id') id: string) {
    return this.kategoriService.deleteKategori(+id);
  }
}
