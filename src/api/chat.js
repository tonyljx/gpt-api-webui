const axios = require('axios');

const openaiUrl = 'https://api.openai.com/v1/chat/completions';
const apiKey = process.env.OPENAI_API_KEY;
const params = {
    "model": "gpt-3.5-turbo",
    "messages": [{ "role": "user", "content": "你是谁" }],
    "temperature": 0,
    "stream": true
};

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
        response.data.on('data', data => {
            const lines = data.toString().split('\n').filter(line => line.trim() !== '');
            for (const line of lines) {
                const message = line.replace(/^data: /, '');
                // console.log("message: ",message);
                if (message === '[DONE]') {
                    return; // Stream finished
                }
                try {
                    const parsed = JSON.parse(message);
                    // console.log(parsed.choices[0].text);
                    // console.log(parsed.choices);
                    console.log(parsed.choices[0].delta);

                    if('role' in  parsed.choices[0].delta){
                        console.log("角色是: ",parsed.choices[0].delta.role);
                    }

                    if('content' in parsed.choices[0].delta){
                        console.log("内容: ",parsed.choices[0].delta.content);
                    }
                } catch (error) {
                    console.error('Could not JSON parse stream message', message, error);
                }
            }
        });
    })
    .catch((error) => {
        if (error.response) {
            // 请求已发出，但服务器响应的状态码不在 2xx 范围内
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
    });
