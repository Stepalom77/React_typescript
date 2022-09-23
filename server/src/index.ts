import express, { Request, Response } from 'express'
import todosRoutes from './routes/todosRoutes'

const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 7000;

app.use('/api/v1', todosRoutes)

app.get('/', (req, res) => {
    res.send('Server up & running ✅');
  })

app.listen(PORT, () => console.log(`Listening on port:${PORT}`))