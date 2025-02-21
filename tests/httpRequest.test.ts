// import * as http from "http";
// import { httpGet } from "../src/utils/ajax";

// describe("Http Request", () => {
//     const PORT = 3001;
//     const url = `http://localhost:${PORT}`;

//     let httpServer: http.Server | null;

//     beforeAll(() => {
//         httpServer = http.createServer((req, res) => {
//             if (req.url === "/api") {
//                 res.statusCode = 200;
//                 res.end(req.method);
//             }

//             if (req.url === "/error") {
//                 res.statusCode = 500;
//                 res.end();
//             }
//         });

//         httpServer.listen(PORT, () => {});
//     });

//     afterAll(() => {
//         httpServer?.close();
//     });

//     it("should send basic success requests", async () => {
//         let res = await httpGet(url);

//         console.log(res);
//     });
// });
