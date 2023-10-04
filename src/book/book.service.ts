import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Between, Like, Repository } from 'typeorm';
import { CreateDto, FindBookDto, UpdateBookDto } from './book.dto';
import { ResponsePagination, ResponseSuccess } from 'src/interface/response';
import BaseResponse from 'src/utils/response/base.response';

@Injectable()
export class BookService extends BaseResponse {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {
    super();
  }

  async getAllBook(query: FindBookDto): Promise<ResponsePagination> {
    const { page, pageSize, limit, title, author, to_year, from_year } = query;
    // const books = await this.bookRepository.find();
    const filter: {
      [key: string]: any;
    } = {};

    if (title) {
      filter.title = Like(`%${title}%`);
    }
    if (author) {
      filter.author = Like(`%${author}%`);
    }

    if (from_year && to_year) {
      filter.year = Between(from_year, to_year);
    }

    if (from_year && !!to_year === false) {
      filter.year = Between(from_year, from_year);
    }
    const books = await this.bookRepository.find({
      where: filter,
      skip: limit,
      take: Number(pageSize),
    });

    const total = await this.bookRepository.count({ where: filter });

    return this._pagination('berhasil', books, total, page, pageSize);
  }

  async create(payload: CreateDto): Promise<ResponseSuccess> {
    try {
      await this.bookRepository.save(payload);

      return this._success('berhasil', payload);
    } catch (error) {
      throw new HttpException('Ada kesalahan', HttpStatus.BAD_REQUEST);
    }
  }

  async getDetail(id: number): Promise<ResponseSuccess> {
    const detailBook = await this.bookRepository.findOne({
      where: {
        id,
      },
    });
    return {
      status: 'Success',
      message: 'List Buku ditermukan',
      data: detailBook,
    };
  }

  async delete(id: number): Promise<ResponseSuccess> {
    const check = await this.bookRepository.findOne({
      where: {
        id,
      },
    });

    if (!check)
      throw new NotFoundException(`Buku dengan id ${id} tidak ditemukan`);
    await this.bookRepository.delete(id);
    return {
      status: `Success `,
      message: 'Berhasil menghapus buku',
    };
  }

  async updateBook(
    id: number,
    updateBookDto: UpdateBookDto,
  ): Promise<ResponseSuccess> {
    const check = await this.bookRepository.findOne({
      where: {
        id,
      },
    });

    if (!check)
      throw new NotFoundException(`Buku dengan id ${id} tidak ditemukan`);

    const update = await this.bookRepository.save({ ...updateBookDto, id: id });
    return {
      status: `Success `,
      message: 'Buku berhasil di update',
      data: update,
    };
  }
}
