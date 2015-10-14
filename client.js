var DEBUG_UPDATE = true;
var DEBUG_OPCODE = false;

(function(window, $) {
    var ws = null;

    // TODO: Items might be players/balls
    var clientNodes = [];
    var nodes = {};

    // Completely unkdown
    var foodEaten = 0;
    var cellsEaten = 0;

    // Positioning
    var mapDimensions = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        centerX: 0,
        centerY: 0
    }

    window.open = function(server) {
        $.post("http://m.agar.io/", server, function(pair) {
            pair = pair.split("\n");
            doConnect(pair);
        });
    }

    function isReady() {
        return ws != null && ws.readyState == ws.OPEN;
    }

    function announceNick(nick) {
      if (isReady() && nick != null) {
        var packet = newPacket(1 + 2 * nick.length);

        packet.setUint8(0, 0);  // Opcode: 0
                                // Data: nick

        var i = 0;
        for (; i < nick.length; ++i) {
          packet.setUint16(1 + 2 * i, nick.charCodeAt(i), true);
        }
        sendPacket(packet);
      }
    }

    function newPacket(length) {
        return new DataView(new ArrayBuffer(length));
    }

    function sendPacket(packet) {
        ws.send(packet.buffer)
    }

    function doConnect(pair) {
        var url = "ws://" + pair[0];
        var token = pair[1];

        ws = new WebSocket(url);
        ws.binaryType = "arraybuffer";

        ws.onopen = function() {
            console.log("[Socket] Opened");

            var packet;
            packet = newPacket(5);
            packet.setUint8(0, 254); // Opcode 254 = Handshake 1
            packet.setUint32(1, 5, true); // data = 05 00 00 00
            sendPacket(packet);

            packet = newPacket(5);
            packet.setUint8(0, 255); // Opcode 255 = Handshake 2
            packet.setUint32(1, 2200049715, true); // data = 33 18 22 83
            sendPacket(packet);

            packet = newPacket(1 + token.length);
            packet.setUint8(0, 80); // Opcode 80 = Handshake token
            // Data = Hash code
            for (var i = 0; i < token.length; ++i) {
                packet.setUint8(i + 1, token.charCodeAt(i));
            }

            sendPacket(packet);

            setTimeout(function(){ announceNick("Test"); }, 1200);
        };

        ws.onmessage = function(message) {
            parse(new DataView(message.data));
        };
    }

    function parse(reader) {

        /**
         * @return {?}
         */
        function readUTF8() {
            /** @type {string} */
            var str = "";
            for (;;) {
                var b = reader.getUint16(offset, true);
                offset += 2;
                if (0 == b) {
                    break;
                }
                str += String.fromCharCode(b);
            }
            return str;
        }

        // Packet data start
        var offset = 0;

        // Packet 240 is special, starts at 5
        if (240 == reader.getUint8(offset)) {
            offset += 5;
        }

        var opcode = reader.getUint8(offset++);
        DEBUG_OPCODE && console.log("Opcode: " + opcode);

        // Read opcode (either at 0 or 5)
        switch (opcode) {
            case 16:
                updateNodes(reader, offset);
                break;

            // Dimensions update
            case 17:
                centerX = reader.getFloat32(offset, true);
                offset += 4;
                centerY = reader.getFloat32(offset, true);
                offset += 4;
                scale = reader.getFloat32(offset, true);
                offset += 4;
                break;

            // Reset
            case 20:
                nodes = {};
                break;

            // Unk
            case 21:
                break;

            // Nick announce success, returns our ID
            case 32:
                clientNodes.push(reader.getUint32(offset, true));
                offset += 4;
                break;

            // Update leaders
            case 49:
                var numberOfEntries = reader.getUint32(offset, true);
                offset = offset + 4;

                for (var i = 0; i < numberOfEntries; ++i) {
                    var id = reader.getUint32(offset, true);
                    offset = offset + 4;

                    // TODO: Update leaderboard
                }

                break;

            // Update leaders TEAM
            case 50:
                break;

            // Map size
            case 64:
                mapDimensions.left = reader.getFloat64(offset, true);
                offset += 8;
                mapDimensions.top = reader.getFloat64(offset, true);
                offset += 8;
                mapDimensions.right = reader.getFloat64(offset, true);
                offset += 8;
                mapDimensions.bottom = reader.getFloat64(offset, true);
                offset += 8;

                mapDimensions.centerX = (mapDimensions.right + mapDimensions.left) / 2;
                mapDimensions.centerY = (mapDimensions.bottom + mapDimensions.top) / 2;

                console.log("Server: {" + left + "," + top + "," + right + "," + bottom + "}");
                console.log("Center at: {" + centerX + "," + centerY + "}");

                if (reader.byteLength > offset) {
                    reader.getUint32(offset, true);
                    offset += 4;

                    console.log("Server version " + readUTF8());
                }
                break;

            // Game start? Unknown
            case 81:
                break;
        }
    }

    function Node(key, x, y, radius, color, name) {
        /** @type {number} */
        this.id = key;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.name = name;
        this.flags = 0;
        this.comment = null;
    }

    Node.prototype = {
        isVirus: function () {
            return this.flags & 1;
        }
    }

    function padColor(data) {
        data = data.toString(16);
        for (; 6 > data.length;) {
            /** @type {string} */
            data = "0" + data;
        }

        return "#" + data;
    }

    function countEatean(eater, eaten) {
        var isEaterClient = -1 != clientNodes.indexOf(eater.id);
        var isEatenClient = -1 != clientNodes.indexOf(eaten.id);
        var isFood = eaten.radius < 30;

        if (isFood) {
            if (isEaterClient) {
                ++foodEaten;
            }
        }
        else
        {
            if (isEaterClient) {
                if (!isEatenClient) {
                    ++cellsEaten;
                }
            }
        }
    }

    function updateNodes(reader, offset) {

        function readUTF8() {
            /** @type {string} */
            var str = "";
            for (;;) {
                var b = reader.getUint16(offset, true);
                offset += 2;

                if (b == 0) {
                    break;
                }

                str += String.fromCharCode(b);
            }

            return str;
        }

        function readUnicode() {
            /** @type {string} */
            var str = "";
            for (;;) {
                var b = reader.getUint8(offset++);
                if (b == 0) {
                    break;
                }
                str += String.fromCharCode(b);
            }
            return str;
        }

        var numObjs = reader.getUint16(offset, true);
        offset += 2;

        DEBUG_UPDATE && console.log("Destroy nodes: " + numObjs);

        for (var ii = 0; ii < numObjs; ++ii) {
            var idEater = reader.getUint32(offset, true);
            var idEaten = reader.getUint32(offset + 4, true);
            offset += 8;

            countEatean(idEater, idEaten);

            delete nodes[idEaten];
        }

        DEBUG_UPDATE && console.log("Update nodes:");
        ii = 0;
        for (;;) {
            var id = reader.getUint32(offset, true);
            offset += 4;

            if (id == 0) {
                break;
            }

            ++ii;

            var x = reader.getInt32(offset, true);
            offset += 4;
            var y = reader.getInt32(offset, true);
            offset += 4;
            var radius = reader.getInt16(offset, true);
            offset += 2;

            var r = reader.getUint8(offset++);
            var g = reader.getUint8(offset++);
            var b = reader.getUint8(offset++);
            var color = padColor(r << 16 | g << 8 | b);

            var flags = reader.getUint8(offset++);

            var comment = null;
            if (flags & 2) {
                offset += 4 + reader.getUint32(offset, true);
            }
            if (flags & 4) {
                comment = readUnicode();
            }

            var name = readUTF8();

            /** @type {null} */
            item = null;
            if (nodes.hasOwnProperty(id)) {
                DEBUG_UPDATE && console.log("\tUpdating: " + id);
                item = nodes[id];
                item.x = x;
                item.y = y;
                item.radius = radius;
                item.color = color;
            } else {
                DEBUG_UPDATE && console.log("\tNewObject: " + id);
                item = new Node(id, x, y, radius, color, name);
                nodes[id] = item;
            }

            item.x = x;
            item.y = y;
            item.radius = radius;
            item.flags = flags;

            DEBUG_UPDATE && console.log("\t\tPosition: {" + x + "," + y + "," + radius + "}");
            DEBUG_UPDATE && console.log("\t\tColor: " + color);
            DEBUG_UPDATE && console.log("\t\tFlags: " + flags);
            DEBUG_UPDATE && console.log("\t\tName: " + name);
            DEBUG_UPDATE && console.log("\t\tRadius: " + radius);
            DEBUG_UPDATE && console.log("\t\tFlags: " + item.flags);
            DEBUG_UPDATE && console.log("\t\t\tisVirus: " + item.isVirus());

            if (comment) {
                item.comment = comment;
            }
        }

        DEBUG_UPDATE && console.log("Updated total nodes: " + ii);
        DEBUG_UPDATE && console.log("");
    }

})(window, window.jQuery);

window.open("EU-London");
