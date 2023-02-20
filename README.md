### `install Node Js di server`
install https://nodejs.org/en/download/

### `Menjalankan React langsung`

cd ke folder applikasi
1. install mode-module sesuai dengan list di package.json --> npm install
2. jalankan applikasi --> npm start
Open [http://localhost:3000](http://localhost:3000) untuk menampilkan di browser.

### `Menjalankan React di PM2`

1. Build Applikasi --> npm run build
untuk build applikasi ke folder to the `build`.\
--See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

2. buat folder baru (frontend).
3. cd ke folder baru tsb. (cd frontend)
4. copy paste package.json dan package-lock.json ke folder baru tsb.
5. install mode-module sesuai dengan list di package.json --> npm install
6. copy paste folder `build` yang tadi sudah di compile. rename menjadi dist.
7. create file, di folder frontend --> server.js
dengan script: 

        `
            var express = require("express");
                        var serveStatic = require("serve-static");
                        var path = require("path");
                        app = express();
                        app.use(express.static(path.join(__dirname, "dist")));

                        app.get("/*", function (req, res) {
                        res.sendFile(path.join(__dirname, "dist", "index.html"));
                        });
                            //define port di sini
                        var port = process.env.PORT || 3000;
                        
                        app.listen(port);
                        console.log("server started " + port);
        `

          
                

8. pm2 start server.js --name test-app
