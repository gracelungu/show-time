import express from 'express';
import swagger from 'swagger-ui-express';
import YAML from 'yamljs';
import user from './user';

const router = express.Router();

router.use('/doc', swagger.serve, swagger.setup(YAML.load(`${__dirname}/doc.yaml`)));

router.use('/auth', user);
router.use('/user', user);

export default router;
