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
import { ProdukService } from './produk.service';
import {
  CreateProdukArrayDto,
  UpdateProdukDto,
  findAllProduk,
} from './produk.dto';
import { JwtGuard } from '../auth/auth.guard';
import { Pagination } from 'src/utils/decorator/pagination.dto';
import { InjectUpdatedBy } from 'src/utils/decorator/inject-updated_by.decorator';

@UseGuards(JwtGuard)
@Controller('produk')
export class ProdukController {
  constructor(private produkService: ProdukService) {}

  @Post('create-bulk')
  async createBulk(@Body() payload: CreateProdukArrayDto) {
    return this.produkService.createBulk(payload);
  }

  @Get('list')
  async findAll(@Pagination() query: findAllProduk) {
    return this.produkService.findAll(query);
  }

  @Get('detail/:id')
  getDetailKategori(@Param('id') id: string) {
    return this.produkService.getDetail(Number(id));
  }

  @Put('update/:id')
  updateKategori(
    @Param('id') id: string,
    @InjectUpdatedBy() updateKategoriDto: UpdateProdukDto,
  ) {
    return this.produkService.updateKategori(Number(id), updateKategoriDto);
  }

  @Delete('delete/:id')
  deleteKategori(@Param('id') id: string) {
    return this.produkService.deleteProduk(+id);
  }
}
