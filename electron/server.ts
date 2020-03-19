import * as http from 'http'
import { stringify } from 'querystring';

const onvif = require('node-onvif')
const Cam = require('onvif').Cam

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
    'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
    'Access-Control-Max-Age': 2592000,
}

const server = http.createServer(async(req: http.IncomingMessage, res: http.ServerResponse) => {
    if (req.method === 'OPTIONS') {
        res.writeHead(204, headers)
        res.end()
        return;
    }

    switch (req.url) {
        case "/snapshot":
            let reqData:string = ''
            if (req.method === "POST") {
                req.setEncoding('utf8')
                req.on('data', (chunk:any) => {
                    reqData += chunk
                }).on('end', () => {
                    getSnapshot(reqData, res)
                })
            } else {
                getSnapshot(reqData, res)
            }
            break;
        default:
            res.writeHead(200, {'Content-Type': 'text/plan'})
            res.write("camera")
            res.end()
            break;
    }
});

const getSnapshot = async(data: any, res: http.ServerResponse) => {
    let params = JSON.parse(data)
    let snapShotHeaders:any = Object.assign({}, headers) 
    snapShotHeaders['Content-Type'] = 'image/jpeg'
    res.writeHead(200, snapShotHeaders);
    let image = null
    let device = new onvif.OnvifDevice({
        /*
        xaddr: 'http://192.168.3.249:8080/onvif/device_service',
        user: 'admin',
        pass: 'admin'
        */
        xaddr: params.xaddr,
        user: params.username,
        pass: params.password
    })

    await device.init().then(() => {
        return device.fetchSnapshot()
    }).then((data:any) => {
        //fs.writeFileSync('snapshot.jpg', res.body, { encoding: 'binary'})
        image = data.body
    }).catch((error:any) => {
        console.error(error)
    })
    res.write(image)
    res.end()
}

export default server
