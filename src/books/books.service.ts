import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';

@Injectable()
export class BooksService {
  private books: any[] = [];

  getBooks(filter: FilterBookDto): any[] {
    const { title, author, category, min_year, max_year } = filter;
    const books = this.books.filter((book) => {
      if (title && book.title !== title) {
        return false;
      }
      if (author && book.author !== author) {
        return false;
      }
      if (category && book.category !== category) {
        return false;
      }
      if (min_year && book.year < min_year) {
        return false;
      }
      if (max_year && book.year > max_year) {
        return false;
      }
      return true;
    });
    return books;
  }

  getBookById(id: string) {
    const bookIdx = this.findBookById(id);
    return this.books[bookIdx];
  }

  createBook(CreateBookDto: CreateBookDto) {
    const { title, author, category, year } = CreateBookDto;
    const book = { id: uuidv4(), title, author, category, year };
    this.books.push(book);
    return book;
  }

  updateBook(id: string, UpdateBookDto: UpdateBookDto) {
    const { title, author, category, year } = UpdateBookDto;
    const bookIdx = this.findBookById(id);
    this.books[bookIdx].title = title;
    this.books[bookIdx].author = author;
    this.books[bookIdx].category = category;
    this.books[bookIdx].year = year;
  }

  findBookById(id: string) {
    const bookIdx = this.books.findIndex((book) => book.id === id);
    if (bookIdx === -1) {
      throw new NotFoundException('Book not found');
    }
    return bookIdx;
  }

  deleteBook(id: string) {
    const bookIdx = this.findBookById(id);
    this.books.splice(bookIdx, 1);
  }
}
