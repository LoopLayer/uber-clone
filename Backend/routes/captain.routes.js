import {Router} from 'express';
import { verifyCaptain } from '../middleware/captainAuth.middleware.js';
import { getCaptainProfile, loginCaptain, logoutCaptain, registerCaptain } from '../controllers/captain.controller.js';

const router= Router();

// Import the controller functions  

router.route('/register').post(registerCaptain)
router.route('/login').post(loginCaptain)
router.route('/profile').get(verifyCaptain,getCaptainProfile)
router.route('/logout').post(verifyCaptain,logoutCaptain)

export default router;
