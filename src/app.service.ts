import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return process.env.PORT + ' \n' + process.env.RDS_HOSTNAME + ' \n' + process.env.RDS_PORT + ' \n' + process.env.RDS_USERNAME + ' \n' + process.env.RDS_PASSWORD + ' \n' + process.env.RDS_DB_NAME
  }
}
