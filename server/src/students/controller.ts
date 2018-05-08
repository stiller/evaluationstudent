import { Authorized, BadRequestError, Body, Delete, Get, HttpCode, JsonController, NotFoundError, Param, Patch, Post } from "routing-controllers";
  import Student from "./entities";
  import Batch from "../batches/entities";
  
  @JsonController()
  export default class StudentController {
  
    //@Authorized()
    @Post('/batches/:id([0-9]+)/students')
    @HttpCode(201)
    async createStudent(
      @Body() student: Student,
      @Param('id') batchId: number
    ) {
      const batch = await Batch.findOneById(batchId)
      if(!batch) throw new BadRequestError("Batch doesn't exist.")
  
      const createdStudent = await Student.create({...student, batch}).save()
  
      return createdStudent
    }

    @Get('/batches/:id([0-9]+)/students')
    @HttpCode(200)
     getStudents() {
      return Student.find()
    }
  
    //@Authorized()
    @Get('/students/:id([0-9]+)')
    async getStudent(
      @Param('id') studentId: number
    ) {
        const student = await Student.findOneById(studentId)
        if(!student) throw new NotFoundError('Student not found.')
  
      return student
    }
  
    //@Authorized()
    @Patch('/students/:id([0-9]+)')
    async updateStudent(
      @Body() update: Partial<Student>,
      @Param('id') studentId: number
    ) {
      const student = await Student.findOneById(studentId)
      if(!student) throw new NotFoundError('Student not found.')
  
      return Student.merge(student, update)
    }

  
    //@Authorized()
    @Delete('/students/:id([0-9]+)')
    async deleteStudent(
      @Param('id') studentId: number
    ) {
      const student = await Student.findOneById(studentId)
      if(!student) throw new NotFoundError('Student not found.')
  
      await student.remove()

      return { id: studentId }
    }
  
  }



