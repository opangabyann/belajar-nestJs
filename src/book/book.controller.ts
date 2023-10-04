import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  // Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateDto, FindBookDto, UpdateBookDto } from './book.dto';
import { Pagination } from 'src/utils/decorator/pagination.dto';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get('list')
  getAllBook(@Pagination() query: FindBookDto) {
    console.log('query', query);
    return this.bookService.getAllBook(query);
  }

  @Post('create')
  createBook(@Body() payload: CreateDto) {
    return this.bookService.create(payload);
    // return payload;
  }

  @Get('detail/:id')
  getDetailBook(@Param('id') id: string) {
    return this.bookService.getDetail(Number(id));
  }

  @Delete('delete/:id')
  deleteBook(@Param('id') id: string) {
    return this.bookService.delete(+id);
  }

  @Put('update/:id')
  updateBook(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.updateBook(Number(id), updateBookDto);
  }
}
