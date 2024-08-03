## FomoFactory Assignment
Project created as assignment, by [Kaustubhai](https://github.com/kaustubhai)

### Features
#### Backend
1. Integration with LiveCoinWatch API
2. SSE endpoint to provide live price of coins

#### Frontend
3. Responsive Frontend UI
4. Live update on price update

### How to run locally
1. Create a env file, take inspiration from `example.env` file
2. Make sure PORT 3000 and 5000 are empty
3. Run `npm install` on root to load backend dependencies
4. Run `npm install --prefix client` on root to load frontend dependencies
5. Finally run `npm run dev`
6. This should bring up your app on [localhost:3000](http://localhost:3000)
7. Your application API will be live on [localhost:5000](http://localhost:5000)

### To get LiveCoinWatch API key
1. Go to official site, [here](https://www.livecoinwatch.com/tools/api#try)
2. Create your Account
3. Generate your API KEY
4. Use this in your .env
5. To Kickstart your process, I have hard-coded my key. Feel free to use it