//router index file
import { Router } from 'express';
import { UserController } from '../controllers';

const router = Router();

router.get('/auth/kakao', UserController.redirectURI);
router.get('/auth/kakao/callback', UserController.getToken);

export default router;