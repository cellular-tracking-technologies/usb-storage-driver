// import BlockDeviceCmd from '../block-device-cmd';
// import MountUsb from '../mount-usb';

// let test = () => {
//     return new Promise((resolve, reject) =>{
//         let drive = new MountUsb("/mnt/usb","sda1");
        
//         // drive.unmount()
//         // .then((res) => {
//         //     console.log(`Unmount: ok(${res})`);
//         //     return drive.clean();
//         // }).then((res) =>{
//         //     console.log(`Clean: ok(${res})`);
//         //     resolve(res);
//         // }).catch((err) =>{
//         //     console.log("test catch");
//         //     reject(err);
//         // })

//         // let cmd = ;

//         new BlockDeviceCmd().poll()
//         .then((devices) =>{
//             console.log(devices)
//             return drive.mount()            
//         }).then((res)=>{
//             console.log(`Mount: ok(${res})`);
//             return drive.unmount();
//         }).then((res) => {
//             console.log(`Unmount: ok(${res})`);
//             return drive.clean();
//         }).then((res) =>{
//             console.log(`Clean: ok(${res})`);
//             resolve(res);
//         }).catch((err) =>{
//             reject(err);
//         })

//     });
// }

// test()
// .then((res) =>{
//     console.log(res);
// }).catch((err) =>{
//     console.log(err);
// })


import UsbStorage from "../usb-storage"

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

// sudo mkdir /mnt/sda1
// sudo mount -v /dev/sda1 /mnt/sda1


