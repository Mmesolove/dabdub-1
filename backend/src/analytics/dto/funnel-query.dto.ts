import { IsOptional, IsDateString, IsEnum } from 'class-validator';
import { PaymentNetwork } from '../../payments/entities/payment.entity';

export class FunnelQueryDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsEnum(PaymentNetwork)
  network?: PaymentNetwork;
}