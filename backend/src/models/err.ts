import { Response } from "express";

export default class Err {
  constructor(private _status: number, private _message: string) {}

  get status() {
    return this._status;
  }

  get message() {
    return this._message;
  }
}

export const returnError = (res: Response, error: any) => {
  if (error instanceof Err) {
    res.status(error.status);
    res.json({ error: error.message });
  } else {
    res.json({ error });
  }
};
