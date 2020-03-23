import UsbStorage from "../usb-storage"
const fs = require('fs')


function testCopy(){
    let usb = new UsbStorage();

    usb.mount().
    then(()=>{
        console.log("Mount ok");
        usb.copyTo("/data", /.*(data|rotated|SG_files|uploaded|ctt|sg|.csv|.csv.gz|.tar.gz)$/, (err) =>{
            if(err){
                console.log(err);
            }
        });
        return usb.unmount();
    }).then(()=>{
        console.log("Done!");
    }).catch((res)=>{
        console.log(`Mount error ${res}`);
    })
}

function testWifi(){
    let usb = new UsbStorage();
    usb.mount().
    then(()=>{
        console.log("Mount ok");

        const src = "wifi/credentials.json";
        const dest = "src/test/credentials.json";
        usb.copyFrom(src, dest, (err) =>{
            if(err){
                console.log(err);
            }else{
            var wifi = JSON.parse(fs.readFileSync(dest, 'utf8'));
           
                console.log(wifi.ssid);
                console.log(wifi.psk);
                console.log(wifi.country);

                console.log(wifi);
            }
        });
        return usb.unmount();
    }).then(()=>{
        console.log("Done!");
    }).catch((res)=>{
        console.log(`Mount error ${res}`);
    })
}

// testCopy();
// testWifi();

// sudo mkdir /mnt/sda1
// sudo mount -v /dev/sda1 /mnt/sda1


