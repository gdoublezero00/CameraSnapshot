var 
    http = require('http'),
    Cam = require('onvif').Cam;

    /*
new Cam({
    hostname: '192.168.3.249',
    port: 8080,
    username: 'admin',
    password: 'admin'
}, function(err) {
    this.getStreamUri({protocol: 'RTSP', profileToken: ''}, function(err, stream) {
        http.createServer(function(req, res) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('<html><body>' +
            '<embed type="application/x-vlc-plugin" target="' + stream.uri + '"></embed>' +
            '<video src="' + stream.uri + '"></video>' +
            '</body></html>'
            );
        }).listen(3030);
    })
   console.log("A")
   let a = this.getSnapshotUri({}, function(data) {
       console.log(data)
   })
   console.log(a)
})
*/
let cam = new Cam({
    hostname: '192.168.3.249',
    port: 8080,
    username: 'admin',
    password: 'admin'
}, function(err) {
    msg = "snapshot";
this.getSnapshotUri({}, (err, data) => {
    console.log(err)
    console.log(data)
})
})