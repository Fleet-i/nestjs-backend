import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { CreateStudentDto } from 'src/dto/create-student.dto';
import { CreateBookDto } from './create-book.dto';
import { IBook } from './book.interface';
import { Model } from "mongoose";
import { UpdateBookDto } from './update-book.dto';
@Injectable()
export class BookService {
constructor(@InjectModel('Booking') private bookModel:Model<IBook>) { }
async createBooking(createBookDto: CreateBookDto): Promise<IBook> {
   const newBooking = await new this.bookModel(createBookDto);
   return newBooking.save();
}
async updateStudent(bookId: string, updateBookDto: UpdateBookDto): Promise<IBook> {
    const existingBooking = await this.bookModel.findByIdAndUpdate(bookId, updateBookDto, { new: true });
   if (!existingBooking) {
     throw new NotFoundException(`Booking #${bookId} not found`);
   }
   return existingBooking;
}
async getAllBookings(): Promise<IBook[]> {
    const bookData = await this.bookModel.find();
    if (!bookData || bookData.length == 0) {
        throw new NotFoundException('Booking data not found!');
    }
    return bookData;
}
// async getStudent(studentId: string): Promise<IBook> {
//    const existingStudent = await     this.bookModel.findById(studentId).exec();
//    if (!existingStudent) {
//     throw new NotFoundException(`Student #${studentId} not found`);
//    }
//    return existingStudent;
// }
// async deleteStudent(studentId: string): Promise<IBook> {
//     const deletedStudent = await this.bookModel.findByIdAndDelete(studentId);
//    if (!deletedStudent) {
//      throw new NotFoundException(`Student #${studentId} not found`);
//    }
//    return deletedStudent;
}
