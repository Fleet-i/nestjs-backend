import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateBookDto, CreateBookDtoFromUI } from './create-book.dto';
import { UpdateBookDto } from './update-book.dto';
import { BookService } from './book.service';

@Controller('booking')
export class BookingController {
   constructor(private readonly BookService: BookService) { }
  @Post()
   async createBooking(@Res() response, @Body() createBookDto: CreateBookDtoFromUI) {
  try {
    // const newStudent = await this.BookService.createBooking({...createBookDto, status:"NEW"});
    // return response.status(HttpStatus.CREATED).json({
    // message: 'Student has been created successfully',
    // newStudent,});
      return response.status(HttpStatus.CREATED).json({
    message: 'Ok man'});
 } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode: 400,
    message: 'Error: Student not created!',
    error: 'Bad Request'
 });
 }
}
// @Put('/:id')
// async updateStudent(@Res() response,@Param('id') bookId: string,
// @Body() updateBookDto: UpdateBookDto) {
//   try {
//    const existingStudent = await this.BookService.updateStudent(bookId, updateBookDto);
//   return response.status(HttpStatus.OK).json({
//   message: 'Student has been successfully updated',
//   existingStudent,});
//  } catch (err) {
//    return response.status(err.status).json(err.response);
//  }
}
// @Get()
// async getStudents(@Res() response) {
// try {
//   const studentData = await this.BookService.getAllStudents();
//   return response.status(HttpStatus.OK).json({
//   message: 'All students data found successfully',studentData,});
//  } catch (err) {
//   return response.status(err.status).json(err.response);
//  }
// }
// @Get('/:id')
// async getStudent(@Res() response, @Param('id') studentId: string) {
//  try {
//     const existingStudent = await
// this.BookService.getStudent(studentId);
//     return response.status(HttpStatus.OK).json({
//     message: 'Student found successfully',existingStudent,});
//  } catch (err) {
//    return response.status(err.status).json(err.response);
//  }
// }
// @Delete('/:id')
// async deleteStudent(@Res() response, @Param('id') studentId: string)
// {
//   try {
//     const deletedStudent = await this.BookService.deleteStudent(studentId);
//     return response.status(HttpStatus.OK).json({
//     message: 'Student deleted successfully',
//     deletedStudent,});
//   }catch (err) {
//     return response.status(err.status).json(err.response);
//   }
//  }
