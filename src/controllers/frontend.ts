
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';


export async function frontendRender(req: Request, res: Response) {
    const templatePath = path.resolve(__dirname, path.join('..', 'src', 'public', 'index.html'));
  
    fs.readFile(templatePath, 'utf8', (error, html) => {
      if (error) {
        console.log(error);
        return res.status(404).send({ message: 'Not found' });
      }
      // console.log(html);
      return res.send(html);
    });
  }