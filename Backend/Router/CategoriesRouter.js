import express from 'express';
import { admin, protect } from '../Middleware/Auth.js';
import {
  createCategory,
  deletedCategory,
  getAllCategoies,
  updatedCategory,
} from '../Controller/CategoriesController.js';

const router = express.Router();
// admin routes
    
router.get('/getAllCategories', getAllCategoies)
router.post('/createCategory', createCategory);
router.put('/:id/updateCategory', updatedCategory);
router.delete('/:id/deleteCategory', deletedCategory);
export default router;
