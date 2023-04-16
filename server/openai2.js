const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser')

const port = 3000;
const openaiUrl = 'https://api.openai.com/v1/chat/completions';
const apiKey = process.env.OPENAI_API_KEY;
// console.log(apiKey)
let clients = [];

const params = {
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": "你是谁"}],
    "temperature": 0,
    "stream": true
};

const app = express();
// parse application/json
app.use(bodyParser.json())
// 在 Express 应用中使用 cors 中间件
// 允许来自http://localhost:5173的跨域请求
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post('/api/sse', (req,res) => {
    // 通过引入bodypareser 这样我们可以解析body
    res.setHeader('Content-Type', 'text/event-stream')
    res.write('data: get?\n\n');
    setInterval(()=>{
        res.write("data: " + (new Date()) + "\n\n");
    },1000);
})

app.post('/api/stream',doResponse);

function doResponse(req, res) {
    // 流式
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    // res.writeHead(200);

    // 修改params
    params.messages[0].content = req.body.messages[0].content;
    console.log("参数: ",params);

    axios({
        method: 'post',
        url: openaiUrl,
        data: params,
        responseType: 'stream',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json' // 指定请求体的类型为 JSON
        },
        proxy: {
            host: 'localhost',
            port: 7890,
            protocol: 'http',
        },
    })
        .then(response => {
            let result = '';
            response.data.on('data', data => {
                const lines = data.toString().split('\n').filter(line => line.trim() !== '');
                for (const line of lines) {
                    const message = line.replace(/^data: /, '');
                    // console.log("message: ",message);
                    if (message === '[DONE]') {
                        // 通知客户端数据已经发送完成了
                        clients.forEach((client)=>{
                            res.write('data: [DONE]\n\n')
                            res.end();
                        })
                        res.end();
                        console.log("数据发送完成");
                        return; // Stream finished
                    }
                    try {
                        const parsed = JSON.parse(message);
                        // console.log(parsed.choices[0].delta);
                        if ('role' in parsed.choices[0].delta) {
                            console.log("角色是: ", parsed.choices[0].delta.role);
                        }

                        if ('content' in parsed.choices[0].delta) {
                            console.log("内容: ", parsed.choices[0].delta.content);
                            const result = parsed.choices[0].delta.content;
                            res.write(`data: ${JSON.stringify(result)}\n\n`);
                        }
                        result += parsed.choices[0].delta.content;
                    } catch (error) {
                        console.error('Could not JSON parse stream message', message, error);
                    }
                }
            });
            response.data.on('close',()=>{
                res.end();
            })
        })

        .catch((error) => {
            if (error.response) {
                // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                console.log(error.response.data);
                console.log(error.response.status);
                // console.log(error.response.headers);
                // res.status(error.response.status).send(error.response.data);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                res.status(500).send(error.message);
            }
            console.log(error.config);
        });
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


