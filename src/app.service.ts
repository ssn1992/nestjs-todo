import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return process.env.RDS_HOSTNAME + ' ' + process.env.RDS_PORT + ' ' + process.env.RDS_USERNAME + ' ' + process.env.RDS_PASSWORD + ' ' + process.env.RDS_DB_NAME
  }
}
