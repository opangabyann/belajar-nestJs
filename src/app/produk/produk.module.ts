import { Module } from '@nestjs/common';
import { ProdukController } from './produk.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produk } from './produk.entity';
import { ProdukService } from './produk.service';

@Module({
  imports: [TypeOrmModule.forFeature([Produk])],
  providers: [ProdukService],
  controllers: [ProdukController],
})
export class ProdukModule {}
