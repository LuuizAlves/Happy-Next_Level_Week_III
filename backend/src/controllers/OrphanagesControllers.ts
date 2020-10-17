import {Request, Response} from 'express';

import { getRepository } from 'typeorm';

import Orphanages from '../models/Orphanages';

import orphanageView from '../views/orphanage_view';

import * as Yup from 'yup';

export default {
    async index(req: Request, res: Response){
        const orphangesRepository = getRepository(Orphanages);

        const orphanages = await orphangesRepository.find({
            relations: ['images']
        });

        return res.json(orphanageView.renderMany(orphanages));
    },

    async show(req: Request, res: Response){
        const { id } = req.params;

        const orphangesRepository = getRepository(Orphanages);

        const orphanage = await orphangesRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return res.json(orphanageView.render(orphanage));
    },

    async create(req: Request, res: Response){
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = req.body;
    
        const orphangesRepository = getRepository(Orphanages);

        const requestImages = req.files as Express.Multer.File[];

        const images = requestImages.map( image => {
            return { path: image.filename};
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images
        };

        const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.string().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        })

        await schema.validate(data, {
            abortEarly: false,
        });

        const orphanage = orphangesRepository.create(data);
    
        await orphangesRepository.save(orphanage);
        return res.status(201).json(orphanage);
    }
}