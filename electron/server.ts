import * as http from 'http'
import { stringify } from 'querystring';

const onvif = require('node-onvif')
const Cam = require('onvif').Cam

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
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
        default:
            break;
    }

    //res.write(image)
    /*
    switch (req.url) {
        case "/snapshot":
            new Cam({
                hostname: '192.168.3.249',
                port: 8080,
                username: 'admin',
                password: 'admin'
            }, function(this:any, err:any) {
                msg = "snapshot";
                this.getSnapshotUri({}, (err:any, data:any) => {
                    console.log(err)
                    console.log(data)

                })
            })
            console.log("E")
            break;
        case "/snapshot2":
            let device = new onvif.OnvifDevice({
                xaddr: 'http://192.168.3.249:8080/onvif/device_service',
                user: 'admin',
                pass: 'admin'
            })
        
            await device.init().then(() => {
                console.log('fetching the data of the snapshot...')
                return device.fetchSnapshot()
            }).then((data:any) => {
                //fs.writeFileSync('snapshot.jpg', res.body, { encoding: 'binary'})
                console.log('done')
                res.write(data.body)

            }).catch((error:any) => {
                console.error(error)
            })
            console.log("A")
            break;
    }
    */
});

const getSnapshot = async(data: any, res: http.ServerResponse) => {
    let snapShotHeaders:any = Object.assign({}, headers) 
    snapShotHeaders['Content-Type'] = 'image/jpeg'
    res.writeHead(200, snapShotHeaders);
    let image = null
    /*
            new Cam({
                hostname: '192.168.3.249',
                port: 8080,
                username: 'admin',
                password: 'admin'
            }, function(this:any, err:any) {
                this.getSnapshotUri({}, (err:any, data:any) => {
                    console.log(err)
                    console.log(data)

                })
            })
            */
    let device = new onvif.OnvifDevice({
        xaddr: 'http://192.168.3.249:8080/onvif/device_service',
        user: 'admin',
        pass: 'admin'
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
