import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class SelectionDto {
  @IsString()
  @IsNotEmpty()
  positionId!: string;

  @IsString()
  @IsNotEmpty()
  candidateId!: string;
}

export class SubmitBallotDto {
  @IsString()
  @IsNotEmpty()
  electionId!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SelectionDto)
  selections!: SelectionDto[];
}