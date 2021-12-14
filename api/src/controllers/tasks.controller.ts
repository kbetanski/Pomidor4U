import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiResponseProperty,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Task } from 'src/models/task.model';

import { TasksService } from 'src/services/tasks.service';
import { UsersService } from 'src/services/users.service';

@UseGuards(JwtAuthGuard)
@Controller('api/tasks')
@ApiBearerAuth()
@ApiTags('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly usersService: UsersService,
  ) {}

  @Get(':id')
  @ApiResponse({ type: Task })
  @ApiParam({ name: 'id', required: true })
  public async task(@Request() req, @Param() params): Promise<Task> {
    const userId = req.user.id;
    const taskId = parseInt(params.id);

    const task = await this.tasksService.task({
      where: { id: taskId, AND: { userId } },
    });

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  @Get()
  @ApiResponse({ isArray: true, type: Task })
  public async tasks(@Request() req): Promise<Task[]> {
    const userId = req.user.id;

    const tasks = await this.tasksService.tasks({ where: { userId } });

    if (tasks.length === 0) {
      throw new NotFoundException();
    }

    return tasks;
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true })
  @ApiResponseProperty({ type: Task })
  public async delete(@Param() params): Promise<Task> {
    const taskId = parseInt(params.id);

    return this.tasksService.deleteTask({ id: taskId });
  }

  @Post()
  @ApiBody({ type: Task })
  @ApiResponse({ type: Task })
  public async create(@Request() req, @Body() data: Task): Promise<Task> {
    const user = await this.usersService.user({ id: req.user.id });

    return this.tasksService.createTask({
      title: data.title,
      content: data.content,
      finished: data.finished,
      user: { connect: { id: user.id } },
    });
  }

  @Patch(':id')
  @ApiParam({ name: 'id', required: true })
  public async update(
    @Body() data: Task,
    @Param() params,
    @Request() req,
  ): Promise<Task> {
    const taskId = parseInt(params.id);

    const task = await this.tasksService.task({
      where: { id: taskId, AND: { userId: req.user.id } },
    });

    if (!task) {
      throw new NotFoundException();
    }

    return this.tasksService.updateTask({ data, where: { id: task.id } });
  }
}
