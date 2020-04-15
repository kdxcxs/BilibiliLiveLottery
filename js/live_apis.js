// cx@kdxcxs.com
// |/  |¯\ \/ |¯ \/ |¯  
// |¯\ |_/ /\ |_ /\  ¯| 
//                   ¯  
// https://github.com/lovelyyoshino/Bilibili-Live-API/blob/master/API.WebSocket.md

const textEncoder = new TextEncoder('utf-8');
const textDecoder = new TextDecoder('utf-8');

const readInt = function (buffer, start, len) {
    let result = 0
    for (let i = len - 1; i >= 0; i--) {
        result += Math.pow(256, len - i - 1) * buffer[start + i]
    }
    return result
}

const writeInt = function (buffer, start, len, value) {
    let i = 0
    while (i < len) {
        buffer[start + i] = value / Math.pow(256, len - i - 1)
        i++
    }
}

const encode = function (str, op) {
    let data = textEncoder.encode(str);
    let packetLen = 16 + data.byteLength;
    let header = [0, 0, 0, 0, 0, 16, 0, 1, 0, 0, 0, op, 0, 0, 0, 1]
    writeInt(header, 0, 4, packetLen)
    return (new Uint8Array(header.concat(...data))).buffer
}
const decode = function (blob) {
    return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let buffer = new Uint8Array(e.target.result)
            let result = {}
            result.packetLen = readInt(buffer, 0, 4)
            result.headerLen = readInt(buffer, 4, 2)
            result.ver = readInt(buffer, 6, 2)
            result.op = readInt(buffer, 8, 4)
            result.seq = readInt(buffer, 12, 4)
            if (result.op === 5) {
                result.body = []
                let offset = 0;
                while (offset < buffer.length) {
                    let packetLen = readInt(buffer, offset + 0, 4)
                    let headerLen = 16// readInt(buffer,offset + 4,4)
                    let data = buffer.slice(offset + headerLen, offset + packetLen);
                    let body = textDecoder.decode(data);
                    if (body) {
                        result.body.push(JSON.parse(body));
                    }
                    offset += packetLen;
                }
            } else if (result.op === 3) {
                result.body = {
                    count: readInt(buffer, 16, 4)
                };
            }
            resolve(result)
        }
        reader.readAsArrayBuffer(blob);
    });
}

function connect(roomid) {
    window.ws = new WebSocket('wss://broadcastlv.chat.bilibili.com:2245/sub');
    ws.onopen = function () {
        ws.send(encode(JSON.stringify({
            roomid: roomid
        }), 7));
    };
    setInterval(function () {
        ws.send(encode('', 2));
    }, 30000);
    ws.onmessage = async function (msgEvent) {
        const packet = await decode(msgEvent.data);
        switch (packet.op) {
            case 8:
                console.log('已加入房间'+roomid.toString());
                break;
            case 5:
                packet.body.forEach((body) => {
                    if (body.cmd === 'DANMU_MSG') {
                        appendViewer(body.info);
                    }
                })
                break;
        }
    };
}
