import { Router } from 'express';
import multer from 'multer';

import OrphanagesControllers from './controllers/OrphanagesControllers';
import UploadConfig from './config/upload';

const routes = Router();
const upload = multer(UploadConfig);


routes.get('/orphanage/:id', OrphanagesControllers.show);
routes.get('/orphanages', OrphanagesControllers.index);
routes.post('/orphanages', upload.array('images'), OrphanagesControllers.create);

export default routes;