export enum LogType {
  unknown = '[ Unknown Source ]',
  gulp = '[ GULP ]',
  server = '[ SERVER ]',
  mongodb = '[ MONGO-DB ]',
  route = '[ ROUTE ]',
  codeGen = '[ CODE-GEN ]'
}

export enum MongoMethod {
  save = '[ SAVE ]',
  find = '[ FIND ]',
  fineOne = '[ FIND-ONE ]',
  update = '[ FIND-AND-UPDATE ]',
  delete = '[ FIND-ANE-REMOVE ]'
}

export interface ErrorResponse {
  status: number;
  name: string;
  message: string;
}

export interface APIEndPoint {
  method: string;
  path: string;
}
