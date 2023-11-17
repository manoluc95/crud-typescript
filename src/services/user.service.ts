import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { UserDTO } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";
import { Helpers } from "../config/helper";

export class UserService extends BaseService<UserEntity> {
  private static instance: UserService;

  private constructor() {
    super(UserEntity);
  }

  async findAllUser(): Promise<UserEntity[]> {
    return (await this.execRepository).find();
  }

  async findUserById(id: string): Promise<UserEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  async search(search: string) {
    if (!search) {
      throw new Error("Por favor enviar el dato search");
    }
    const user = (await this.execRepository)
      .createQueryBuilder()
      .where("username like :search", { search: `%${search}%` })
      .orWhere("email like :search", { search: `%${search}%` })
      .orWhere("name like :search", { search: `%${search}%` })
      .orWhere("city like :search", { search: `%${search}%` })
      .orWhere("state like :search", { search: `%${search}%` })
      .getMany();

    return user;
  }
  async findByEmail(email: string): Promise<UserEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where({ email })
      .getOne();
  }
  async findByUsername(username: string): Promise<UserEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where({ username })
      .getOne();
  }

  async createUser(body: UserDTO): Promise<UserEntity> {
    const newUser = (await this.execRepository).create(body);
    newUser.password = await Helpers.encryptPassword(newUser.password);
    return (await this.execRepository).save(newUser);
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  }

  async updateUser(id: string, infoUpdate: UserDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }

  async findUserWithRelation(id: string): Promise<UserEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.customer", "customer")
      .where({ id })
      .getOne();
  }

  public static getInstance(): UserService {
    return !UserService.instance ? new UserService() : UserService.instance;
  }
}

export const userServiceSingleton = UserService.getInstance();
