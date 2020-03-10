const { exec } = require('child_process');
const fs = require('fs')

class MountUsb {
    constructor(dir, drive){
        this.drive = drive;
        this.dir = dir;        
    }
    mount(){
        return new Promise((resolve, reject) =>{
            if(fs.existsSync(this.dir) == true){
                reject(`mount: ? ${this.dir} Exists`);
            } 
            
            // $ 'mkthis.dir ${this.dir}'
            fs.mkdirSync(this.dir);

            // $ 'mount /dev/${this.drive} ${this.dir}'
            let child = exec(`mount /dev/${this.drive} ${this.dir}`, (error,stdout, stderr) =>{
                if(error){
                    reject(error);
                }
            })
            child.on('close', (code) => {
                resolve(`close:${code.toString()}`);
            }); 
        });
    }
    unmount(){
        return new Promise((resolve, reject) =>{
            if(fs.existsSync(this.dir) == false){
                reject(`unmount:? ${this.dir}`);
            }
            let child = exec(`umount ${this.dir}`, (error,stdout, stderr) =>{
                if(error){
                    reject(error);
                }
            })
            child.on('close', (code) => {
                resolve(`close:${code.toString()}`);
            });  
        });
    }
    clean(){
        return new Promise((resolve, reject) =>{
            if(fs.existsSync(this.dir) == false){
                resolve(`unmount:? ${this.dir}`);
            }
            let child = exec(`rm -rf ${this.dir}`, (error,stdout, stderr) =>{
                if(error){
                    reject(error);
                }
            })
            child.on('close', (code) => {
                resolve(`close:${code.toString()}`);
            });            
        })
    }
}

export default MountUsb;
    