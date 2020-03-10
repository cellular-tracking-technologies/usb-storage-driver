import BlockDeviceCmd from '../block-device-cmd';
import MountUsb from '../mount-usb';

let cmd = new BlockDeviceCmd();

cmd.poll()
.then((devices) =>{
    console.log(devices)
}).catch((error) => {
    throw error;
});

let test = () => {
    return new Promise((resolve, reject) =>{
        let drive = new MountUsb("/mnt","sda1");
        
        drive.mount()
        .then((res)=>{
            console.log(`Mount: ok(${res})`);
            return drive.unmount();
        }).then((res) => {
            console.log(`Unmount: ok(${res})`);
            return drive.clean();
        }).then((res) =>{
            console.log(`Clean: ok(${res})`);
            resolve(res);
        }).catch((err) =>{
            reject(err);
        })

    });
}

test()
.then((res) =>{
    console.log(res);
}).catch((err) =>{
    console.log(err);
})





// sudo mkdir /mnt/sda1
// sudo mount -v /dev/sda1 /mnt/sda1