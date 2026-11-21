import { IsNotEmpty, IsString, IsIn } from "class-validator";

export class LookupDto {
  @IsString() @IsNotEmpty() admissionNumber!: string;
}

export class VerifyLoginDto {
  @IsString() @IsNotEmpty() admissionNumber!: string;
  @IsString() @IsNotEmpty() answer!: string;
  @IsIn(["yearOfBirth", "firstName", "middleName", "lastName"]) type!: "yearOfBirth" | "firstName" | "middleName" | "lastName";
}

export class LoginDto {
  @IsString() @IsNotEmpty() admissionNumber!: string;
  @IsString() @IsNotEmpty() yearOfBirth!: string;
}
export class AtcLoginDto {
  @IsString() @IsNotEmpty() admissionNumber!: string;
  @IsString() @IsNotEmpty() password!: string;
}
