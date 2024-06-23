import express from 'express';
import { alleTodosHolen, todoHinzufuegen, todoAktualisieren, todoAbrufen } from '../controller/todoController.js';

const router = express.Router();

router.get('/todos', alleTodosHolen);
router.post('/todos', todoHinzufuegen);
router.put('/todos/:id', todoAktualisieren);
router.get('/todos/:id', todoAbrufen);

export default router;
