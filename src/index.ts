import express from 'express'
import {mongooseConnectMongo} from './mongodb'
import cors from 'cors'
import path from 'path'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/api', require('./routes/currency/currency.routes'))
app.use('/api', require('./routes/expense/expense.routes'))
app.use('/api', require('./routes/expense-category/expense-category.routes'))
app.use('/api', require('./routes/income/income.routes'))
app.use('/api', require('./routes/income-category/income-category.routes'))
app.use('/api', require('./routes/main-expense/main-expense.routes'))
app.use('/api', require('./routes/main-income/main-income.routes'))
app.use('/api', require('./routes/report/report.routes'))
app.use('/api', require('./routes/project/project.routes'))
app.use('/api', require('./routes/user/user.routes'))

const PORT = process.env.NODE_ENV === 'production' ? 80 : 5000;

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, '..', '..', 'budget-manager-frontend', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', '..', 'budget-manager-frontend', 'build', 'index.html'))
    })
}

(async function() {
    try {
        await mongooseConnectMongo()
        app.listen(PORT, () => console.info(`Server has been started on port ${PORT}`))
    } catch (e: any) {
        console.error(`Server Error: ${e.message}`)
        process.exit(1)
    }
})()
