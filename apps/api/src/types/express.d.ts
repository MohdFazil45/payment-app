// src/types/express.d.ts
declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        name: string;
        number:string;
      };
    }
  }
}

export {};